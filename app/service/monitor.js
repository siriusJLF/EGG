const Service = require('egg').Service;

class monitor extends Service {
  // 默认不需要提供构造函数。
  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
    // 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    // 就可以直接通过 this.ctx 获取 ctx 了
    // 还可以直接通过 this.app 获取 app 了
  }
  // 总数
  async queryTotal(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryTotal', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 库存前十
  async queryStockIndex(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryStockIndex', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 省部比例
  async queryPropo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryPropo', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 签到交易流水10条
  async querySignline(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/querySignline', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 门架交易流水10条
  async queryGateline(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryGateline', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 授权交易流水10条
  async queryAuthFrontTrace(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryAuthFrontTrace', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 高脱机率
  async queryOfflineRateWarnning(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryOfflineRateWarnning', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 脱机在线比例
  async queryOfflineAuthorizeCount(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryOfflineAuthorizeCount', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 授权交易量
  async queryAuthorizeTradingVolume(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryAuthorizeTradingVolume', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 门架交易量
  async queryGantryTradingVolume(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryGantryTradingVolume', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 签到交易量
  async querySignTradingVolume(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/querySignTradingVolume', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 服务器资源
  async getCpu(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/getCpu', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 车道统计
  async queryChanelStatusCount(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryChanelStatusCount', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 门架统计
  async queryGantryCount(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryGantryCount', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 终端统计
  async queryOfflineTraceCount(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryOfflineTraceCount', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  // 站点统计
  async queryStationStatusRepo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryStationStatusRepo', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  // PSAM状态
  async queryPsamCount(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryPsamCount', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  // 站点地图
  async queryPsamStatusStationCount(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryPsamStatusStationCount', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  // 异常车道信息
  async queryNewestTenErrChanel(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryNewestTenErrChanel', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  //  psam 统计明细表格
  async queryPsamCountDetail(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryPsamCountDetail', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  // 站点详细信息
  async getStationDetailMsg(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/getStationDetailMsg', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  // psam发行情况统计
  async queryPsamIssuedOrNotCount(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryPsamIssuedOrNotCount', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  // 发行情况明细
  async queryPsamIssueOrNotCountDetail(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/monitor/queryPsamIssueOrNotCountDetail', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }

}

module.exports = monitor;
