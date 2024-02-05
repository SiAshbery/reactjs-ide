import { parseNodes, getFileNodeByName } from '../../src/Helpers/fileNodes'

import defaultFiles from '../Fixtures/defaultFiles'

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

describe(getFileNodeByName, () => {
    const fileNodes = parseNodes(defaultFiles);
    it('returns the right file node', () => {
        expect(getFileNodeByName(fileNodes, 'root')).toEqual(fileNodes[0])
    })

    it('returns the right file node when nested', () => {
        expect(getFileNodeByName(fileNodes, 'folder-1')).toEqual(fileNodes[0].children[0])
        expect(getFileNodeByName(fileNodes, 'file-3.js')).toEqual(fileNodes[0].children[1].children[0])
    })
})