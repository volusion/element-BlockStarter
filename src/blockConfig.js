export const configSchema = ElementPropTypes => {
    return {
        text: {
            label: 'Text Content',
            type: ElementPropTypes.string
        }
    };
};

export const defaultConfig = {
    text: 'Default prop'
};
