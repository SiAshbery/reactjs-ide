/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react"
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


})