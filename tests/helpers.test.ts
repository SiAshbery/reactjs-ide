import { getFileName } from '../src/helpers'


describe(getFileName, () => {
    it('parses a file path into a file name', () => {
        expect(getFileName('app/src/App.tsx')).toEqual('App.tsx')
    })
})