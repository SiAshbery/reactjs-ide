import styled from 'styled-components';


type FolderButtonProps = {
    $transform: { position: number, rotation: number }
}
type FileButtonProps = {
    $icon: string
}

const BrowserButton = styled.button`
    background: none;
    border: none;
    outline: none;
    position: relative;
    cursor: pointer;
    &::before {
        display: block;
        position: absolute; 
    }
`


export const FileButton = styled(BrowserButton) <FileButtonProps>`
    padding-left: 8px;
    &::before {
        content: url(${({ $icon }) => ($icon)});
        height: 16px;
        width: 16px;
        left: -12px;
    }
`

export const FolderButton = styled(BrowserButton) <FolderButtonProps>`
    &::before {
        content: '';
        left: -12px;
        top: ${({ $transform }) => (`${$transform.position}%`)};
        width: 6px;
        height: 6px;
        border-top: 1px solid black;
        border-right: 1px solid black;
        transform: rotate(${({ $transform }) => (`${$transform.rotation}deg`)}) translateY(${({ $transform }) => (`-${$transform.position}%`)});
    }
`