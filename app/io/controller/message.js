'use strict';

const Controller = require('egg').Controller;

class message extends Controller {
  async exchangeTest() {
    const ctx  = this.ctx;
    // console.log('connect');
    const message = this.ctx.args[0];
    // console.log('chat :', message + ' : ' + process.pid);
    const say = await this.ctx.service.login.say();
    this.ctx.socket.emit('exchange', say);
  }
}

module.exports = message;
