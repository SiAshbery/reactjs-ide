/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, within } from "@testing-library/react"
import { Workspace } from '../../src/Workspace/Workspace'
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

    it('contains the correct list items', () => {
        const items = within(workSpaceElement).getAllByRole('listitem').map(item => item.textContent)
        expect(items).toEqual([
            'App.tsx',
            'featuredWidgets.js',
            'discontinuedWidgets.js',
            'style.css',
            'clearanceWidgets.js',
            'Widget.tsx',
            'WidgetList.tsx',
            'index.html'
        ])
    })

})