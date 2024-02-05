import React from 'react';
import FileNode from '../FileNode';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ currentFile, saveFile }: { currentFile?: FileNode, saveFile: Function }) => {

    return (
        <Editor
            data-testid="code-editor"
            height="90vh"
            defaultLanguage="javascript"
            value={currentFile && currentFile.contents}
            onChange={(value) => { saveFile(value) }}
        />
    )
};

export default CodeEditor