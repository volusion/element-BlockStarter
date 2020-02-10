const blockModule = window.volBlock_local;

const tenantId = '$YOUR_TENANT_ID';

window.ElementSdk.client.configure({
    tenant: tenantId
});

const globalStyles = {
    color: {},
    globalComponents: {},
    typography: {}
};

const createQueryParams = () => {
    const params = {};
    const searchParams = window.location.search;
    if (searchParams) {
        const urlParams = searchParams.replace('?', '').split('&');
        urlParams.forEach(param => {
            const [key, value] = param.split('=');
            params[key] = decodeURI(value);
        });
    }
    return params;
};
const canonicalUrl = (newQueryParams = {}) => {
    const currentQueryParams = createQueryParams();
    const allQueries = { ...currentQueryParams, ...newQueryParams };
    const joinedQueries = Object.keys(allQueries)
        .map(queryName => `${queryName}=${allQueries[queryName]}`)
        .join('&');
    const queryString = joinedQueries ? '?' + joinedQueries : '';
    return window.location.origin + queryString;
};

const { joinClasses, PubSub, ...sdkUtils } = window.ElementSdk;

const utils = {
    ...sdkUtils,
    pubSub: PubSub.PubSub,
    isAmpRequest: /googleamp/i.test(window.location.pathname)
        ? true
        : undefined,
    canonicalUrl
};

const props = {
    ...blockModule.defaultConfig,
    utils,
    joinClasses,
    queryParams: createQueryParams(),
    text: 'Custom prop value for local testing'
};

function configureBlock(data) {
    const block = blockModule.block;
    return React.createElement(block, { ...props, data });
}

function renderBlock(data = {}) {
    const block = configureBlock(data);
    const root = document.getElementById('root');
    ReactDOM.render(block, root);
}

window.onload = () =>
    blockModule.getDataProps({ ...utils }, { ...props }).then(renderBlock);
