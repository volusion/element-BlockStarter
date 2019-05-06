import React from 'react';
import { StyleSheet, css, StyleSheetTestUtils } from 'aphrodite';
import { ElementPropTypes } from '@volusion/element-proptypes';
import * as Components from '@volusion/element-components';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { factory as createBlock } from '../src/index';

const utils = {};
const globalStyles = {
    typography: {},
    color: {},
    globalComponents: {}
};

describe('The Starter Block', () => {
    beforeEach(() => {
        StyleSheetTestUtils.suppressStyleInjection();
    });

    describe('when there is no custom data', () => {
        it('should render the block with the default content', () => {
            const blockConfig = {};

            const blockSpec = createBlock(
                { React, ElementPropTypes, Components },
                utils,
                { StyleSheet, css },
                globalStyles,
                blockConfig
            );
            const wrapper = shallow(<blockSpec.block />);

            expect(wrapper.dive().props().text).toBe('Default prop');
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when given custom data', () => {
        it('should render the block using the custom data', () => {
            StyleSheetTestUtils.suppressStyleInjection();

            const blockConfig = {
                text: 'Hello from props'
            };

            const blockSpec = createBlock(
                { React, ElementPropTypes, Components },
                utils,
                { StyleSheet, css },
                globalStyles,
                blockConfig
            );
            const wrapper = shallow(<blockSpec.block />).setProps(blockConfig);

            expect(wrapper.props().text).toBe('Hello from props');
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when mounted with default data', () => {
        it('should match the snapshot', () => {
            const blockConfig = {};

            const blockSpec = createBlock(
                { React, ElementPropTypes, Components },
                utils,
                { StyleSheet, css },
                globalStyles,
                blockConfig
            );
            const wrapper = mount(<blockSpec.block />);

            expect(wrapper).toMatchSnapshot();
        });
    });

    afterEach(() => {
        StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    });
});
