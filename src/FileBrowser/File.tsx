import React from 'react';

const File = ({ onClick, children }: { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }) => {

    return (
        <button data-testid="file-button" onClick={onClick}>{children}</button>
    )

};

export default File
