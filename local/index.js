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
    globalComponents: {
        volComponentButton: {
            primaryButtonStyles: {
                textColor: '#fff',
                hoverTextColor: '#fff',
                backgroundColor: '#f9783c',
                hoverBackgroundColor: '#f45722',
                borderColor: '#f9783c',
                hoverBorderColor: '#f45722',
                fontWeight: '800', // 300, 400, 500, 600, 700, 800, 900
                textTransform: 'none', // none, capitalize, lowercase, uppercase
                borderThickness: 'basic', // basic, thin, thick, none
                size: 'large', // small, medium, large, block
                rounded: 'medium', // none, small, medium, large, pill
                growOnHover: false
            },
            secondaryButtonStyles: {
                textColor: '#f9783c',
                hoverTextColor: '#fff',
                backgroundColor: '#fff',
                hoverBackgroundColor: '#f9783c',
                borderColor: '#f9783c',
                hoverBorderColor: '#f9783c',
                fontWeight: '800', // 300, 400, 500, 600, 700, 800, 900
                textTransform: 'none', // none, capitalize, lowercase, uppercase
                letterSpacing: 'none', // none, tracked, tight, mega
                borderThickness: 'basic', // basic, thin, thick, none
                size: 'large', // small, medium, large, block
                rounded: 'medium', // none, small, medium, large, pill
                growOnHover: false
            }
        }
    },
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
    canonicalUrl
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
