import { DefaultFile } from "../../src/types";

export default [
    {
        path: 'root/folder-1/file-1.js',
        contents: 'content 1'
    },
    {
        path: 'root/folder-1/file-2.js',
        contents: 'content 2'
    },
    {
        path: 'root/folder-2/file-3.js',
        contents: `content 3`
    },
    {
        path: 'root/b.js',
        contents: `content 4`
    },
    {
        path: 'root/a.js',
        contents: `content 4`
    }
] as DefaultFile[]