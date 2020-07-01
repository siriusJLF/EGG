const Service = require('egg').Service;

class ware extends Service {
  // 默认不需要提供构造函数。
  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
    // 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    // 就可以直接通过 this.ctx 获取 ctx 了
    // 还可以直接通过 this.app 获取 app 了
  }
  async purchasedo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/importBatch/newImportBatch', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async wareAdd(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/ware/addWare', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async wareQuery(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/ware/queryWareByManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async queryFactory(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/factory/queryAllFactory', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async wareFactoryAdd(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/factory/addFactory', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async wareFactoryQuery(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/factory/queryFactoryByManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async wareFactoryUpdate(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/factory/updateFactory', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async wareSupUpdate(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/ware/updateWare', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }

}

module.exports = ware;
