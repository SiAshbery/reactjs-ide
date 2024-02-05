import React from 'react';
import { FolderButton } from './styles';

type FolderProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    isOpen: boolean,
    children: React.ReactNode
}

const Folder = ({ onClick, isOpen, children }: FolderProps) => {
    const chevronTransform = { position: isOpen ? 25 : 50, rotation: isOpen ? 135 : 45 }

    return (
        <FolderButton data-testid="folder-button" onClick={onClick} $transform={chevronTransform}>{children}</FolderButton>
    )
};

export default Folder
