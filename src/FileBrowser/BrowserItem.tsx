import React, { useState } from 'react';
import FileNode from '../FileNode';
import Folder from './Folder';

const BrowserItem = ({ file }: { file: FileNode }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li data-testid="browser-item">{
            file.contents && file.name ||
            <Folder onClick={() => { setIsOpen(!isOpen) }}>
                {file.name}
            </Folder>
        }
            {isOpen && <ul>
                {file.children.map((child: FileNode) => {
                    return <BrowserItem file={child} key={child.name} />
                })}
            </ul>}
        </li>
    )

};

export default BrowserItem
