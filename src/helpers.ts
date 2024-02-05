import { FileNode, DefaultFile } from "./types"

const fileNameRegex = /\w+\.\w+/

const consolidateChildren = (currentChildren: string[] = [], newChildren: string[] = []): string[] => {
    return [...currentChildren, ...newChildren].filter((item, i, ar) => ar.indexOf(item) === i);
}

const unique = (array: FileNode[]): FileNode[] => {
    const uniqueArray: FileNode[] = []

    array.forEach((fileNode: FileNode) => {
        const processedNode = getFileNodeByName(uniqueArray, fileNode.name);
        if (processedNode) {
            processedNode.children = consolidateChildren(processedNode.children, fileNode.children)
        } else {
            uniqueArray.push(fileNode)
        }
    })

    return uniqueArray
}

const getFileNodeByName = (array: FileNode[], name: string): FileNode => {
    return array.find((fileNode: FileNode) => {
        return fileNode.name === name
    })
}

export const parseNodes = (defaultFiles: DefaultFile[]): FileNode[] => {
    return (unique(defaultFiles.map((file: DefaultFile) => {
        // keep a reference to the node names as we will need them to assign parents
        const nodeNames = file.path.split('/')
        return nodeNames.map((nodeName: string, index: number) => {
            // if the nodeName matches the file name syntax it is a leaf and has contents
            if (nodeName.match(fileNameRegex)) {
                return {
                    name: nodeName,
                    contents: file.contents,
                }
            }
            return {
                name: nodeName,
                children: [nodeNames[index + 1]]
            }
        })
    }).flat()))
}