export default class FileNode {
    name: string;
    contents?: string;
    childrenNames: string[]; // a bit of a workaround to include this array but it makes the nensting process a lot more straight forward
    children: FileNode[];
    isRoot: boolean;

    constructor(name: string, isRoot: boolean) {
        this.name = name;
        this.isRoot = isRoot;
        this.children = [];
        this.childrenNames = [];
    }
}