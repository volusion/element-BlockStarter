import { factory as blockFactory } from './block';
import { configSchema } from './blockConfig';

const createFactory = ({ React, ElementPropTypes }) => {
    const configSpec = configSchema(ElementPropTypes);

    const block = blockFactory(React);

    return {
        block: React.createFactory(block),
        config: configSpec
    };
};

export default createFactory;
