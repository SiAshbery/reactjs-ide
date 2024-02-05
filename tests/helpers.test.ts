import { parseNodes } from '../src/helpers'

const defaultFiles = [
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
]


describe(parseNodes, () => {
    it('parses defaultFiles into an array of file nodes', () => {
        expect(parseNodes(defaultFiles)).toEqual([
            { "name": "root", "children": ['folder-1', 'folder-2'] },
            { "name": "folder-1", children: ['file-1.js', 'file-2.js'] },
            { "contents": "content 1", "name": "file-1.js", },
            { "contents": "content 2", "name": "file-2.js", },
            { "name": "folder-2", children: ['file-3.js'] },
            { "contents": "content 3", "name": "file-3.js", }])
    })

    it('only has unique nodes with no repeating names', () => {
        expect(parseNodes(defaultFiles).filter(node => node.name === 'root').length).toEqual(1)
    })
})