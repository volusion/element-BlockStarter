import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ElementPropTypes } from '@volusion/element-proptypes'
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { factory as BlockModuleFactory } from '../src/'
import { StarterBlockFactory } from '../src/block';
import { defaultConfig } from '../src/configs';

describe('The Starter Block', () => {
    const StarterBlock = StarterBlockFactory(React);

    it('renders without errors', () => {
      const TestBlock = BlockModuleFactory(
        { React, ElementPropTypes, Components: {}  },
        {},
        { StyleSheet, css  }
      ).block;
      mount(<TestBlock />)
    })

    describe('when there is no custom data', () => {
        it('should render the block with the default content', () => {
            const wrapper = shallow(<StarterBlock />);
            expect(wrapper.text()).toBe(defaultConfig.text);
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when given custom data', () => {
        it('should render the block using the custom data', () => {
            const customText = 'Custom Block Text';
            const blockConfig = { text: customText };

            const wrapper = shallow(<StarterBlock {...blockConfig} />);

            expect(wrapper.text()).toBe(customText);
            expect(wrapper).toMatchSnapshot();
        });
    });
});
