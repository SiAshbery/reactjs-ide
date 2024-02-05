/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, within } from "@testing-library/react"
import BrowserItem from '../../src/FileBrowser/BrowserItem'
import FileNode from "../../src/FileNode";
import '@testing-library/jest-dom';

describe(BrowserItem, () => {
    let browserItemElement
    const rootFile = new FileNode('root', true);

    beforeEach(() => {
        render(<BrowserItem file={rootFile} />);
        browserItemElement = screen.getByTestId('browser-item');
    })

    it('renders', () => {
        expect(browserItemElement).toBeInTheDocument();
    })

    // it('contains the correct list items', () => {
    //     const items = within(browserItemElement).getAllByRole('listitem').map(item => item.textContent)
    //     expect(items).toEqual([
    //         "root",
    //     ])
    // })

})