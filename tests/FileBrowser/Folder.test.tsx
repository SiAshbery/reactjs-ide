/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"
import Folder from "../../src/FileBrowser/Folder";
import '@testing-library/jest-dom';

describe(Folder, () => {
    let folderElement

    const mockOnClick = jest.fn(() => { });
    beforeEach(() => {
        render(<Folder onClick={mockOnClick} isOpen={false}>test</Folder>);
        folderElement = screen.getByTestId('folder-button');
    })

    it('renders', () => {
        expect(folderElement).toBeInTheDocument();
    })

    it('calls the passed in onClick prop when clicked', () => {
        fireEvent.click(folderElement)
        expect(mockOnClick.mock.calls).toHaveLength(1);
    })

})