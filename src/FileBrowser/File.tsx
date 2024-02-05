import React from 'react';
import { FileIcons } from '../Helpers/fileExtensions';
import { getFileExtension } from '../Helpers/fileNodes'
import { FileButton } from './styles';

type FileProps = {
    onClick: React.MouseEventHandler<HTMLButtonElement>,
    name: string
}

const File = ({ onClick, name }: FileProps) => {
    return (
        <FileButton data-testid="file-button" onClick={onClick} $icon={FileIcons[getFileExtension(name)]}>{name}</FileButton>
    )
};

export default File
