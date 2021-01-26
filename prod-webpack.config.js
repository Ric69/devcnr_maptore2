const path = require("path");

const themeEntries = require('./MapStore2/build/themes.js').themeEntries;
const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const ModuleFederationPlugin = require('./MapStore2/build/moduleFederation').plugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};

module.exports = require('./MapStore2/build/buildConfig')(
    {
        'devcnr-cnrmaps': path.join(__dirname, "js", "app"),
        'devcnr-cnrmaps-embedded': path.join(__dirname, "MapStore2", "web", "client", "product", "embedded"),
        'devcnr-cnrmaps-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api")
    },
    themeEntries,
    paths,
    [extractThemesPlugin, ModuleFederationPlugin],
    true,
    "dist/",
    '.devcnr-cnrmaps',
    [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'indexTemplate.html'),
            chunks: ['devcnr-cnrmaps'],
            inject: "body",
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'embeddedTemplate.html'),
            chunks: ['devcnr-cnrmaps-embedded'],
            inject: "body",
            hash: true,
            filename: 'embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'apiTemplate.html'),
            chunks: ['devcnr-cnrmaps-api'],
            inject: 'head',
            hash: true,
            filename: 'api.html'
        })
    ],
    {
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
);
