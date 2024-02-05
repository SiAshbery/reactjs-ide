import React, { useState, useEffect } from 'react';
import FileBrowser from '../FileBrowser';
import CodeEditor from '../CodeEditor';
import defaultFiles from '../defaultFiles';
import { parseNodes } from '../Helpers/fileNodes';
import FileNode from '../FileNode';

const Workspace = () => {
  const [currentFile, setCurrentFile]: [FileNode, Function] = useState(null)
  const files = parseNodes(defaultFiles)

  const saveFile = (contents: string): void => {
    currentFile.contents = contents;
  }

  return (
    <div data-testid="workspace">
      <FileBrowser setCurrentFile={setCurrentFile} files={files} />
      <CodeEditor currentFile={currentFile} saveFile={saveFile} />
    </div>
  );
};

export default Workspace