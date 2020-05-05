const tenantId = '$YOUR_TENANT_ID';

const localEnvPropOverrides = {
    text: 'Custom prop value for local testing'
};

const dataUtils = {
    isRendering: true
};

const blockModule = window.volBlock_local;

window.ElementSdk.client.configure({
    tenant: tenantId
});

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
        ...blockModule.defaultConfig,
        ...localEnvPropOverrides,
        queryParams: createQueryParams(),
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

function setFallbackStoreInfo() {
    clientUtils.client.setStoreInfo({});
}

// If tenant has been updated, set storeInformation
if (!/\$YOUR_TENANT_ID/i.test(clientUtils.client.tenant)) {
    clientUtils.client.storeInfo
        .get()
        .then(storeInformation => {
            clientUtils.client.setStoreInfo({ ...storeInformation });
        })
        .catch(setFallbackStoreInfo);
} else {
    setFallbackStoreInfo();
}

window.onload = () =>
    blockModule
        .getDataProps(
            { ...clientUtils, ...serverUtils, ...dataUtils },
            {
                ...blockModule.defaultConfig,
                ...localEnvPropOverrides,
                queryParams: createQueryParams()
            }
        )
        .then(renderBlock);
