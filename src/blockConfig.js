const configSchema = ElementPropTypes => {
    return {
        text: ElementPropTypes.string
    };
};

const defaultConfig = {
    text: 'Default prop'
};

export { configSchema, defaultConfig };
