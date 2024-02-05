/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, within } from "@testing-library/react"
import FileBrowser from '../../src/FileBrowser'
import '@testing-library/jest-dom';

describe(FileBrowser, () => {
    let fileBrowserElement

    beforeEach(() => {
        render(<FileBrowser />);
        fileBrowserElement = screen.getByTestId('file-browser');
    })

    it('renders', () => {
        expect(fileBrowserElement).toBeInTheDocument();
    })

    it('contains the correct list items', () => {
        const items = within(fileBrowserElement).getAllByRole('listitem').map(item => item.textContent)
        expect(items).toEqual([
            "app",
        ])
    })

})