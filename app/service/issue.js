const Service = require('egg').Service;

class issue extends Service {
  // 默认不需要提供构造函数。
  // eslint-disable-next-line no-useless-constructor
  constructor(ctx) {
    super(ctx);
    // 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
    // 就可以直接通过 this.ctx 获取 ctx 了
    // 还可以直接通过 this.app 获取 app 了
    // this.app.httpclient.on('request', req => {
    //   // console.log(req.ctx.request.method);
    //   // console.log(req.ctx.request.url);
    //   // console.log(req.ctx.request.header);
    // });
  }
  async queryUsage(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/ware/queryAllUsage', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async wareSearch(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/ware/queryAllWare', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async netListCompany(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/netNode/queryAllNetNode', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 50000,
    });
    return result.data;
  }
  async netListTable(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/netNode/queryNetNodeTree', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async queryChanelByManager(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/chanel/queryChanelByManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async psamApply(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/issueBatch/apply4Psam', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async applyRecord(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/issueBatch/queryIssueBatchByManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async applyRecordAll(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/issueBatch/queryAllIssueBatch', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async approveDo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/issueBatch/psamApproval', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async queryAllManager(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/queryAllManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async queryUserByRoles(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/manager/queryUserByRoles', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async queryIssue(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/issueBatch/queryIssueBatchByManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async queryIssueById(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/issueBatch/getIssueBatchById', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async materialList(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/importBatch/queryImportBatchByManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
    });
    return result.data;
  }
  async psamImport(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/importBatch/psamImport', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async modelQuery(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/authModel/queryAuthModelByManager', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async moldeImport(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/authModel/authMoudleImport', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async psamInformDo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/issueBatch/issueBatchGrantNotice', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async psamconfirmDo(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/issueBatch/issueBatchNoticeConfirm', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async addAuthModel(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/authModel/addAuthModel', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async updateAuthModel(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/authModel/updateAuthModel', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async moldelGrant(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/authModel/authMoudleGrant', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async authMoudleStop(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/authModel/authMoudleStop', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async authMoudleRecovery(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/authModel/authMoudleRecovery', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async psamLost(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/psam/psamLost', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async psamUnLost(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/psam/psamUnLost', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
  async psamRecovery(data = {}) {
    const result = await this.ctx.curl(this.app.config.apiAdress + '/api/psam/psamRecovery', {
      method: 'POST',
      contentType: 'x-www-form-urlencoded',
      data: data,
      dataType: 'json',
      timeout: 30000,
    });
    return result.data;
  }
}

module.exports = issue;
