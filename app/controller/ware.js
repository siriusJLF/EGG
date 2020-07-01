'use strict';
const time = require('silly-datetime');
const Controller = require('egg').Controller;

class ware extends Controller {
  // 物料管理页面
  async supplierAdd() {
    const ctx = this.ctx;
    const title = '添加物料';
    await this.ctx.render('supplier/supplierManage', { title });
  }
  async supplierDetail() {
    const ctx = this.ctx;
    const title = '物料明细';
    await this.ctx.render('supplier/supplierList', { title });
  }
  async factoryAdd() {
    const ctx = this.ctx;
    const title = '物料明细';
    await this.ctx.render('supplier/factoryAdd', { title });
  }
  async factoryManage() {
    const ctx = this.ctx;
    const title = '物料明细';
    await this.ctx.render('supplier/factoryManage', { title });
  }
  // 采购申请
  async purchasedo() {
    const ctx = this.ctx;
    const data = {
      title: ctx.request.body.title,
      wareId: ctx.request.body.wareId,
      count: ctx.request.body.count,
      remark: ctx.request.body.remark,
      applyPerson: ctx.session.userInfo,
    };
    const result = await ctx.service.ware.purchasedo(data);
    console.log(result);
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
  //  查询入库信息
  async materialList() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      status: ctx.request.query.status ? ctx.request.query.status : '',
      id: ctx.request.query.id ? ctx.request.query.id : '',
      title: ctx.request.query.title ? ctx.request.query.title : '',
      wareId: ctx.request.query.wareId ? ctx.request.query.wareId : '',
      importBeginTime: ctx.request.query.importBeginTime ? time.format(ctx.request.query.importBeginTime, 'YYYYMMDD0000') : '',
      importEndTime: ctx.request.query.importEndTime ? time.format(ctx.request.query.importEndTime, 'YYYYMMDD2359') : '',
      // issuerId: ctx.session.userInfo,
      isImport: ctx.request.query.isImport ? ctx.request.query.isImport : '',
      hasImport: ctx.request.query.hasImport ? ctx.request.query.hasImport : '',
    };
    const result = await ctx.service.issue.materialList(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 入库
  async psamImport() {
    const ctx = this.ctx;
    const data = {
      batchNo: ctx.request.body.batchNo,
      count: ctx.request.body.count,
      startPtrNum: ctx.request.body.startPtrNum,
      importPerson: ctx.session.userInfo.userId,
    };
    // console.log(data);
    const result = await ctx.service.issue.psamImport(data);
    console.log(result);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error(result.status + '' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 厂家查询下拉
  async queryFactory() {
    const ctx = this.ctx;
    const data = {

    };
    const result = await ctx.service.ware.queryFactory(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 添加物料
  async wareAdd() {
    const ctx = this.ctx;
    const data = {
      wareName: ctx.request.body.wareName,
      factoryCode: ctx.request.body.factoryCode,
      // factoryName: ctx.request.body.factoryName,
      version: ctx.request.body.version,
      spec: ctx.request.body.spec,
      remark: ctx.request.body.remark,
      usageId: ctx.request.body.usageId,
    };
    const result = await ctx.service.ware.wareAdd(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.data.message,
      };
    } else {
      ctx.logger.error(new Error(result.status + '' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 添加厂家
  async wareFactoryAdd() {
    const ctx = this.ctx;
    const data = {
      factoryName: ctx.request.body.factoryName,
      contracrTel: ctx.request.body.contracrTel,
      contractPerson: ctx.request.body.contractPerson,
      remark: ctx.request.body.remark,
    };
    const result = await ctx.service.ware.wareFactoryAdd(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.data.message,
      };
    } else {
      ctx.logger.error(new Error(result.status + '' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 修改厂家
  async wareFactoryUpdate() {
    const ctx = this.ctx;
    const data = {
      factoryCode: ctx.request.body.factoryCode,
      factoryName: ctx.request.body.factoryName,
      contracrTel: ctx.request.body.contracrTel,
      contractPerson: ctx.request.body.contractPerson,
      remark: ctx.request.body.remark,
      // factoryType: ctx.request.body.factoryType,
    };
    const result = await ctx.service.ware.wareFactoryUpdate(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error(result.status + '' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 修改物料
  async wareSupUpdate() {
    const ctx = this.ctx;
    const data = {
      wareId: ctx.request.body.wareId,
      wareName: ctx.request.body.wareName,
      factoryCode: ctx.request.body.factoryCode,
      version: ctx.request.body.version,
      spec: ctx.request.body.spec,
      usageId: ctx.request.body.usageId,
      remark: ctx.request.body.remark,
    };
    const result = await ctx.service.ware.wareSupUpdate(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error(result.status + '' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 物料查询
  async wareQuery() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      wareName: ctx.request.query.wareName ? ctx.request.query.wareName : '',
      factoryCode: ctx.request.query.factoryCode ? ctx.request.query.factoryCode : '',
      factoryName: ctx.request.query.factoryName ? ctx.request.query.factoryName : '',
      usageId: ctx.request.query.usageId ? ctx.request.query.usageId : '',
    };
    const result = await ctx.service.ware.wareQuery(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + '' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 厂家查询
  async wareFactoryQuery() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      factoryName: ctx.request.query.factoryName ? ctx.request.query.factoryName : '',
      factoryType: ctx.request.query.factoryType ? ctx.request.query.factoryType : '',
    };
    const result = await ctx.service.ware.wareFactoryQuery(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + '' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }

// bottom
}

module.exports = ware;
