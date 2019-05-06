import { defaultConfig } from './blockConfig';

export default (global, block) => {
    if (!block.color) {
        block.color = { background: defaultConfig.color.background };
    }
    return {
        div: {
            fontFamily: global.typography.fontFamily,
            fontSize: global.typography.baseFontSize,
            color: global.color.primary,
            backgroundColor: block.color.background
        }
    };
};
