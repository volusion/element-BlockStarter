import React from 'react';

import { defaultConfig } from './configs';

function StarterBlock(props) {
    return <h1>{props.text}</h1>;
}

StarterBlock.defaultProps = defaultConfig;

export default StarterBlock;
