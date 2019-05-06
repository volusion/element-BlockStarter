import { defaultConfig } from './blockConfig';

const factory = React => {
    const block = function(props) {
        return <h1>{props.text}</h1>;
    };
    block.defaultProps = defaultConfig;
    return block;
};

export { factory };
