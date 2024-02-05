import React, { useState } from 'react';
import FileNode from '../FileNode';
import Folder from './Folder';
import File from './File'

const BrowserItem = ({ file, setCurrentFile }: { file: FileNode, setCurrentFile: Function }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li data-testid="browser-item">
            {file.contents &&
                <File onClick={() => { setCurrentFile(file) }}>
                    {file.name}
                </File>
                ||
                <Folder onClick={() => { setIsOpen(!isOpen) }}>
                    {file.name}
                </Folder>}
            {isOpen && <ul>
                {file.children.map((child: FileNode) => {
                    return <BrowserItem file={child} key={child.name} setCurrentFile={setCurrentFile} />
                })}
            </ul>}
        </li>
    )

};

export default BrowserItem
