import { FileNode, DefaultFile } from "./types"

const fileNameRegex = /\w+\.\w+/

const unique = (array: FileNode[]): FileNode[] => {
    return Array.from(new Map(array.map((item) =>
        [item.name, item]
    )).values())
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
                    parent: nodeNames[index - 1]
                }
            }
            return {
                name: nodeName,
                // an index of 0 would be the root folder so doesn't have a parent
                parent: index > 0 ? nodeNames[index - 1] : null
            }
        })
    }).flat()))

}