import { CheckerPlugin } from 'awesome-typescript-loader';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

function Root(...paths: string[]) {
    return path.join(__dirname, ...paths);
}
const isDev = process.env.NODE_ENV === 'dev';

const extractSass = new ExtractTextPlugin({
    filename: 'style.css',
    disable: !isDev,
});

const baseConfig: webpack.Configuration = {

    context: Root(),

    output: {
        path: Root('dist'),
        filename: isDev ? '[name].js' : '[name].[chunkhash8].js',
        chunkFilename: isDev ? '[name].chunk.js' : '[name].[chunkhash8].chunk.js',
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
            template: Root('src/index.html'),
        }),

        new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: isDev ? 'cheap-module-source-map' : 'source-map',

};

const clientConfig: webpack.Configuration = {

    ...baseConfig,

    name: 'client',

    target: 'web',

    entry: {
        client: Root('src/client'),
    },

    devServer: {
        host: '0.0.0.0',
        port: 8100,
        hot: true,
        inline: true,
        historyApiFallback: true,
    },

    plugins: [
        ...baseConfig.plugins,

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => /node_modules/.test(module.resource),
        }),
    ],

};

const serverConfig: webpack.Configuration = {

    ...baseConfig,

    name: 'server',

    target: 'node',

    entry: {
        server: Root('src/server'),
    },
};

export default [clientConfig, serverConfig];
