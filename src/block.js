import { defaultConfig } from './blockConfig';

const factory = ({ React, css, classes }) => {
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
            return <div className={css(classes.div)}>{this.props.text}</div>;
        }
    };

    return block;
};

export { factory, defaultConfig };
