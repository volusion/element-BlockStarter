import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { factory as blockFactory } from '../src/block';
import { defaultConfig } from '../src/blockConfig';

describe('The Starter Block', () => {
    describe('when there is no custom data', () => {
        it('should render the block with the default content', () => {
            const StarterBlock = blockFactory(React);
            const wrapper = shallow(<StarterBlock />);
            expect(wrapper.text()).toBe(defaultConfig.text);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when given custom data', () => {
        it('should render the block using the custom data', () => {
            const StarterBlock = blockFactory(React);
            const customText = 'Custom Block Text';
            const blockConfig = { text: customText };

            const wrapper = shallow(<StarterBlock {...blockConfig} />);

            expect(wrapper.text()).toBe(customText);
            expect(wrapper).toMatchSnapshot();
        });
    });
});
