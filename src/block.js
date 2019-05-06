import { defaultConfig } from './blockConfig';

const factory = ({ React, css, classes }) => {
    const block = function(props) {
        return <div className={css(classes.div)}>{props.text}</div>;
    };
    block.defaultProps = defaultConfig;
    return block;
};

export { factory };
