const Service = require('egg').Service;

class netnode extends Service {
  // 默认不需要提供构造函数。
  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
    // 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    // 就可以直接通过 this.ctx 获取 ctx 了
    // 还可以直接通过 this.app 获取 app 了
  }
  async addCompany(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/netNode/newCompany', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async addRoad(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/netNode/newRoad', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async addStation(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/netNode/newStation', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async editNetNode(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/netNode/updateNetNode', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async netQueryName(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/netNode/queryNetNodeTree', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async chanelNotice(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/chanel/chanelNotice', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
}

module.exports = netnode;
