function createFactory(blockFactory, styles, configSchema) {
    return function(
        { React, ElementPropTypes, Components },
        utils,
        { StyleSheet, css },
        globalStyles,
        blockConfig
    ) {
        const classes = StyleSheet.create(styles(globalStyles, blockConfig));

        const generatedComponents = Object.keys(Components).reduce(
            (componentList, name) => {
                componentList[name] = Components[name].factory(
                    { React, ElementPropTypes },
                    { StyleSheet, css },
                    globalStyles
                ).component;
                return componentList;
            },
            {}
        );

        const Block = blockFactory(React, generatedComponents);

        const block = class extends React.Component {
            render() {
                const blockProps = {
                    ...this.props,
                    classes,
                    ...utils,
                    StyleSheet,
                    css
                };
                return <Block {...blockProps} />;
            }
        };

        return {
            block: React.createFactory(block),
            config: configSchema(ElementPropTypes)
        };
    };
}

export default createFactory;
