export default class FileNode {
    name: string;
    contents?: string;
    childrenNames: string[]; // a bit of a workaround to include this array but it makes the nensting process a lot more straight forward
    // I feel it is permissible as in a production environment this kind of relationship would probably be handled with a database relationship
    children: FileNode[];
    isRoot: boolean;

    constructor(name: string, isRoot: boolean) {
        this.name = name;
        this.isRoot = isRoot;
        this.children = [];
        this.childrenNames = [];
    }
}