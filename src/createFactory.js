import styles from './styles';
import { factory as blockFactory } from './block';
import { configSchema, defaultConfig } from './blockConfig';

const createFactory = (
    { React, ElementPropTypes },
    utils,
    { StyleSheet, css },
    globalStyles,
    blockConfig
) => {
    if (!blockConfig.color) {
        blockConfig.color = { background: defaultConfig.color.background };
    }
    const classes = StyleSheet.create(styles(globalStyles, blockConfig));

    const configSpec = configSchema(ElementPropTypes);

    const block = blockFactory({ React, css, classes });

    return {
        block: React.createFactory(block),
        config: configSpec
    };
};

export default createFactory;
