const configSchema = ElementPropTypes => {
    return {
        text: {
            label: 'Text Content',
            type: ElementPropTypes.string
        }
    };
};

const defaultConfig = {
    text: 'Default prop'
};

export { configSchema, defaultConfig };
