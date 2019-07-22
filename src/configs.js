export const configSchema = ElementPropTypes => {
    return {
        text: {
            label: 'Text content',
            type: ElementPropTypes.string
        }
    };
};

export const defaultConfig = {
    text: 'Element Starter Block'
};
