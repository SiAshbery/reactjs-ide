import React from 'react';
import { FileNode } from '../types';

import defaultFiles from '../defaultFiles';
import { parseNodes } from '../helpers';

const Workspace = () => {
  return <ul data-testid="workspace"> {
    parseNodes(defaultFiles).map((file: FileNode) => {
      return (
        <li key={file.name}>{file.name}</li>
      )
    })
  }</ul>;
};


export default Workspace;
