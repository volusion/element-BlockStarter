import React from 'react';

import { defaultConfig } from './configs';

const Block = props => {
    return <h1>{props.text}</h1>;
};

Block.defaultProps = defaultConfig;

export default Block;
