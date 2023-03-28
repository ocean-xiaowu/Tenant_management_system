module.exports = {
    // 输出文件目录
    outputDir: 'dist',
    //去掉map文件
    productionSourceMap: false,
    // 关闭eslink
    lintOnSave: false,
    devServer: {
        open: true,
        port: 9999,
        // 反向代理
        // proxy: {
        //     '/api': {
        //         target: '',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             "^/api": ""
        //         }
        //     }
        // }
    },
    // debugger定位
    configureWebpack: { // webpack 配置
        devtool: 'source-map',
    }
}