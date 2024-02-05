import React from 'react';
import { FileNode } from '../types';

import defaultFiles from '../defaultFiles';
import { parseNodes } from '../helpers';

const FileBrowser = () => {
  return <ul data-testid="file-browser"> {
    parseNodes(defaultFiles).map((file: FileNode) => {
      return (
        <li key={file.name}>{file.name}</li>
      )
    })
  }</ul>;
};

export default FileBrowser
