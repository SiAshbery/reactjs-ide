/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, within } from "@testing-library/react"
import FileBrowser from '../../src/FileBrowser'
import '@testing-library/jest-dom';
import { parseNodes } from "../../src/Helpers/fileNodes";
import defaultFiles from '../Fixtures/defaultFiles'

describe(FileBrowser, () => {
    let fileBrowserElement
    const mockSetCurrentFileName = jest.fn(() => { })
    const fileNodes = parseNodes(defaultFiles)


    beforeEach(() => {
        render(<FileBrowser setCurrentFileName={mockSetCurrentFileName} files={fileNodes} />);
        fileBrowserElement = screen.getByTestId('file-browser');
    })

    it('renders', () => {
        expect(fileBrowserElement).toBeInTheDocument();
    })

    it('contains the correct list items', () => {
        const items = within(fileBrowserElement).getAllByRole('listitem').map(item => item.textContent)
        expect(items).toEqual([
            "root",
        ])
    })

})