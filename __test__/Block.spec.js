import React from 'react';
import { StyleSheetTestUtils } from 'aphrodite';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { mockUtils as utils, joinClasses } from '@volusion/element-block-utils';
import { block as Block, defaultConfig } from '../src';

let props;
describe('The Block', () => {
    StyleSheetTestUtils.suppressStyleInjection();
    beforeEach(() => {
        props = { utils, joinClasses };
    });
    it('renders without errors', () => {
        mount(<Block {...props} />);
    });
    describe('when there is no custom data', () => {
        it('should render the block with the default content', () => {
            const wrapper = mount(<Block {...props} />);
            expect(wrapper.text()).toBe(defaultConfig.text);
        });
    });
    describe('when given custom data', () => {
        it('should render the block using the custom data', () => {
            const customText = 'Custom Block Text';
            const wrapper = mount(<Block {...props} text={customText} />);
            expect(wrapper.text()).toBe(customText);
        });
    });
});
