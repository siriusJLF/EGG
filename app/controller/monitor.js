'use strict';
const time = require('silly-datetime');
const Controller = require('egg').Controller;

class monitor extends Controller {
  async monitorIn() {
    const ctx  = this.ctx;
    const title = '监控';
    const provice = ctx.session.userInfo.provice;
    const result = await ctx.service.monitor.queryTotal();
    // eslint-disable-next-line eqeqeq
    if (result.status == 200) {
      // console.log(result);
      const total = result.data;
      if (provice == '5201') {
        const pagetitle = '贵州PSAM监控';
        const mapArea = '贵州';
        await this.ctx.render('monitor/monitorBIGG', { title, total, pagetitle, mapArea });
      } else {
        const pagetitle = '重庆PSAM监控';
        const mapArea = '重庆';
        await this.ctx.render('monitor/monitorBIG', { title, total, pagetitle, mapArea });
      }
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.status + ':' + result.message };
    }

  }
  async monitorInG() {
    const ctx  = this.ctx;
    const title = '监控';
    await this.ctx.render('monitor/monitorBIGG', { title });
  }
  async monitorOptIn() {
    const ctx  = this.ctx;
    const provice = ctx.session.userInfo.provice;
    let title;
    switch (provice) {
      case '5201':
        title = '贵州PSAM运营监控';
        break;
      case '50':
        title = '重庆PSAM运营监控';
        break;
      default:
        title = 'PSAM运营监控';
        break;
    }
    await this.ctx.render('monitor/monitorOperator', { title });
  }
  // 库存前十
  async queryStockIndex() {
    const ctx = this.ctx;
    const data = {};
    const result = await ctx.service.monitor.queryStockIndex(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 省部比例
  async queryPropo() {
    const ctx = this.ctx;
    const data = {
      endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.queryPropo(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 脱机在线比列
  async queryOfflineAuthorizeCount() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.queryOfflineAuthorizeCount(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 高脱机率
  async queryOfflineRateWarnning() {
    const ctx = this.ctx;
    const data = {};
    const result = await ctx.service.monitor.queryOfflineRateWarnning(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 签到交易10条
  async queryMonitorSignline() {
    const ctx = this.ctx;
    const data = {};
    const result = await ctx.service.monitor.querySignline(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 门架交易10条
  async queryMonitorGateline() {
    const ctx = this.ctx;
    const data = {};
    const result = await ctx.service.monitor.queryGateline(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 授权交易10条
  async queryAuthFrontTrace() {
    const ctx = this.ctx;
    const data = {};
    const result = await ctx.service.monitor.queryAuthFrontTrace(data);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
        recordsTotal: result.data.recordsTotal,
        recordsFiltered: result.data.recordsFiletered,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 门架交易量
  async queryGantryTradingVolume() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
      date: time.format(new Date(), 'YYYYMMDD'),
    };
    const result = await ctx.service.monitor.queryGantryTradingVolume(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 授权交易量
  async queryAuthorizeTradingVolume() {
    const ctx = this.ctx;
    const data = {
      date: time.format(new Date(), 'YYYYMMDD'),
      // endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.queryAuthorizeTradingVolume(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 签到交易量
  async querySignTradingVolume() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
      date: time.format(new Date(), 'YYYYMMDD'),
    };
    const result = await ctx.service.monitor.querySignTradingVolume(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 服务器资源
  async getCpu() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.getCpu(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 车道统计
  async queryChanelStatusCount() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.queryChanelStatusCount(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 门架统计
  async queryGantryCount() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.queryGantryCount(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 离线终端统计
  async queryOfflineTraceCount() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.queryOfflineTraceCount(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 站点统计
  async queryStationStatusRepo() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.queryStationStatusRepo(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // psam统计
  async queryPsamCount() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.queryPsamCount(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 站点地图
  async queryPsamStatusStationCount() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.queryPsamStatusStationCount(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 异常车道信息
  async queryNewestTenErrChanel() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
    };
    const result = await ctx.service.monitor.queryNewestTenErrChanel(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // psam统计列表
  async queryPsamCountDetail() {
    const ctx = this.ctx;
    const data = {
      status: ctx.request.query.status ? ctx.request.query.status : '',
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      limit: ctx.request.query.length,
    };
    // console.log(data);
    const result = await ctx.service.monitor.queryPsamCountDetail(data);
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
  // 站点详细信息
  async getStationDetailMsg() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
      stationName: ctx.request.query.stationName ? ctx.request.query.stationName : '',
    };
    const result = await ctx.service.monitor.getStationDetailMsg(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // PSAM发行统计
  async queryPsamIssuedOrNotCount() {
    const ctx = this.ctx;
    const data = {
      // endTime: time.format(new Date(), 'YYYYMMDD')
      // stationName: ctx.request.query.stationName ? ctx.request.query.stationName : '',
    };
    const result = await ctx.service.monitor.queryPsamIssuedOrNotCount(data);
    if (result.status == 200) {
      ctx.body = {
        data: result.data.data,
        result: true,
      };
    } else {
      ctx.logger.error(new Error(result.status + ':' + result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // PSAM发行明细
  async queryPsamIssueOrNotCountDetail() {
    const ctx = this.ctx;
    const data = {
      status: ctx.request.query.status ? ctx.request.query.status : '',
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      limit: ctx.request.query.length,
    };
    // console.log(data);
    const result = await ctx.service.monitor.queryPsamIssueOrNotCountDetail(data);
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


}

module.exports = monitor;
