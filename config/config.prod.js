'use strict';
const path = require('path');
module.exports = appInfo => {
  return {
    apiAdress: 'https://localhost:8551',
    // apiAdress: 'http://test.vfjtech.com.cn:9888',
    cluster: {
      listen: {
        port: 8550,
        hostname: '0.0.0.0',
        // path: '/var/run/egg.sock',
      },
      https: {
        key: path.join(__dirname, '../server.key'),
        cert: path.join(__dirname, '../server.cert'),
        ca: path.join(__dirname, '../server.ca'),
      },
    },
  };
};
