'use strict';

const Controller = require('egg').Controller;

class netnode extends Controller {
  async netManage() {
    const ctx  = this.ctx;
    const title = '物料入库';
    let rootName;
    if (ctx.session.userInfo.provice=='5201'){
      rootName = '省联网中心';
    } else {
      rootName = '高速集团';
    }
    await this.ctx.render('netNode/netNodeManage', { title, rootName });
  }
  // 网点查询
  async netList() {
    const ctx = this.ctx;
    const data = {
      page: ctx.request.body.page,
      pageSize: ctx.request.body.pageSize,
      level: ctx.request.body.level ? ctx.request.body.level:'',
      parentId: ctx.request.body.parentId ? ctx.request.body.parentId:'',
    };
    const result = await ctx.service.issue.netListCompany(data);
    if (result.status == 200) {
      var nodes = [];
      for (let i = 0; i < result.data.length; i++) {
        // let newDate = JSON.stringify(result.data.netNodeArray[i]);
        var nodeData = {
          id: result.data[i].netNodeCode,
          pId: result.data[i].parentId,
          name: result.data[i].nodeName,
        }
        if (result.data[i].netNodeCode == '00000000' ){
          nodeData.open = true;
          if (ctx.session.userInfo.provice=='5201'){
            nodeData.name = '省联网中心';
          } else {
            nodeData.name = '高速集团';
          }
        }
        nodes.push(nodeData);
      }
      ctx.body = {
        result: true,
        data: nodes,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }

  // 表格查询
  async netTable() {
    const ctx = this.ctx;
    switch (ctx.request.query.level) {
      case '0':
        var level = 'NETNODE_LEVEL_1';
        break;
      case '1':
        var level = 'NETNODE_LEVEL_2';
        break;
      case '2':
        var level = 'NETNODE_LEVEL_3';
        break;
      default:
        var level = '';
        break;
    }
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      level: level,
      parentId: ctx.request.query.parentId ? ctx.request.query.parentId:'',
    };
    const result = await ctx.service.issue.netListTable(data);
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
  // 车道
  async queryChanelByManager() {
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      stationCode: ctx.request.query.stationCode ? ctx.request.query.stationCode : '',
    };
    const result = await ctx.service.issue.queryChanelByManager(data);
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
  // 添加公司
  async addCompany() {
    const ctx = this.ctx;
    const data = {
      companyCode: ctx.request.body.companyCode,
      companyName: ctx.request.body.companyName,
      contractPerson: ctx.request.body.linkMan,
      tel: ctx.request.body.tel,
      email: ctx.request.body.email,
      remark: ctx.request.body.remark,
      coordinate: ctx.request.body.getMan,
    };
    const result = await ctx.service.netnode.addCompany(data);
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
  // 添加路段
  async addRoad() {
    const ctx = this.ctx;
    const data = {
      companyCode: ctx.request.body.gpid,
      roadCode: ctx.request.body.companyCode,
      roadName: ctx.request.body.companyName,
      contractPerson: ctx.request.body.linkMan,
      tel: ctx.request.body.tel,
      email: ctx.request.body.email,
      remark: ctx.request.body.remark,
      coordinate: ctx.request.body.getMan,
    };
    const result = await ctx.service.netnode.addRoad(data);
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
  // 添加站点
  async addStation() {
    const ctx = this.ctx;
    const data = {
      companyCode: ctx.request.body.gpid,
      roadCode: ctx.request.body.pid,
      stationCode: ctx.request.body.companyCode,
      stationName: ctx.request.body.companyName,
      contractPerson: ctx.request.body.linkMan,
      tel: ctx.request.body.tel,
      email: ctx.request.body.email,
      remark: ctx.request.body.remark,
      coordinate: ctx.request.body.getMan,
    };
    const result = await ctx.service.netnode.addStation(data);
    // console.log(result);
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
  // 修改网点editNode
  async editNetNode() {
    const ctx = this.ctx;
    const data = {
      parentId: ctx.request.body.pid,
      netNodeCode: ctx.request.body.nodecode,
      netNodeName: ctx.request.body.name,
      contractPerson: ctx.request.body.linkman,
      tel: ctx.request.body.tel,
      email: ctx.request.body.email,
      // remark: ctx.request.body.remark,
      coordinate: ctx.request.body.getman,
    };
    const result = await ctx.service.netnode.editNetNode(data);
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
  // 网点模糊下拉查询
  async netQueryName() {
    const ctx = this.ctx;
    const data = {
      netNodeName: ctx.request.body.search ? ctx.request.body.search : '',
    };
    const result = await ctx.service.netnode.netQueryName(data);
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
  // 消息发布
  async chanelNotice() {
    const ctx = this.ctx;
    const data = {
      level: ctx.request.body.level,
      roadCodeList: ctx.request.body.roadCodeList ? ctx.request.body.roadCodeList : '',
      stationCodeList: ctx.request.body.stationCodeList ? ctx.request.body.stationCodeList : '',
      chanelIdList: ctx.request.body.chanelCodeList ? ctx.request.body.chanelCodeList : '',
      messageType: ctx.request.body.messageType,
      content: ctx.request.body.content,
    };
    console.log(data);
    const result = await ctx.service.netnode.chanelNotice(data);
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

}

module.exports = netnode;
