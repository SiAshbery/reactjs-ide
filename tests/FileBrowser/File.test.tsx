/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"
import File from "../../src/FileBrowser/File";
import '@testing-library/jest-dom';

describe(File, () => {
    let fileElement

    const mockOnClick = jest.fn(() => { });
    beforeEach(() => {
        render(<File onClick={mockOnClick}>test</File>);
        fileElement = screen.getByTestId('file-button');
    })

    it('renders', () => {
        expect(fileElement).toBeInTheDocument();
    })

    it('calls the passed in onClick prop when clicked', () => {
        fireEvent.click(fileElement)
        expect(mockOnClick.mock.calls).toHaveLength(1);
    })

})