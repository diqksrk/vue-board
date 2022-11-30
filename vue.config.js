 module.exports = {
    devServer: {
        proxy: {
            '/api': {
                // target: 'http://localhost:8888',
                // target: 'http://49.50.161.55:8888',
                target: 'http://slb-14970328.ncloudslb.com:80',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api' : ''
                }
            }
        }
    }
}