/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, within, fireEvent } from "@testing-library/react"
import Workspace from '../../src/Workspace'
import '@testing-library/jest-dom';

describe(Workspace, () => {
    let workSpaceElement

    beforeEach(() => {
        render(<Workspace />);
        workSpaceElement = screen.getByTestId('workspace');
    })

    it('renders', () => {
        expect(workSpaceElement).toBeInTheDocument();
    })

    it("displays the currentFile's contents when selected", () => {
        const editorElement = within(workSpaceElement).getByTestId('code-editor');
        const folderElement = within(workSpaceElement).getByTestId('folder-button');

        fireEvent.click(folderElement)
        const fileElement = screen.getAllByTestId('file-button')[0]

        expect(editorElement.textContent).toBeNull
        fireEvent.click(fileElement)
        expect(editorElement.textContent).toEqual(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
    <title>File Browser</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/App.tsx"></script>
    <script type="module" src="/style.css"></script>
  </body>
</html>`)
    })


})