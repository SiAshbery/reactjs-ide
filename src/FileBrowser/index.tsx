import React from 'react';
import FileNode from '../FileNode';

import BrowserItem from './BrowserItem';

const FileBrowser = ({ setCurrentFile, files }: { setCurrentFile: Function, files: FileNode[] }) => {
  return <ul data-testid="file-browser"> {
    files.map((file: FileNode) => {
      return (
        <BrowserItem key={file.name} file={file} setCurrentFile={setCurrentFile}/>
      )
    })
  }</ul>;
};

export default FileBrowser
