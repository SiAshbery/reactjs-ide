import React from 'react';
import { FileNode } from '../types';

import defaultFiles from '../defaultFiles';
import { getFileName } from '../helpers';

const Workspace = () => {
  return <ul data-testid="workspace">{
    defaultFiles.map((file: FileNode) => {
      return (
        <li key={file.path}>{getFileName(file.path)}</li>
      )
    })
  }</ul>;
};

export default Workspace;
