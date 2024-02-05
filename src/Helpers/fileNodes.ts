import { DefaultFile } from "../types"
import FileNode from "../FileNode";

const fileNameRegex = /\w+\.(\w+)/

export const getFileExtension = (fileName: string): string => {
    return fileName.match(fileNameRegex) ? fileName.match(fileNameRegex)[1] : ''
}

const consolidateChildren = (currentChildren: string[] = [], newChildren: string[] = []): string[] => {
    return [...currentChildren, ...newChildren].filter((item, i, ar) => ar.indexOf(item) === i);
}

const unique = (array: FileNode[]): FileNode[] => {
    const uniqueArray: FileNode[] = []

    array.forEach((fileNode: FileNode) => {
        const processedNode = getFileNodeByName(uniqueArray, fileNode.name);
        if (processedNode) {
            processedNode.childrenNames = consolidateChildren(processedNode.childrenNames, fileNode.childrenNames)
        } else {
            uniqueArray.push(fileNode)
        }
    })

    return uniqueArray
}

export const getFileNodeByName = (array: FileNode[], name: string): FileNode => {
    let toReturn: FileNode;
    for (let index = 0; index < array.length; index++) {
        const file = array[index];

        if (file.name === name) {
            toReturn = file
            break;
        }

        toReturn = getFileNodeByName(file.children, name);
        if (toReturn) {
            break;
        }
    }

    return toReturn
}

export const parseNodes = (defaultFiles: DefaultFile[]): FileNode[] => {
    const flatArray = unique(defaultFiles.map((file: DefaultFile) => {
        // keep a reference to the node names as we will need them to assign parents
        const nodeNames = file.path.split('/')

        return nodeNames.map((nodeName: string, index: number) => {
            const newNode = new FileNode(nodeName, index === 0)

            if (nodeName.match(fileNameRegex)) {
                // if the nodeName matches the file name syntax it is a file and has contents
                newNode.contents = file.contents
            } else {
                // else the node is a folder and can contain children.
                newNode.childrenNames.push(nodeNames[index + 1])
            }
            return newNode;
        })
    }).flat())

    return nestChildren(flatArray)
}

const caseInsensitive = (a, b) => a.localeCompare(b, 'en', { 'sensitivity': 'base' })

const sortChildren = (childrenNames: string[]): string[] => {
    //folders are places first, then files. Both are alphabetised respectively
    return [
        ...childrenNames.filter((name: string) => !name.match(fileNameRegex)).sort(caseInsensitive),
        ...childrenNames.filter((name: string) => name.match(fileNameRegex)).sort(caseInsensitive)
    ]
}

const nestChildren = (flatArray: FileNode[]): FileNode[] => {
    // maps the childrenNames into FileNode children
    flatArray.forEach((fileNode: FileNode) => {
        fileNode.children = sortChildren(fileNode.childrenNames).map((childName: string) => {
            return getFileNodeByName(flatArray, childName)
        })
    })
    /*
        Only root nodes should be represented at the top level
        of this structure so we prune the rest as they are duplicates
        and are now represented deeper in the branches
    */
    return flatArray.filter((fileNode: FileNode) => {
        return fileNode.isRoot
    })
}