import FileNode from '../src/FileNode'

describe(FileNode, () => {
    const rootFileNode = new FileNode('root', true)

    it('initializes with a name and isRoot', () => {
        expect(rootFileNode.name).toEqual('root')
        expect(rootFileNode.isRoot).toBe(true)
    })

    it('initializes with empty arrays for children and ChildrenNames', () => {
        expect(rootFileNode.children).toEqual([])
        expect(rootFileNode.childrenNames).toEqual([])
    })

    it("has a contents attribute which doesn't initialize but can me assigned later", () => {
        expect(rootFileNode.contents).toBeUndefined()
        rootFileNode.contents = 'test'
        expect(rootFileNode.contents).toEqual('test')
    })
})