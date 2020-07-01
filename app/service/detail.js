const Service = require('egg').Service;

class detail extends Service {
  // 默认不需要提供构造函数。
  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
    // 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    // 就可以直接通过 this.ctx 获取 ctx 了
    // 还可以直接通过 this.app 获取 app 了
  }
  async queryPsamCard(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/psam/queryPsamByManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async queryAuthLine(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryAuthLine', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async querySignline(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/querySignline', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async queryFrontSetUp(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryFrontSetUp', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async queryChanelSetUp(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryChanelSetUp', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async queryProjectInfo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryProjectInfo', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async queryAuthModelLine(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryAuthModelLine', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async queryAuthFrontInfo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryAuthFrontInfo', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async countPsamStockInfo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/report/countPsamStockInfo', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async queryResponsChange(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/psam/queryResponsChange', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async responsChangeApply(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/psam/responsChangeApply', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async cfmResponsChange(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/psam/cfmResponsChange', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async queryGate24hInfo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryGate24hInfo', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async queryChanel24hInfo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryChanel24hInfo', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async queryGateline2(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryGateline2', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 60000,
    });
    return result.data;
  }
  // 车道psam签到授权统计
  async queryMaxIpPsamCardChnl(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryMaxIpPsamCardChnl', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  // 门架psam签到授权统计
  async queryMaxIpPsamCardGate(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/line/queryMaxIpPsamCardGate', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  // psam路公司应用监控查询
  async psamAppMonitor4Excel(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/report/psamAppMonitor4Excel', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  // psam应用明细监控查询
  async psamAppMonitorDtl4Excel(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/report/psamAppMonitorDtl4Excel', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  // psam应用明细监控查询-文件流
  async psamApplicationDtlFile(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/report/psamApplicationDtlFile', {
      method: 'GET',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }

}

module.exports = detail;
