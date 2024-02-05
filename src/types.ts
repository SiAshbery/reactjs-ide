export type DefaultFile = {
    path: string,
    contents: string
}

export type FileNode = {
    name: string,
    contents?: string,
    children?: string[]
}