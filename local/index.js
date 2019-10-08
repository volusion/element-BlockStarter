const blockModule = volBlockStarterBlock;

const tenantId = '$YOUR_TENANT_ID';

window.ElementSdk.client.configure({
    tenant: tenantId
});

const globalStyles = {
    color: {},
    globalComponents: {},
    typography: {}
};

const props = {
    ...blockModule.defaultConfig,
    text: 'Custom prop value for local testing'
};

const utils = {
    client: window.ElementSdk.client
};

function createBlock() {
    const ElementPropTypes = window.ElementSdk.ElementPropTypes;
    const Components = window.ElementSdk.Components;

    return blockModule.factory(
        { React, ElementPropTypes, Components },
        utils,
        aphrodite,
        globalStyles,
        props
    ).block;
}

function configureBlock(data) {
    const block = createBlock();
    return block({ ...props, data });
}

function renderBlock(data) {
    const block = configureBlock(data);
    const root = document.getElementById('root');
    ReactDOM.render(block, root);
}

window.onload = () => blockModule.getDataProps(utils, props).then(renderBlock);
