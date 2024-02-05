import React, { useState, useEffect } from 'react';
import FileBrowser from '../FileBrowser';
import CodeEditor from '../CodeEditor';
import defaultFiles from '../defaultFiles';
import { parseNodes, getFileNodeByName } from '../Helpers/fileNodes';
import FileNode from '../FileNode';
import styled from 'styled-components';

const Workspace = () => {
  const [currentFileName, setCurrentFileName]: [string, Function] = useState(null)
  const [files, setFiles]: [FileNode[], Function] = useState(null)

  useEffect(() => {
    setFiles(parseNodes(defaultFiles))
  }, [])

  const saveFile = (contents: string): void => {
    getFileNodeByName(files, currentFileName).contents = contents;
  }

  return (
    <WorkSpaceContainer data-testid="workspace">
      {files ? <>
        <FileBrowser setCurrentFileName={setCurrentFileName} files={files} />
        <CodeEditor currentFile={getFileNodeByName(files, currentFileName)} saveFile={saveFile} />
      </> : "Loading..."}

    </WorkSpaceContainer>
  );
};

const WorkSpaceContainer = styled.div`
  display: grid;
  grid-template-columns: [fileBrowser] 260px [codeEditor] 100% [end];
`

export default Workspace