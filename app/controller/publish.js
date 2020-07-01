'use strict';
const time = require('silly-datetime');
const Controller = require('egg').Controller;

class publish extends Controller {
  async purchase() {
    const ctx  = this.ctx;
    const title = '需求提交';
    await this.ctx.render('publish/purchase',{title});
  }
  async inventory() {
    const ctx  = this.ctx;
    const title = '物料入库';
    await this.ctx.render('publish/inventory',{title});
  }
  async inventoryList() {
    const ctx  = this.ctx;
    const title = '物料入库';
    await this.ctx.render('publish/inventoryList',{title});
  }
  async cardApply() {
    const ctx  = this.ctx;
    const title = '申请';
    const user = ctx.session.userInfo.userId;
    await this.ctx.render('publish/cardApply',{title,user});
  }
  async cardApprove() {
    const ctx  = this.ctx;
    const title = '审批';
    const user = ctx.session.userInfo.userId;
    await this.ctx.render('publish/cardApprove', { title, user });
  }
  async issueList() {
    const ctx  = this.ctx;
    const title = '发行任务';
    await this.ctx.render('publish/issueList',{title});
  }
  async issueDetail() {
    const ctx  = this.ctx;
    const title = '发行';
    const issueInfo = {
      serial: ctx.request.query.serial,
      applyDate: time.format(ctx.request.query.applyDate, 'YYYY-MM-DD HH:mm:ss'),
      usageInfo: ctx.request.query.usageInfo,
      count: ctx.request.query.count,
      issCount: ctx.request.query.issCount,
      needcount: ctx.request.query.count - ctx.request.query.issCount,
    };
    await this.ctx.render('publish/issue',{title,issueInfo});
  }
  async receiveList() {
    const ctx  = this.ctx;
    const title = '领用清单';
    await this.ctx.render('publish/receiveList',{title});
  }
  async receiveRecord() {
    const ctx  = this.ctx;
    const title = '领用记录';
    await this.ctx.render('publish/receiveRecord',{title});
  }
  // 物料查询-下拉列表
  async wareSearch() {
    const ctx = this.ctx;
    const data = {

    };
    const result = await ctx.service.issue.wareSearch(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 场景查询下拉
  async queryUsage() {
    const ctx = this.ctx;
    const data = {

    };
    const result = await ctx.service.issue.queryUsage(data);
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

  // 网点查询-下拉列表公司
  async netListCompany() {
    const ctx = this.ctx;
    const data = {
      level: ctx.request.body.level ? ctx.request.body.level : '',
      parentId: ctx.request.body.parentId ? ctx.request.body.parentId : '',
      start: ctx.request.body.page,
      length: ctx.request.body.pageSize,
    };
    const result = await ctx.service.issue.netListTable(data);
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

  // 发行申请
  async psamApply() {
    const ctx = this.ctx;
    const data = {
      appUserId: ctx.session.userInfo.userId ? ctx.session.userInfo.userId : '',
      companyCode: ctx.request.body.companyCode,
      roadCode: ctx.request.body.roadCode,
      stationCode: ctx.request.body.stationCode,
      applyDate: time.format(new Date(), 'YYYYMMDDHHmm'),
      count: ctx.request.body.count,
      usageId: ctx.request.body.usageId,
    };
    // console.log(data);
    const result = await ctx.service.issue.psamApply(data);
    ctx.logger.info(data, result)
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.data.message,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.status + ':' + result.message };
    }
  }
  // 申请记录
  async applyRecord() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      status: ctx.request.query.status ? ctx.request.query.status : '',
      appUserId: ctx.request.query.appUserId ? ctx.request.query.appUserId : '',
      wareId: ctx.request.query.wareId ? ctx.request.query.wareId : '',
      usageId: ctx.request.query.usageId ? ctx.request.query.usageId : '',
      applyBeginTime: ctx.request.query.applyBeginTime ? time.format(ctx.request.query.applyBeginTime, 'YYYYMMDD0000') : '',
      applyEndTime: ctx.request.query.applyEndTime ? time.format(ctx.request.query.applyEndTime, 'YYYYMMDD2359') : '',
      false: ctx.request.query.false ? ctx.request.query.false : '',
    };
    const result = await ctx.service.issue.applyRecord(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 申请记录-全部
  async applyRecordAll() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
    };
    const result = await ctx.service.issue.applyRecordAll(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 审批
  async approveDo() {
    const ctx = this.ctx;
    const data = {
      applyId: ctx.request.body.applyId,
      approvalId: ctx.request.body.approvalId,
      issuerId: ctx.request.body.issuerId ? ctx.request.body.issuerId : '',
      flag: ctx.request.body.flag == '0' ? 'PASS' : 'NOPASS',
      approvalInfo: ctx.request.body.remark,
    };
    console.log(data);
    const result = await ctx.service.issue.approveDo(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.data.message,
      };
    } else {
      console.log(result);
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 只查询发行人
  async queryUserByRoles() {
    const ctx = this.ctx;
    const data = {
      roleList: 'ADMINISTRATOR,ISSUE,ISSUEMANAGER,SYSTEM',
    };
    const result = await ctx.service.issue.queryUserByRoles(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  //  发行人查询
  async queryAllManager() {
    const ctx = this.ctx;
    const data = {

    };
    const result = await ctx.service.issue.queryAllManager(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 发行任务
  async queryIssue() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      issuerId: ctx.session.userInfo.userId,
      appSerial: ctx.request.query.appSerial ? ctx.request.query.appSerial : '',
      appUserId: ctx.request.query.appUserId ? ctx.request.query.appUserId : '',
      status: ctx.request.query.status ? ctx.request.query.status : '',
      wareId: ctx.request.query.wareId ? ctx.request.query.wareId : '',
      usageId: ctx.request.query.usageId ? ctx.request.query.usageId : '',
      applyBeginTime: ctx.request.query.applyBeginTime ? time.format(ctx.request.query.applyBeginTime, 'YYYYMMDD0000') : '',
      applyEndTime: ctx.request.query.applyEndTime ? time.format(ctx.request.query.applyEndTime, 'YYYYMMDD2359') : '',
    };
    const result = await ctx.service.issue.queryIssue(data);
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
  // 根据id查询批次
  async queryIssueById() {
    const ctx = this.ctx;
    const data = {
      appSerial: ctx.request.query.appSerial,
    };
    const result = await ctx.service.issue.queryIssueById(data);
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
  async psamInformDo() {
    const ctx = this.ctx;
    const data = {
      applyId: ctx.request.body.applyId,
      granterId: ctx.request.body.appuserid,
    };
    const result = await ctx.service.issue.psamInformDo(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      console.log(result);
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  async psamconfirmDo() {
    const ctx = this.ctx;
    const data = {
      applyId: ctx.request.body.applyId,
      granterId: ctx.request.body.granterId,
      netNodeId: ctx.request.body.netNodeId,
    };
    const result = await ctx.service.issue.psamconfirmDo(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error('参数' + JSON.stringify(data)));
      ctx.logger.error(new Error('错误信息：' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 挂失
  async psamLost() {
    const ctx = this.ctx;
    const data = {
      operatorId: ctx.session.userInfo.userId,
      samSerialNo: ctx.request.body.samSerialNo,
    };
    const result = await ctx.service.issue.psamLost(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error('参数' + JSON.stringify(data)));
      ctx.logger.error(new Error('错误信息：' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  //  解挂
  async psamUnLost() {
    const ctx = this.ctx;
    const data = {
      operatorId: ctx.session.userInfo.userId,
      samSerialNo: ctx.request.body.samSerialNo,
    };
    const result = await ctx.service.issue.psamUnLost(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error('参数' + JSON.stringify(data)));
      ctx.logger.error(new Error('错误信息：' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 回收
  async psamRecovery() {
    const ctx = this.ctx;
    const data = {
      operatorId: ctx.session.userInfo.userId,
      samSerialNo: ctx.request.body.samSerialNo,
    };
    const result = await ctx.service.issue.psamRecovery(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.message,
      };
    } else {
      ctx.logger.error(new Error('参数' + JSON.stringify(data)));
      ctx.logger.error(new Error('错误信息：' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }


}

module.exports = publish;
