import React from 'react';
import { FileNode } from '../types';

const BrowserItem = ({ file }: { file: FileNode }) => {

    return (
        <li >{file.contents && file.name || <button>{file.name}</button>}</li>
    )

};

export default BrowserItem
