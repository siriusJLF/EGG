'use strict';

const Controller = require('egg').Controller;

class terminal extends Controller {
  async eqmentIn() {
    const ctx  = this.ctx;
    const title = '终端入库';
    await this.ctx.render('terminal/terminalImport',{title});
  }
  async applyIn() {
    const ctx  = this.ctx;
    const title = '终端申请';
    await this.ctx.render('terminal/terminalReceive',{title});
  }
  async listIn() {
    const ctx = this.ctx;
    const title = '终端明细';
    const netnode = ctx.session.userInfo.netNodeCode;
    const lever = ctx.session.userInfo.lever;
    const netNodeName = ctx.session.userInfo.netNodeName;
    let type;
    if (ctx.session.userInfo.roleIds.indexOf('ROLEMANAGER') >= 0) {
      type = 1; // 路公司成员
    } else {
      type = 0; // 路网中心用户
    }
    if (ctx.session.userInfo.roleIds.indexOf('ADMINISTRATOR') >= 0) {
      await this.ctx.render('terminal/terminalList', { title, type, lever, netNodeName, netnode });
    } else {
      await this.ctx.render('terminal/terminalListRoad', { title, netnode });
    }
  }
  // 添加终端
  async addAuthModel() {
    const ctx = this.ctx;
    const data = {
      deviceSerialNo: ctx.request.body.deviceSerialNo,
      deviceModel: ctx.request.body.deviceModel,
      wareId: ctx.request.body.wareId,
      companyCode: ctx.request.body.companyCode,
      roadCode: ctx.request.body.roadCode,
      stationCode: ctx.request.body.stationCode,
      mantPerson: ctx.request.body.mantPerson,
      // status: ctx.request.body.status,
      mantTel: ctx.request.body.mantTel,
      workUrl: ctx.request.body.workUrl,
      // lastShakeHane: ctx.request.body.lastShakeHane,
      remark: ctx.request.body.remark,
      backUrl1: ctx.request.body.backUrl1,
      backUrl2: ctx.request.body.backUrl2,
    };
    const result = await ctx.service.issue.addAuthModel(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.data.message,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 终端入库
  async moldeImport() {
    const ctx = this.ctx;
    const data = {
      operatorId: ctx.session.userInfo.userId ? ctx.session.userInfo.userId : '',
      deviceSerialNo: ctx.request.body.deviceSerialNo,
      wareId: ctx.request.body.wareId,
      flag: 'true',
    };
    // console.log(data);
    const result = await ctx.service.issue.moldeImport(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 终端修改
  async updateAuthModel() {
    const ctx = this.ctx;
    const data = {
      authModelId: ctx.request.body.authModelId,
      wareId: ctx.request.body.wareId,
      companyCode: ctx.request.body.companyCode,
      roadCode: ctx.request.body.roadCode,
      stationCode: ctx.request.body.stationCode,
      mantPerson: ctx.request.body.mantPerson,
      mantTel: ctx.request.body.mantTel,
      status: ctx.request.body.status,
      workUrl: ctx.request.body.workUrl,
      lastShakeHane: ctx.request.body.lastShakeHane,
      remark: ctx.request.body.remark,
      backUrl1: ctx.request.body.backUrl1,
      backUrl2: ctx.request.body.backUrl2,
    };
    // console.log(data);
    const result = await ctx.service.issue.updateAuthModel(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 终端领用
  async moldelGrant() {
    const ctx = this.ctx;
    const data = {
      operatorId: ctx.session.userInfo.userId ? ctx.session.userInfo.userId : '',
      recver: ctx.request.body.recver,
      companyCode: ctx.request.body.companyCode,
      roadCode: ctx.request.body.roadCode,
      stationCode: ctx.request.body.stationCode,
      deviceSerialNo: ctx.request.body.deviceSerialNo,
      wareId: ctx.request.body.wareId,
      url: ctx.request.body.url,
    };
    const result = await ctx.service.issue.moldelGrant(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 终端停用
  async authMoudleStop() {
    const ctx = this.ctx;
    const data = {
      operatorId: ctx.session.userInfo.userId ? ctx.session.userInfo.userId : '',
      deviceSerialNo: ctx.request.body.deviceSerialNo,
      remark: ctx.request.body.remark,
    };
    const result = await ctx.service.issue.authMoudleStop(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 终端回收
  async authMoudleRecovery() {
    const ctx = this.ctx;
    const data = {
      operatorId: ctx.session.userInfo.userId ? ctx.session.userInfo.userId : '',
      deviceSerialNo: ctx.request.body.deviceSerialNo,
      remark: ctx.request.body.remark,
    };
    const result = await ctx.service.issue.authMoudleRecovery(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 终端查询
  async modelQuery() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      deviceSerialNo: ctx.request.query.deviceSerialNo ? ctx.request.query.deviceSerialNo : '',
      authModelId: ctx.request.query.authModelId ? ctx.request.query.authModelId : '',
      wareId: ctx.request.query.wareId ? ctx.request.query.wareId : '',
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      mantPerson: ctx.request.query.mantPerson ? ctx.request.query.mantPerson : '',
      status: ctx.request.query.status ? ctx.request.query.status : '',
    };
    // eslint-disable-next-line default-case
    switch (ctx.session.userInfo.lever) {
      case 2:
        data.companyCode = '';
        data.roadCode = ctx.session.userInfo.netNodeCode;
        break;
      case 3:
        data.companyCode = '';
        data.roadCode = '';
        data.stationCode = ctx.session.userInfo.netNodeCode;
        break;
      default:
        break;
    }
    // console.log(data);
    const result = await ctx.service.issue.modelQuery(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
}

module.exports = terminal;
