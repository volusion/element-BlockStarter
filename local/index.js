const blockModule = window.volBlock_local

const tenantId = '$YOUR_TENANT_ID'

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
const canonicalUrl = queryParams => {
  let searchString = '';
  const queries = Object.keys(queryParams);
  queries.forEach((query, index) => {
    index === 0 ? (searchString += '?') : (searchString += '&');
    searchString += `${query}=${queryParams[query]}`;
  });
  return window.location.origin + searchString;
};

const utils = {
  ...window.ElementSdk,
  css: aphrodite.css,
  StyleSheet: aphrodite.StyleSheet,
  isAmpRequest: /googleamp/i.test(window.location.pathname) ? true : undefined,
  queryParams: createQueryParams(),
  canonicalUrl
};

const props = { 
  ...blockModule.defaultConfig,
  text: 'Custom prop value for local testing'
}

function createBlock() {
  const ElementPropTypes = window.ElementSdk.ElementPropTypes
  const Components = window.ElementSdk.Components

  return blockModule.factory(
    { React, ElementPropTypes, Components },
    utils,
    aphrodite,
    globalStyles,
    props
  ).block;
}

function configureBlock(data) {
  const block = createBlock()
  return block({ ...props, data })
} 

function renderBlock(data) {
  const block = configureBlock(data)
  const root = document.getElementById('root')
  ReactDOM.render(block, root)
}

window.onload = () => (
  blockModule
  .getDataProps(window.ElementSdk, props)
  .then(renderBlock)
)
