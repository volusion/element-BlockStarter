import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';

function distBuild(options) {
    options = options || {};

    return {
        input: 'src/index.js',
        output: {
            file: `dist/${options.filename}`,
            format: options.format,
            name: 'volBlockHelloWorldBlock',
            sourcemap: options.sourcemap
        },
        external: ['aphrodite'],
        plugins: [
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            babel({
                babelrc: false,
                presets: [['env', { modules: false }], 'stage-1', 'react'],
                externalHelpers: true,
                exclude: ['node_modules/**']
            }),
            resolve({
                browser: true
            }),
            commonjs()
        ]
    };
}

export default distBuild({
    filename: 'component.umd.js',
    format: 'umd',
    sourcemap: true
});
