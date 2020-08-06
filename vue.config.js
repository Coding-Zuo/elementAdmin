const webpack = require('webpack');
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true
        // proxy: {
        //     '/api': {
        //         target: '',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '/api': ''
        //         }
        //     }
        // }
    }
};
