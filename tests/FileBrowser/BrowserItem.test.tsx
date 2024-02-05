/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react"
import BrowserItem from '../../src/FileBrowser/BrowserItem'
import FileNode from "../../src/FileNode";
import '@testing-library/jest-dom';

describe(BrowserItem, () => {
    let browserItemElement
    const rootFile = new FileNode('root', true);
    const file = new FileNode('file.js', false)
    file.contents = "content"
    rootFile.children = [file]
    rootFile.childrenNames = [file.name]
    const mockSetCurrentFile = jest.fn(() => { })

    beforeEach(() => {
        render(<BrowserItem file={rootFile} setCurrentFileName={mockSetCurrentFile} />);
        browserItemElement = screen.getByTestId('browser-item');
    })

    it('renders', () => {
        expect(browserItemElement).toBeInTheDocument();
    })

    it('contains the correct list items', () => {
        const item = within(browserItemElement).getByTestId('folder-button').textContent
        expect(item).toEqual(
            "root",
        )
    })

    it('expands folders and shows the children', () => {
        const folderButton = within(browserItemElement).getByTestId('folder-button')
        let fileElement = screen.queryByTestId('file-button')
        expect(fileElement).not.toBeInTheDocument()

        fireEvent.click(folderButton)
        fileElement = screen.getByTestId('file-button')
        expect(fileElement).toBeInTheDocument()
        expect(fileElement.textContent).toEqual('file.js')
    })

})