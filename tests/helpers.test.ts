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
    {
        path: 'root/b.js',
        contents: `content 4`
    },
    {
        path: 'root/a.js',
        contents: `content 4`
    }
]


describe(parseNodes, () => {
    it('parses defaultFiles into an array of nested file nodes', () => {
        expect(parseNodes(defaultFiles)).toEqual([
            {
                "name": "root",
                "isRoot": true,
                "children": [
                    {
                        "name": "folder-1",
                        "isRoot": false,
                        "children": [
                            {
                                "name": "file-1.js",
                                "isRoot": false,
                                "children": [],
                                "childrenNames": [],
                                "contents": "content 1"
                            },
                            {
                                "name": "file-2.js",
                                "isRoot": false,
                                "children": [],
                                "childrenNames": [],
                                "contents": "content 2"
                            }
                        ],
                        "childrenNames": [
                            "file-1.js",
                            "file-2.js"
                        ]
                    },
                    {
                        "name": "folder-2",
                        "isRoot": false,
                        "children": [
                            {
                                "name": "file-3.js",
                                "isRoot": false,
                                "children": [],
                                "childrenNames": [],
                                "contents": "content 3"
                            }
                        ],
                        "childrenNames": [
                            "file-3.js"
                        ]
                    },
                    {
                        "name": "a.js",
                        "isRoot": false,
                        "children": [

                        ],
                        "childrenNames": [

                        ],
                        "contents": "content 4"
                    },
                    {
                        "name": "b.js",
                        "isRoot": false,
                        "children": [

                        ],
                        "childrenNames": [

                        ],
                        "contents": "content 4"
                    }
                ],
                "childrenNames": [
                    "folder-1",
                    "folder-2",
                    "b.js",
                    "a.js",
                ]
            }
        ])
    })

    it('only has unique nodes with no repeating names', () => {
        expect(parseNodes(defaultFiles).filter(node => node.name === 'root').length).toEqual(1)
    })
})