const webpack = require('webpack');
module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true
        // proxy: {
        // '/api':{
        //     target:'http://jsonplaceholder.typicode.com',
        //     changeOrigin:true,
        //     pathRewrite:{
        //         '/api':''
        //     }
        // }
        // }
    }
};
