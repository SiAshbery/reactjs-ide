import React from 'react';
import FileNode from '../FileNode';
import BrowserItem from './BrowserItem';
import styled from 'styled-components';

const FileBrowser = ({ setCurrentFileName, files }: { setCurrentFileName: Function, files: FileNode[] }) => {
  return (
    <List data-testid="file-browser">
      {
        files.map((file: FileNode) => {
          return (
            <BrowserItem key={file.name} file={file} setCurrentFileName={setCurrentFileName} />
          )
        })
      }
    </List>
  );
};

export default FileBrowser

const List = styled.ul`
  width: 200px;
  padding: 20px 24px;
  margin: 0;
`
