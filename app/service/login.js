const Service = require('egg').Service;

class login extends Service {
  // 默认不需要提供构造函数。
  constructor(ctx) {
    super(ctx);
    // 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    // 就可以直接通过 this.ctx 获取 ctx 了
    // 还可以直接通过 this.app 获取 app 了
    // this.app.httpclient.once('request', req => {
    //   // console.log(req.ctx.request.method);
    //   // console.log(req.ctx.request.url);
    //   if (req.ctx.request.url.indexOf('login') < 0) {
    //     ctx.set(req.ctx.request.header.userInfo = ctx.session.userInfo.userId);
    //   }
    // });
  }
  async loginAPI(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/login', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async loginIpt(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/userLogin', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async say() {
    return 'Hello Man!';
  }
  async sysUserQuery(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/queryManagerByManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async sysUserAdd(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/addManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async sysUserUpdate(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/updateManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      userInfo: this.ctx.session.userInfo.userId,
      dataType: 'json',
    });
    return result.data;
  }
  async sysUserPswUpdate(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/updatePassword', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async sysRoleQuery(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/queryRoleByManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async sysRoleAdd(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/newRole', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async sysRoleUpdate(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/updateRole', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async sysPswUpdate(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/updatePassword', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async getMenu(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/ware/getMenu', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async resetPassword(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/resetPassword', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
}

module.exports = login;
