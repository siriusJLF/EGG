// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAuthLogin = require('../../../app/middleware/authLogin');

declare module 'egg' {
  interface IMiddleware {
    authLogin: typeof ExportAuthLogin;
  }
}
