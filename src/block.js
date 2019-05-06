import { defaultConfig } from './blockConfig';

const factory = ({ React, css, classes }) => {
    const block = class extends React.Component {
        static defaultProps = defaultConfig;
        render() {
            return <div className={css(classes.div)}>{this.props.text}</div>;
        }
    };

    return block;
};

export { factory };
