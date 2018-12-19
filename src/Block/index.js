import styles from './styles';

const defaultConfig = {
    color: {
        background: 'transparent'
    },
    text: 'Default prop'
};

const factory = (
    { React, VolusionPropTypes, Components },
    utils,
    { StyleSheet, css },
    globalStyles,
    blockConfig
) => {
    if (!blockConfig.color) {
        blockConfig.color = { background: defaultConfig.color.background };
    }
    const classes = StyleSheet.create(styles(globalStyles, blockConfig));
    const Button = Components.Button.factory(
        { React, VolusionPropTypes },
        { StyleSheet, css },
        globalStyles
    );

    const configSpec = {
        color: VolusionPropTypes.shape({
            background: VolusionPropTypes.color
        }),
        text: VolusionPropTypes.string
    };

    const block = class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                count: 0
            };
        }

        static defaultProps = defaultConfig;

        click = () => {
            this.setState({ count: ++this.state.count });
        };

        render() {
            return (
                <div className={css(classes.div)}>
                    {this.props.text}{' '}
                    <Button.component onClick={this.click}>
                        Click me {this.state.count}{' '}
                    </Button.component>
                </div>
            );
        }
    };

    return {
        block: React.createFactory(block),
        config: configSpec
    };
};

export { factory, defaultConfig };
