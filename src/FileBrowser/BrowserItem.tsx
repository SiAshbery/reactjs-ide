import React, { useState } from 'react';
import FileNode from '../FileNode';
import Folder from './Folder';
import File from './File'
import styled from 'styled-components';

const BrowserItem = ({ file, setCurrentFileName }: { file: FileNode, setCurrentFileName: Function }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <ListItem data-testid="browser-item">
            {file.contents &&
                <File onClick={() => { setCurrentFileName(file.name) }} name={file.name} />
                ||
                <Folder onClick={() => { setIsOpen(!isOpen) }} isOpen={isOpen}>
                    {file.name}
                </Folder>}
            {isOpen && <ChildList>
                {file.children.map((child: FileNode) => {
                    return <BrowserItem file={child} key={child.name} setCurrentFileName={setCurrentFileName} />
                })}
            </ChildList>}
        </ListItem>
    )

};

export default BrowserItem

const ListItem = styled.li`
    list-style-type: none;
    padding: 0; 
    margin: 0;
`

const ChildList = styled.ul`
    padding: 0 0 0 16px;
    margin: 4px 0 10px;
    border-left: 1px solid black;
`
