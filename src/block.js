import { defaultConfig } from './blockConfig';

const factory = ({ React, Button, css, classes }) => {
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

    return block;
};

export { factory, defaultConfig };
