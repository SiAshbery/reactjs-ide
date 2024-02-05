import React from 'react';
import FileNode from '../FileNode';

import defaultFiles from '../defaultFiles';
import { parseNodes } from '../helpers';

import BrowserItem from './BrowserItem';

const FileBrowser = ({ setCurrentFile }: { setCurrentFile: Function }) => {
  return <ul data-testid="file-browser"> {
    parseNodes(defaultFiles).map((file: FileNode) => {
      return (
        <BrowserItem key={file.name} file={file} setCurrentFile={setCurrentFile}/>
      )
    })
  }</ul>;
};

export default FileBrowser
