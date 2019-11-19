import React from 'react';

import { defaultConfig } from './configs';

export function StarterBlock(props) {
    return <h1>{props.text}</h1>;
}

StarterBlock.defaultProps = defaultConfig;
