import { uglify } from 'rollup-plugin-uglify';

import baseConfig from './rollup.config';

async function extendConfig(config) {
    const prodConfig = {
        plugins: [uglify()]
    };

    config.plugins = [...config.plugins, ...prodConfig.plugins];

    return config;
}

export default extendConfig(baseConfig);
