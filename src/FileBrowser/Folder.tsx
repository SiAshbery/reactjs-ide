import React, { useState } from 'react';

const Folder = ({ onClick, children }: { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }) => {

    return (
        <button onClick={onClick}>{children}</button>
    )

};

export default Folder
