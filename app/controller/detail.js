'use strict';
const time = require('silly-datetime');
const xlsx = require('node-xlsx');
const Controller = require('egg').Controller;

class detail extends Controller {
  async psamDetailIn() {
    const ctx = this.ctx;
    const title = 'PSAM明细';
    const lever = ctx.session.userInfo.lever;
    const netNodeName = ctx.session.userInfo.netNodeName;
    const netnode = ctx.session.userInfo.netNodeCode;
    let type;
    if (ctx.session.userInfo.roleIds.indexOf('ROLEMANAGER') >= 0) {
      type = 1; // 路公司成员
    } else {
      type = 0; // 路网中心用户
    }
    if (ctx.session.userInfo.roleIds.indexOf('ADMINISTRATOR') >= 0) {
      await this.ctx.render('detail/psamDetail', { title });
    } else {
      await this.ctx.render('detail/psamDetailRoad', { title, type, lever, netNodeName, netnode });
    }
  }
  async chanelDetailIn() {
    const ctx = this.ctx;
    const title = '车道明细';
    let type;
    const lever = ctx.session.userInfo.lever;
    const netnode = ctx.session.userInfo.netNodeCode;
    if (ctx.session.userInfo.roleIds.indexOf('ROLEMANAGER') >= 0) {
      type = 1; // 路公司成员
    } else {
      type = 0; // 路网中心用户
    }
    await this.ctx.render('detail/chanelDetail', { title, type, lever, netnode });
  }
  async psamSignCntIn() {
    const ctx = this.ctx;
    const title = '车道明细';
    let type;
    const lever = ctx.session.userInfo.lever;
    const netnode = ctx.session.userInfo.netNodeCode;
    if (ctx.session.userInfo.roleIds.indexOf('ROLEMANAGER') >= 0) {
      type = 1; // 路公司成员
    } else {
      type = 0; // 路网中心用户
    }
    await this.ctx.render('detail/psamSignCnt', { title, type, lever, netnode });
  }
  async psamSignDetailIn() {
    const ctx = this.ctx;
    const title = 'PSAM签到流水';
    let type;
    if (ctx.session.userInfo.roleIds.indexOf('ROLEMANAGER') >= 0) {
      type = 1; // 路公司成员
    } else {
      type = 0; // 路网中心用户
    }
    const lever = ctx.session.userInfo.lever;
    const netnode = ctx.session.userInfo.netNodeCode;
    await this.ctx.render('detail/psamAuthDetail', { title, netnode, type, lever });
  }
  async chanelInstallIn() {
    const ctx = this.ctx;
    const title = '车道升级安装记录';
    await this.ctx.render('detail/chanelInstalList',{title});
  }
  async chanelGateIn() {
    const ctx = this.ctx;
    const title = '车道门架运行情况';
    let type;
    const lever = ctx.session.userInfo.lever;
    const netnode = ctx.session.userInfo.netNodeCode;
    const netNodeName = ctx.session.userInfo.netNodeName;
    if (ctx.session.userInfo.roleIds.indexOf('ROLEMANAGER') >= 0) {
      type = 1; // 路公司成员
    } else {
      type = 0; // 路网中心用户
    }
    await this.ctx.render('detail/chanelAndGateLine',{ title, type, lever, netnode, netNodeName });
  }
  async gatelineIn() {
    const ctx = this.ctx;
    const title = '门架流水';
    let type;
    const lever = ctx.session.userInfo.lever;
    const netnode = ctx.session.userInfo.netNodeCode;
    const netNodeName = ctx.session.userInfo.netNodeName;
    if (ctx.session.userInfo.roleIds.indexOf('ROLEMANAGER') >= 0) {
      type = 1; // 路公司成员
    } else {
      type = 0; // 路网中心用户
    }
    await this.ctx.render('detail/gateLine',{ title, type, lever, netnode, netNodeName });
  }
  async installDoneIn() {
    const ctx = this.ctx;
    const title = '工程完成情况报表';
    await this.ctx.render('detail/installDoneList',{title});
  }
  async sqqzInstallIn() {
    const ctx = this.ctx;
    const title = '授权前置安装记录';
    await this.ctx.render('detail/sqqzInstalList',{title});
  }
  async psamMoveIn() {
    const ctx = this.ctx;
    const title = 'PSAM转移列表';
    let type;
    const lever = ctx.session.userInfo.lever;
    const netnode = ctx.session.userInfo.netNodeCode;
    if (ctx.session.userInfo.roleIds.indexOf('ROLEMANAGER') >= 0) {
      type = 1; // 路公司成员
      await this.ctx.render('detail/psamMoveList', { title, netnode, type, lever });
    } else {
      type = 0; // 路网中心用户
      await this.ctx.render('detail/psamMoveListCenter', { title, netnode, type, lever });
    }
  }
  async sqzdIn() {
    const ctx = this.ctx;
    const title = '授权终端流水';
    const lever = ctx.session.userInfo.lever;
    const netnode = ctx.session.userInfo.netNodeCode;
    await this.ctx.render('detail/authorizationDetail', { title, lever, netnode });
  }
  async psamStockIn() {
    const ctx = this.ctx;
    const title = 'PSAM库存统计';
    await this.ctx.render('detail/psamStock',{title});
  }
  async psamApplyIn() {
    const ctx = this.ctx;
    const title = 'PSAM应用信息';
    await this.ctx.render('detail/psamApplyMonitor',{title});
  }
  async queryPsamCard() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      samSerialNo: ctx.request.query.samSerialNo ? ctx.request.query.samSerialNo : '',
      samTerminalNo: ctx.request.query.samTerminalNo ? ctx.request.query.samTerminalNo : '',
      wareId: ctx.request.query.wareId ? ctx.request.query.wareId : '',
      status: ctx.request.query.status ? ctx.request.query.status : '',
      subStatus: ctx.request.query.subStatus ? ctx.request.query.subStatus : '',
      importBatch: ctx.request.query.importBatch ? ctx.request.query.importBatch : '',
      issueBatch: ctx.request.query.issueBatch ? ctx.request.query.issueBatch : '',
      currRoadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      currStationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      currChanelCode: ctx.request.query.bindChanelCode ? ctx.request.query.bindChanelCode : '',
      // respoPerson: respoPerson,
      respoCompany: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
    };
    switch (ctx.session.userInfo.lever) {
      case 1:
        data.respoCompany = ctx.session.userInfo.netNodeCode;
        break;
      case 2:
        data.respoCompany = '';
        data.currRoadCode = ctx.session.userInfo.netNodeCode;
        break;
      case 3:
        data.respoCompany = '';
        data.currRoadCode = '';
        data.currStationCode = ctx.session.userInfo.netNodeCode;
        break;
      default:
        break;
    }
    console.log(data);
    const result = await ctx.service.detail.queryPsamCard(data);
    // console.log(result);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  async queryResponsChangeIn() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      samSerialNo: ctx.request.query.samSerialNo ? ctx.request.query.samSerialNo : '',
      id: ctx.request.query.id ? ctx.request.query.id : '',
      applyNetNodeCode: ctx.request.query.applyNetNodeCode ? ctx.request.query.applyNetNodeCode : '',
      recvNetNodeCode: ctx.session.userInfo.netNodeCode,
      status: ctx.request.query.status ? ctx.request.query.status : '',
    };
    const result = await ctx.service.detail.queryResponsChange(data);
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
  async queryResponsChangeOut() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      samSerialNo: ctx.request.query.samSerialNo ? ctx.request.query.samSerialNo : '',
      id: ctx.request.query.id ? ctx.request.query.id : '',
      applyNetNodeCode: ctx.session.userInfo.netNodeCode,
      recvNetNodeCode: ctx.request.query.recvNetNodeCode ? ctx.request.query.recvNetNodeCode : '',
      status: ctx.request.query.status ? ctx.request.query.status : '',
    };
    const result = await ctx.service.detail.queryResponsChange(data);
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
  async queryResponsChange() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      samSerialNo: ctx.request.query.samSerialNo ? ctx.request.query.samSerialNo : '',
      id: ctx.request.query.id ? ctx.request.query.id : '',
      applyNetNodeCode: ctx.request.query.applyNetNodeCode ? ctx.request.query.applyNetNodeCode : '',
      recvNetNodeCode: ctx.request.query.recvNetNodeCode ? ctx.request.query.recvNetNodeCode : '',
      status: ctx.request.query.status ? ctx.request.query.status : '',
    };
    console.log(data);
    const result = await ctx.service.detail.queryResponsChange(data);
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
  async queryAuthLine() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      chanelId: ctx.request.query.chanelId ? ctx.request.query.chanelId : '',
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      queryMonth: ctx.request.query.queryMonth ? ctx.request.query.queryMonth : '',
      result: ctx.request.query.result ? ctx.request.query.result : '',
    };
    switch (ctx.session.userInfo.lever) {
      case 1:
        data.companyCode = ctx.session.userInfo.netNodeCode;
        break;
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
    const result = await ctx.service.detail.queryAuthLine(data);
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
  async querySignline() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      chanelId: ctx.request.query.chanelId ? ctx.request.query.chanelId : '',
      samSerialNo: ctx.request.query.samSerialNo ? ctx.request.query.samSerialNo : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      startDateTime: ctx.request.query.startDateTime ? ctx.request.query.startDateTime : '',
      endDateTime: ctx.request.query.endDateTime ? ctx.request.query.endDateTime : '',
      result: ctx.request.query.result ? ctx.request.query.result : '',
    };
    switch (ctx.session.userInfo.lever) {
      case 1:
        data.companyCode = ctx.session.userInfo.netNodeCode;
        break;
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
    const result = await ctx.service.detail.querySignline(data);
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
  async queryChanelSetUp() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      chanelId: ctx.request.query.chanelId ? ctx.request.query.chanelId : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      queryMonth: ctx.request.query.queryMonth ? ctx.request.query.queryMonth : '',
    };
    const result = await ctx.service.detail.queryChanelSetUp(data);
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
  async queryFrontSetUp() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      queryMonth: ctx.request.query.queryMonth ? ctx.request.query.queryMonth : '',
    };
    const result = await ctx.service.detail.queryFrontSetUp(data);
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
  async queryAuthFrontInfo() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      queryMonth: ctx.request.query.queryMonth ? ctx.request.query.queryMonth : '',
    };
    const result = await ctx.service.detail.queryAuthFrontInfo(data);
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
  async countPsamStockInfo() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      level: ctx.request.query.level ? ctx.request.query.level : '',
    };
    console.log(data);
    const result = await ctx.service.detail.countPsamStockInfo(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.status + ':' + result.message };
    }
  }
  async queryProjectInfo() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      queryMonth: ctx.request.query.queryMonth ? ctx.request.query.queryMonth : '',
    };
    const result = await ctx.service.detail.queryProjectInfo(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  async queryAuthModelLine() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      authModelid: ctx.request.query.authModelid ? ctx.request.query.authModelid : '',
      chanelId: ctx.request.query.chanelId ? ctx.request.query.chanelId : '',
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      queryMonth: ctx.request.query.queryMonth ? ctx.request.query.queryMonth : '',
    };
    switch (ctx.session.userInfo.lever) {
      case 1:
        data.companyCode = ctx.session.userInfo.netNodeCode;
        break;
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
    const result = await ctx.service.detail.queryAuthModelLine(data);
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
  // 导出psam签到流水
  async getSignlineRecord() {
    const ctx = this.ctx;
    const data = {
      start: 0,
      length: 9999999,
      chanelId: ctx.request.query.chanelId ? ctx.request.query.chanelId : '',
      samSerialNo: ctx.request.query.samSerialNo ? ctx.request.query.samSerialNo : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      startDateTime: ctx.request.query.startDateTime ? ctx.request.query.startDateTime : '',
      endDateTime: ctx.request.query.endDateTime ? ctx.request.query.endDateTime : '',
      result: ctx.request.query.result ? ctx.request.query.result : '',
      // uwId: ctx.request.body.uwid
    };
    const result = await ctx.service.detail.querySignline(data);
    if (result.status == 200) {
      const excelData = [];
      const clmHeader = [ '流水号', 'PSAM卡号', '公司', '路段', '路段代码', '收费站', '收费站代码', '车道ID', '授权终端', 'ITSC流水号', '终端流水号', '签到结果', '签到时间' ];
      excelData.push(clmHeader);

      result.data.data.forEach(function(element) {
        var timehand;
        if (element.applyTime !== '') {
          timehand = element.applyTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3 $4:$5:$6');
        } else {
          timehand = '';
        }
        var resultE;
        if (element.result == '0000') {
          resultE = '签到成功';
        } else {
          resultE = '签到失败';
        }
        const tmp = [ element.id, element.samSerialNo, element.companyName, element.roadName, element.roadCode, element.stationName, element.stationCode, element.chanelId, element.terminalId, element.itscTrace, element.applyTrace, resultE, timehand ];
        excelData.push(tmp);
      });

      const data = [{
        name: '订单记录',
        data: excelData,
      }];

      this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      this.ctx.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent('PSAM签到流水') + (new Date()).getTime() + '.xlsx');
      const buffer = xlsx.build(data);
      this.ctx.body = buffer;

    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 导出工程完成情况报表
  async downProjectList() {
    const ctx = this.ctx;
    const data = {
      start: 0,
      length: 9999999,
      roadCode: ctx.request.query.roadCode,
      stationCode: ctx.request.query.stationCode,
      queryMonth: ctx.request.query.queryMonth,
    };
    const result = await ctx.service.detail.queryProjectInfo(data);
    if (result.status == 200) {
      const excelData = [];
      const clmHeader = [ '编号', '路段', '路段代码', '收费站', '收费站代码', 'PSAM心跳次数', 'PSAM授权申请次数', 'PSAM授权确认次数', 'PSAM签到次数', '门架授权次数', '门架签到次数', '营改增代码' ];
      excelData.push(clmHeader);

      result.data.data.forEach(function(element) {
        const tmp = [ element.textid, element.roadName, element.roadCode, element.stationName, element.stationCode, element.hbeat, element.appcnt, element.cfmcnt, element.signcnt, element.authcount, element.signcount, element.taxcode ];
        excelData.push(tmp);
      });

      const data = [{
        name: '工程完成情况明细',
        data: excelData,
      }];

      this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      this.ctx.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent('工程完成情况明细') + (new Date()).getTime() + '.xlsx');
      const buffer = xlsx.build(data);
      this.ctx.body = buffer;

    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 导出前置安装部署情况
  async downAuthFrontInfo() {
    const ctx = this.ctx;
    const data = {
      start: 0,
      length: 9999999,
      roadCode: ctx.request.query.roadCode,
      stationCode: ctx.request.query.stationCode,
    };
    const result = await ctx.service.detail.queryAuthFrontInfo(data);
    if (result.status == 200) {
      const excelData = [];
      const clmHeader = [ '公司', '路段', '路段代码', '收费站', '收费站代码', '安装状态', '代理状态', '最近签到时间' ];
      excelData.push(clmHeader);

      result.data.data.forEach(function(element) {
        var status;
        if (element.status=='GOOD') {
          status = '已安装';
        }else {
          status = '未安装';
        }
        var timeout;
        switch (element.timeout) {
          case '1':
            timeout = '超时';
            break;
          case '0':
            timeout = '正常';
            break;
          default:
            timeout = '连接异常';
            break;
        }
        var timehand;
        if (element.trace !== '') {
          timehand = element.trace.substring(0, 14).replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3 $4:$5:$6');
        } else {
          timehand = '';
        }
        const tmp = [ element.companyName, element.roadName, element.roadCode, element.stationName, element.stationCode, status, timeout, timehand ];
        excelData.push(tmp);
      });

      const data = [{
        name: '前置代理安装部署情况',
        data: excelData,
      }];

      this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      this.ctx.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent('前置代理安装部署情况') + (new Date()).getTime() + '.xlsx');
      const buffer = xlsx.build(data);
      this.ctx.body = buffer;

    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 导出车道授权流水
  async getAuthLineRecord() {
    const ctx = this.ctx;
    const data = {
      start: 0,
      length: 9999999,
      chanelId: ctx.request.query.chanelId ? ctx.request.query.chanelId : '',
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      queryMonth: ctx.request.query.queryMonth ? ctx.request.query.queryMonth : '',
      result: ctx.request.query.result ? ctx.request.query.result : '',
      // uwId: ctx.request.body.uwid
    };
    const result = await ctx.service.detail.queryAuthLine(data);
    if (result.status == 200) {
      const excelData = [];
      const clmHeader = [ '流水号', '公司', '路段', '路段代码', '收费站', '收费站代码', '车道ID','PSAM', '申请终端', 'ITSC结果代码', '授权申请结果', '授权结果', '授权APDU结果', '请求时间', '响应时间' ];
      excelData.push(clmHeader);

      result.data.data.forEach(function(element) {
        var applyTime;
        if (element.applyTime !== '') {
          applyTime = element.applyTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3 $4:$5:$6');
        } else {
          applyTime = '';
        }
        var confirmTime;
        if (element.applyTime !== '') {
          confirmTime = element.confirmTime.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1-$2-$3 $4:$5:$6');
        } else {
          confirmTime = '';
        }
        var applyResult;
        if (element.applyResult == '0000') {
          applyResult = '请求成功';
        } else {
          applyResult = '请求失败';
        }
        var authResult;
        if (element.authResult == '00') {
          authResult = '授权成功';
        } else {
          authResult = '授权失败';
        }
        var authSW;
        if (element.authSW == '9000') {
          authSW = '授权成功';
        } else {
          authSW = '授权失败';
        }
        const tmp = [ element.id, element.companyName, element.roadName, element.roadCode, element.stationName, element.stationCode, element.chanelId,element.samSeriaNo, element.applyTerminal, element.applyItscTrace, applyResult,authResult, authSW, applyTime, confirmTime  ];
        excelData.push(tmp);
      });

      const data = [{
        name: '车道授权流水',
        data: excelData,
      }];

      this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      this.ctx.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent('车道授权流水') + (new Date()).getTime() + '.xlsx');
      const buffer = xlsx.build(data);
      this.ctx.body = buffer;

    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 导出车道安装情况
  async downChanelSetUp() {
    const ctx = this.ctx;
    const data = {
      start: 0,
      length: 9999999,
      chanelId: ctx.request.query.chanelId ? ctx.request.query.chanelId : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      queryMonth: ctx.request.query.queryMonth ? ctx.request.query.queryMonth : '',
      // uwId: ctx.request.body.uwid
    };
    const result = await ctx.service.detail.queryChanelSetUp(data);
    if (result.status == 200) {
      const excelData = [];
      const clmHeader = [ '公司', '路段', '路段代码', '收费站', '收费站代码', '车道ID', '车道IP', '心跳', '车道状态', '应用状态' ];
      excelData.push(clmHeader);

      result.data.data.forEach(function(element) {
        let statusCn;
        switch (element.status) {
          case 'NEW':
            statusCn = '新建';
            break;
          case 'RUN':
            statusCn = '应用中';
            break;
          case 'STOP':
            statusCn = '停用';
            break;
          default:
            statusCn = '状态未知，请联系管理员';
            break;
        }
        let substatusCn;
        switch (element.substatus) {
          case 'NORMAL':
            substatusCn = '正常';
            break;
          case 'STOPPED':
            substatusCn = '停用';
            break;
          case 'SLEEP':
            substatusCn = '休眠';
            break;
          case 'ERRSAM':
            substatusCn = 'psam异常';
            break;
          case 'ERRBIND':
            substatusCn = '绑定异常';
            break;
          case 'ERRMAC':
            substatusCn = 'MAC错误';
            break;
          default:
            substatusCn = '状态未知，请联系管理员';
            break;
        }
        const tmp = [ element.companyName, element.roadName, element.roadCode, element.stationName, element.stationCode, element.chanelId, element.chanelIp, element.trace, statusCn, substatusCn ];
        excelData.push(tmp);
      });

      const data = [{
        name: '车道安装情况',
        data: excelData,
      }];

      this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      this.ctx.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent('车道安装情况') + (new Date()).getTime() + '.xlsx');
      const buffer = xlsx.build(data);
      this.ctx.body = buffer;

    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 导出网点库存信息
  async downPsamStockInfo() {
    const ctx = this.ctx;
    const data = {
      start: 0,
      length: 99999,
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      level: ctx.request.query.level ? ctx.request.query.level : '',
      // uwId: ctx.request.body.uwid
    };
    const result = await ctx.service.detail.countPsamStockInfo(data);
    if (result.status == 200) {
      const excelData = [];
      const clmHeader = [ '公司', '路段', '收费站', 'PSAM总量（张）', '使用中（张）', '未使用（张）', '停用（张）', '未活动（张' ];
      excelData.push(clmHeader);

      result.data.data.forEach(function(element) {
        let road,
          station;
        if (element.roadName == '') {
          road = '--';
        } else {
          road = element.roadName;
        }
        if (element.stationName == '') {
          station = '--';
        } else {
          station = element.stationName;
        }
        const tmp = [ element.companyName, road, station, element.total, element.inUseCount, element.noUseCount, element.stopCount, element.noActive ];
        excelData.push(tmp);
      });

      const data = [{
        name: '网点库存情况',
        data: excelData,
      }];

      this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      this.ctx.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent('网点库存情况') + (new Date()).getTime() + '.xlsx');
      const buffer = xlsx.build(data);
      this.ctx.body = buffer;

    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // psam转移
  async responsChangeApply() {
    const ctx = this.ctx;
    const data = {
      applyUserId: ctx.session.userInfo.userId,
      applyNetNodeCode: ctx.session.userInfo.netNodeCode,
      recvNetNodeCode: ctx.request.body.recvNetNodeCode,
      samSerialNoList: ctx.request.body.samSerialNoList,
    };
    // console.log(data);
    const result = await ctx.service.detail.responsChangeApply(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        msg: result.data.message,
      };
    } else {
      ctx.logger.error(new Error('参数' + JSON.stringify(data)));
      ctx.logger.error(new Error('错误信息：' + result.status + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // psam转移确认
  async cfmResponsChange() {
    const ctx = this.ctx;
    const data = {
      recvUserId: ctx.session.userInfo.userId,
      id: ctx.request.body.id,
    };
    console.log(data);
    const result = await ctx.service.detail.cfmResponsChange(data);
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
  // 车道24小时运行情况
  async queryChanel24hInfo() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      limit: ctx.request.query.length,
      isTodayData: ctx.request.query.isTodayData ? ctx.request.query.isTodayData : '',
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      status: ctx.request.query.status ? ctx.request.query.status : '',
    };
    switch (ctx.session.userInfo.lever) {
      case 1:
        data.companyCode = ctx.session.userInfo.netNodeCode;
        break;
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
    const result = await ctx.service.detail.queryChanel24hInfo(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.status + ':' + result.message };
    }
  }
  // 门架24小时运行情况
  async queryGate24hInfo() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      limit: ctx.request.query.length,
      isTodayData: ctx.request.query.isTodayData ? ctx.request.query.isTodayData : '',
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      status: ctx.request.query.status ? ctx.request.query.status : '',
    };
    switch (ctx.session.userInfo.lever) {
      case 1:
        data.companyCode = ctx.session.userInfo.netNodeCode;
        break;
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
    const result = await ctx.service.detail.queryGate24hInfo(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.status + ':' + result.message };
    }
  }
  // 门架流水及分布情况
  async queryGateline2() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      gateLane: ctx.request.query.gateLane ? ctx.request.query.gateLane : '',
      target: ctx.request.query.target ? ctx.request.query.target : '',
      queryMonth: ctx.request.query.queryMonth ? ctx.request.query.queryMonth : '',
    };
    // console.log(data);
    const result = await ctx.service.detail.queryGateline2(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.status + ':' + result.message };
    }
  }
  // 导出门架流水情况
  async downGateline2() {
    const ctx = this.ctx;
    const data = {
      start: 0,
      length: 9999999,
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      gateLane: ctx.request.query.gateLane ? ctx.request.query.gateLane : '',
      target: ctx.request.query.target ? ctx.request.query.target : '',
      queryMonth: ctx.request.query.queryMonth ? ctx.request.query.queryMonth : '',
      // uwId: ctx.request.body.uwid
    };
    const result = await ctx.service.detail.queryGateline2(data);
    if (result.status == 200) {
      const excelData = [];
      const clmHeader = [ '公司', '公司代码', '路段', '路段代码', '收费站', '收费站代码', '门架', '门架编号', '营改增代码', 'PSAM', '授权来源', '交易类型', '交易时间'];
      excelData.push(clmHeader);

      result.data.data.forEach(function(element) {
        let Gatetarget;
        switch (element.target) {
          case 'ITSCP':
            Gatetarget = '交通部授权';
            break;
          case 'AUTHM':
            Gatetarget = '本地授权';
            break;
          default:
            Gatetarget = '异常来源' + element.target;
            break;
        }
        let transType;
        switch (element.transType) {
          case 'SIGN':
            transType = '签到';
            break;
          case 'AUTHAPP':
            transType = '授权申请';
            break;
          case 'AUTHCFM':
            transType = '授权确认';
            break;
          default:
            transType = '异常类型' + element.transType;
            break;
        }
        const tmp = [ element.companyName, element.companyCode, element.roadName, element.roadCode, element.stationName, element.stationCode, element.gateName, element.gateLane, element.taxCode, element.samSerialNo, Gatetarget, transType, element.terminalTime ];
        excelData.push(tmp);
      });

      const data = [{
        name: '门架流水',
        data: excelData,
      }];

      this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      this.ctx.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent('门架流水') + (new Date()).getTime() + '.xlsx');
      const buffer = xlsx.build(data);
      this.ctx.body = buffer;

    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 车道psam签到授权统计
  async queryMaxIpPsamCardChnl() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      limit: ctx.request.query.length,
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      samSerialNo: ctx.request.query.samSerialNo ? ctx.request.query.samSerialNo : '',
      dateTime: ctx.request.query.dateTime ? ctx.request.query.dateTime : '',
      startDateTime: ctx.request.query.dateStart ? ctx.request.query.dateStart : '',
      endDateTime: ctx.request.query.dateEnd ? ctx.request.query.dateEnd : '',
    };
    // console.log(data);
    const result = await ctx.service.detail.queryMaxIpPsamCardChnl(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.status + ':' + result.message };
    }
  }
  // 门架psam签到授权统计
  async queryMaxIpPsamCardGate() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      limit: ctx.request.query.length,
      companyCode: ctx.request.query.companyCode ? ctx.request.query.companyCode : '',
      roadCode: ctx.request.query.roadCode ? ctx.request.query.roadCode : '',
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
      samSerialNo: ctx.request.query.samSerialNo ? ctx.request.query.samSerialNo : '',
      dateTime: ctx.request.query.dateTime ? ctx.request.query.dateTime : '',
      startDateTime: ctx.request.query.dateStart ? ctx.request.query.dateStart : '',
      endDateTime: ctx.request.query.dateEnd ? ctx.request.query.dateEnd : '',
    };
    // console.log(data);
    const result = await ctx.service.detail.queryMaxIpPsamCardGate(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.status + ':' + result.message };
    }
  }
  // psam应用监控查询
  async psamAppMonitor4Excel() {
    const ctx = this.ctx;
    const data = {};
    const result = await ctx.service.detail.psamAppMonitor4Excel(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
      };
    } else {
      ctx.logger.error(new Error('错误信息：' + result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 下载路公司应用情况
  async downloadAppMonitor4Excel() {
    const ctx = this.ctx;
    const data = {};
    const result = await ctx.service.detail.psamAppMonitor4Excel(data);
    if (result.status == 200) {
      const excelData = [];
      const clmHeader = [ '公司', 'PSAM总量', '使用量', '使用率', '正常使用率', '锁定', '今日签到量', '签到比例', '今日授权量', '授权比例'];
      excelData.push(clmHeader);
      if (result.data.data.summary) {
        const element = result.data.data.summary;
        const tmp = [ element.respoCompany, element.psamAppTotal, element.inUsedCnt, element.useRate, element.normalUseRate, element.lockCnt, element.todaySignTotal, element.signRate, element.todayAuthTotal, element.authRate];
        excelData.push(tmp);
      }
      result.data.data.content.forEach(function(element) {
        const tmp = [ element.respoCompany, element.psamAppTotal, element.inUsedCnt, element.useRate, element.normalUseRate, element.lockCnt, element.todaySignTotal, element.signRate, element.todayAuthTotal, element.authRate];
        excelData.push(tmp);
      });

      const data = [{
        name: '路公司应用情况表',
        data: excelData,
      }];

      this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      this.ctx.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent('路公司应用情况表') + (new Date()).getTime() + '.xlsx');
      const buffer = xlsx.build(data);
      this.ctx.body = buffer;

    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }
  // 下载Psam应用情况
  async downloadAppMonitorDtl4Excel() {
    const ctx = this.ctx;
    const data = {};
    const result = await ctx.service.detail.psamApplicationDtlFile(data);
    if (result) {
      // this.ctx.set('Content-Type', 'application/json');
      this.ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      this.ctx.set('Content-Disposition', 'attachment; filename=' + encodeURIComponent('PSAM应用明细表') + '.xlsx');
      this.ctx.body = result;
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: '服务器异常' };
    }
  }

}

module.exports = detail;
