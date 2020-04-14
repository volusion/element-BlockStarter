const blockModule = window.volBlock_local;

const tenantId = '$YOUR_TENANT_ID';

const props = {
    ...blockModule.defaultConfig,
    queryParams: createQueryParams(),
    text: 'Custom prop value for local testing'
};

const dataUtils = {
    isRendering: true
};

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

function createQueryParams() {
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
}
function canonicalUrl(queryParams = {}) {
    const joinedQueries = Object.keys(queryParams)
        .map(queryName => `${queryName}=${queryParams[queryName]}`)
        .join('&');
    const queryString = joinedQueries ? '?' + joinedQueries : '';
    return window.location.origin + queryString;
}
function addLink(href) {
    const link = document.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    document.head.appendChild(link);
}

const isAmpRequest = /googleamp/i.test(window.location.pathname)
    ? true
    : undefined;

function addAmpScript(customElement) {
    if (isAmpRequest) {
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.setAttribute('custom-element', customElement);
        script.setAttribute(
            'src',
            `https://cdn.ampproject.org/v0/${customElement}-0.1.js`
        );
        document.head.appendChild(script);
    } else {
        console.error(
            `"addAmpScript" is only available on AMP pages. Please check if "isAmpRequest" is true before using this function.`
        );
    }
}

function throwNotFound() {
    console.error(
        `"throwNotFound()" was called. On a live site, this would load a 404 page.`
    );
}

/* eslint-disable no-unused-vars */
const {
    joinClasses,
    ElementPropTypes,
    Components,
    hydrateBlocks,
    PubSub,
    addScript,
    ...sdkUtils
} = window.ElementSdk;
/* eslint-enable no-unused-vars */

const serverUtils = {
    addAmpScript,
    addLink,
    addScript,
    isAmpRequest,
    throwNotFound
};

const clientUtils = {
    ...sdkUtils,
    ...serverUtils,
    pubSub: PubSub.PubSub,
    canonicalUrl
};

function configureBlock(data = {}) {
    const block = blockModule.block;
    return React.createElement(block, {
        ...props,
        utils: { ...clientUtils, ...serverUtils },
        joinClasses,
        data
    });
}

function renderBlock(data) {
    const block = configureBlock(data);
    const root = document.getElementById('root');
    ReactDOM.render(block, root);
}

// If tenant has been updated, set storeInformation
if (!/\$YOUR_TENANT_ID/i.test(clientUtils.client.tenant)) {
    clientUtils.client.storeInfo.get().then(storeInformation => {
        clientUtils.client.setStoreInfo({ ...storeInformation });
    });
}

window.onload = () =>
    blockModule
        .getDataProps(
            { ...clientUtils, ...serverUtils, ...dataUtils },
            { ...props }
        )
        .then(renderBlock);
