const blockModule = window.volBlock_local;

const tenantId = '$YOUR_TENANT_ID';

window.ElementSdk.client.configure({
    tenant: tenantId
});

const globalStyles = {
    color: {
        background: '#fff',
        link: '#333',
        linkHover: '#333',
        primary: '#333',
        salePrice: '#333',
        secondary: '#333',
        text: '#333'
    },
    globalComponents: {},
    typography: {
        baseFontSize: '16px',
        fontFamily: `"Roboto", sans-serif`,
        headingFontFamily: `"Roboto", sans-serif`,
        headingWeight: 700,
        lineHeight: '1.15'
    }
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
const addLink = href => {
    const link = document.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    document.head.appendChild(link);
};

const {
    joinClasses,
    ElementPropTypes,
    Components,
    hydrateBlocks,
    PubSub,
    ...sdkUtils
} = window.ElementSdk;

const serverUtils = {
    isRendering: true
};

const utils = {
    ...sdkUtils,
    pubSub: PubSub.PubSub,
    isAmpRequest: /googleamp/i.test(window.location.pathname)
        ? true
        : undefined,
    canonicalUrl,
    addLink
};

const props = {
    ...blockModule.defaultConfig,
    queryParams: createQueryParams(),
    text: 'Custom prop value for local testing'
};

function configureBlock(data = {}) {
    const block = blockModule.block;
    return React.createElement(block, { ...props, utils, joinClasses, data });
}

function renderBlock(data) {
    const block = configureBlock(data);
    const root = document.getElementById('root');
    ReactDOM.render(block, root);
}

window.onload = () =>
    blockModule
        .getDataProps({ ...utils, ...serverUtils }, { ...props })
        .then(renderBlock);
