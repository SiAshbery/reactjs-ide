import React from 'react';
import FileNode from '../FileNode';

const CodeEditor = ({ currentFile }: { currentFile?: FileNode }) => {
    return <div data-testid="code-editor">{currentFile && currentFile.contents}</div>;
};

export default CodeEditor