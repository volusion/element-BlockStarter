const configSchema = ElementPropTypes => {
    return {
        color: ElementPropTypes.shape({
            background: ElementPropTypes.color
        }),
        text: ElementPropTypes.string
    };
};

const defaultConfig = {
    color: {
        background: 'transparent'
    },
    text: 'Default prop'
};

export { configSchema, defaultConfig };
