import React from 'react';
import { render, screen } from '@testing-library/react';
import {
    mockUtils as utils,
    joinClasses,
} from '@volusion/element-block-utils/test-utils';
import { block as Block, defaultConfig } from '../src';

let props;
describe('The Block', () => {
    beforeEach(() => {
        props = {
            data: {},
            utils,
            joinClasses,
            queryParams: {},
        };
    });
    it('renders without errors', () => {
        render(<Block {...props} />);
    });
    describe('when there is no custom data', () => {
        it('should render the block with the default content', () => {
            render(<Block {...props} />);
            expect(screen.getByText(defaultConfig.text)).toBeInTheDocument();
        });
    });
    describe('when given custom data', () => {
        it('should render the block using the custom data', () => {
            const customText = 'Custom Block Text';
            render(<Block {...props} text={customText} />);
            expect(screen.getByText(customText)).toBeInTheDocument();
        });
    });
});
