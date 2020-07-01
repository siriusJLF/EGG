'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async login() {
    const {ctx}  = this.ctx;
    // const body = this.ctx.request.body;
    const result = {
      errMsg: this.ctx.session.errMsg,
      loginId: this.ctx.session.lgoinid,
      pwd: this.ctx.session.pwd,
    }
    this.ctx.session = null;
    await this.ctx.render('sign/index',{result});
  }
  async pageIndex() {
    const  ctx = this.ctx;
    const userName = this.ctx.session.userInfo.userName;
    const userId = this.ctx.session.userInfo.userId;
    await this.ctx.render('index/index', { userName, userId });
    // const result = await ctx.service.login.getMenu(data);
    // // console.log(result);
    // if (result.status == 200) {
    //   await this.ctx.render('index/index', { userName });
    // } else {
    //   ctx.logger.error(new Error(result.message));
    //   ctx.body = { result: false, data: '后台报错', errMsg: result.message };
    // }
  }
  async erro() {
    const { ctx } = this;
    await this.ctx.render('erro/412');
  }
  async menulist() {
    const { ctx } = this;
    const data = {
      userId: this.ctx.session.userInfo.userId,
    }
    const result = await ctx.service.login.getMenu(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data,
      };
    } else {
      console.log(result);
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
}

module.exports = HomeController;
