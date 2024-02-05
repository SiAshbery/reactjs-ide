import React, { useState } from 'react';
import FileBrowser from '../FileBrowser';
import CodeEditor from '../CodeEditor';

const Workspace = () => {
  const [currentFile, setCurrentFile] = useState(null)
  return (
    <div data-testid="workspace">
      <FileBrowser setCurrentFile={setCurrentFile} />
      <CodeEditor currentFile={currentFile} />
    </div>
  );
};

export default Workspace