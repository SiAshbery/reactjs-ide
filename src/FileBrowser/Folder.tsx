import React, { useState } from 'react';

const Folder = ({ onClick, children }: { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }) => {

    return (
        <button data-testid="folder-button" onClick={onClick}>{children}</button>
    )

};

export default Folder
