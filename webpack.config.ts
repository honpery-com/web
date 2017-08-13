import { CheckerPlugin } from 'awesome-typescript-loader';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
import * as WebpackMerge from 'webpack-merge';
import { getEnv, invariant, root } from './tools/utils';

const extractSass = new ExtractTextPlugin({
    filename: 'style.css',
    disable: getEnv() === 'prod',
});

const baseConfig: webpack.Configuration = {
    entry: {
        app: root('src/app'),
        vendor: root('src/vendor'),
        polyfills: root('src/polyfills'),
    },

    output: {
        path: root('dist'),
        filename: '[name].build.js',
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
        loaders: [
            {
                test: /.tsx?$/,
                loader: 'awesome-typescript-loader',
            },
            {
                test: /.scss$/,
                loaders: extractSass.extract({
                    use: ['style-loader', 'css-loader'],
                    fallback: 'sass-loader',
                }),
            },
        ],
    },

    plugins: [
        new CheckerPlugin(),

        extractSass,

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: root('src/index.html'),
        }),
    ],
};

const devConfig: webpack.Configuration = WebpackMerge(baseConfig, {

    devtool: 'source-map',

    devServer: {
        host: '0.0.0.0',
        port: 8100,
        hot: true,
        inline: true,
        historyApiFallback: true,
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});

const prodConfig: webpack.Configuration = WebpackMerge(baseConfig, {

});

const testConfig: webpack.Configuration = WebpackMerge(baseConfig, {

});

const enableConfig = {
    dev: devConfig,
    prod: prodConfig,
    test: testConfig,
};

const config = enableConfig[getEnv()];

invariant(config, 'NODE_ENV params is\'s enabled.');

export default config;
