import { defaultConfig } from './blockConfig';

const factory = React => {
    const block = function(props) {
        return <div>{props.text}</div>;
    };
    block.defaultProps = defaultConfig;
    return block;
};

export { factory };
