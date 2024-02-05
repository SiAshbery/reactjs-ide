/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"
import CodeEditor from "../../src/CodeEditor";
import '@testing-library/jest-dom';
import FileNode from "../../src/FileNode";

/*
    Less than ideal mocking out the actual returned element
    but the monaco editor never finishes loading in a test environment
    I've tried using functions like waitFor and waitForElementToBeRemoved but with no joy
    I decided against further efforts as I feel debugging an external package is outside
    the scope of this assessment.
    This way all the core functionality of the CodeEditor component is still tested.
    The monaco editor works as ecpected in the dev environment
*/
jest.mock("@monaco-editor/react", () => {
    const FakeEditor = jest.fn(props => {
        return (
            <textarea
                data-testid="code-editor"
                data-auto={props.wrapperClassName}
                onChange={e => props.onChange(e.target.value)}
                value={props.value}
            ></textarea>
        );
    });
    return FakeEditor;
});


describe(CodeEditor, () => {
    let codeEditorElement
    const currentFile = new FileNode('file.js', false)
    const mockSetFiles = jest.fn(() => { })

    beforeEach(() => {
        render(<CodeEditor currentFile={currentFile} setFiles={mockSetFiles} />);
        codeEditorElement = screen.getByTestId('code-editor');
    })

    it('renders', () => {
        expect(codeEditorElement).toBeInTheDocument();
    })

    it('calls the passed in setFiles prop when changed', () => {
        fireEvent.change(codeEditorElement, {
            target: { value: "a" }
        });
        expect(mockSetFiles.mock.calls).toHaveLength(1);
        expect(codeEditorElement.value).toEqual('a')
    })
})