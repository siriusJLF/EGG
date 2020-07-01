'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

class sign extends Controller {
  async loginAPI() {
    const ctx = this.ctx;
    const data = {
      username: 'admin',
      password: 'vfj@2020',
    }
    const result = await ctx.service.login.loginAPI(data);
    console.log(result);
    // if (result.status == 200) {
    //   console.log(result);
    // } else {
    //   ctx.logger.error(new Error(result.status + result.message));
    // }

  }
  async doLogin() {
    // this.loginAPI();
    const ctx = this.ctx;
    const data = {
      userId: ctx.request.body.name,
      password: crypto.createHash('md5').update(ctx.request.body.password).digest('hex'),
      token: ctx.request.body._csrf,
    }
    ctx.session.lgoinid = data.userId;
    ctx.session.pwd = ctx.request.body.password;
    // 调用 rotateCsrfSecret 刷新用户的 CSRF token
    ctx.rotateCsrfSecret();
    const result = await ctx.service.login.loginIpt(data);
    if (result.status == 200) {
      ctx.session.lgoinid = null;
      ctx.session.pwd = null;
      ctx.session.username = result.data.userName
      ctx.session.userInfo = result.data;
      // ctx.session.userInfo.lever -1:根网点；1：公司 2：路段；3：站
      console.log(ctx.session.userInfo)
      await this.ctx.response.redirect('/index/issue.html');
    } else {
      ctx.logger.error(new Error(result.status + result.message));
      if (result.status == 302) {
        ctx.session.errMsg = result.message;
      } else if (result.status == 402) {
        ctx.session.errMsg = result.message;
      } else {
        ctx.session.errMsg = '后台出错啦，请联系管理员';
      }
      await this.ctx.response.redirect('/login');
    }

  }
  async loginOut() {
    // eslint-disable-next-line no-unused-vars
    const ctx = this.ctx;
    ctx.session = null;
    await this.ctx.response.redirect('/login');

  }
  async sysUserAddIn() {
    // eslint-disable-next-line no-unused-vars
    const ctx = this.ctx;
    const title = '添加用户';
    await this.ctx.render('sign/userAdd', { title });

  }
  async sysUserManageIn() {
    // eslint-disable-next-line no-unused-vars
    const ctx = this.ctx;
    const title = '用户管理';
    await this.ctx.render('sign/userManage', { title });

  }
  async sysUserEditPswIn() {
    // eslint-disable-next-line no-unused-vars
    const ctx = this.ctx;
    const title = '修改密码';
    const userMsg = ctx.session.userInfo.userId;
    await this.ctx.render('sign/userEditPsw', { title, userMsg });

  }
  async sysUserRoleIn() {
    // eslint-disable-next-line no-unused-vars
    const ctx = this.ctx;
    const title = '角色管理';
    await this.ctx.render('sign/roleManage', { title });

  }
  async sysUserEditIn() {
    // eslint-disable-next-line no-unused-vars
    const ctx = this.ctx;
    const title = '信息修改';
    const data = {
      userId: ctx.session.userInfo.userId,
    };
    const result = await ctx.service.login.sysUserQuery(data);
    // console.log(result);
    if (result.status == 200) {
      await this.ctx.render('sign/userEdit', { title ,userMsg: result.data.data[0] });
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: '后台报错', errMsg: result.message };
    }

  }
  // 查询用户
  async sysUserQuery() {
    // eslint-disable-next-line no-unused-vars
    const ctx = this.ctx;
    // eslint-disable-next-line no-var
    var netNodeCode;
    if (ctx.request.query.netNodeCode == null || ctx.request.query.netNodeCode == '' || ctx.request.query.netNodeCode == 'null' ){
      netNodeCode = '';
    } else {
      netNodeCode = ctx.request.query.netNodeCode;
    }
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
      userName: ctx.request.query.userName ? ctx.request.query.userName : '',
      netNodeCode,
    };
    const result = await ctx.service.login.sysUserQuery(data);
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
  // 添加用户
  async sysUserAdd() {
    const ctx = this.ctx;
    const data = {
      userId: ctx.request.body.userId,
      userName: ctx.request.body.userName,
      netNodeCode: ctx.request.body.netNodeCode,
      roleIds: ctx.request.body.roleIds,
      phoneCall: ctx.request.body.phoneCall,
      email: ctx.request.body.email,
      // factoryType: ctx.request.body.factoryType,
    };
    const result = await ctx.service.login.sysUserAdd(data);
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
  // 修改用户
  async sysUserUpdate() {
    const ctx = this.ctx;
    const data = {
      userId: ctx.request.body.userId,
      userName: ctx.request.body.userName,
      netNodeCode: ctx.request.body.netNodeCode,
      roleIds: ctx.request.body.roleIds,
      phoneCall: ctx.request.body.phoneCall,
      email: ctx.request.body.email,
      // factoryType: ctx.request.body.factoryType,
    };
    const result = await ctx.service.login.sysUserUpdate(data);
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
  // 密码修改
  async sysUserPswUpdate() {
    const ctx = this.ctx;
    const data = {
      userId: ctx.session.userInfo.userId,
      oldPassword: crypto.createHash('md5').update(ctx.request.body.oldPassword).digest('hex'),
      newPassword: crypto.createHash('md5').update(ctx.request.body.newPassword).digest('hex'),
    };
    const result = await ctx.service.login.sysUserPswUpdate(data);
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
  // 添加角色
  async sysRoleAdd() {
    const ctx = this.ctx;
    const data = {
      roleId: ctx.request.body.roleId,
      roleName: ctx.request.body.roleName,
      remark: ctx.request.body.remark,
    };
    const result = await ctx.service.login.sysRoleAdd(data);
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
  // 修改角色
  async sysRoleUpdate() {
    const ctx = this.ctx;
    const data = {
      roleId: ctx.request.body.roleId,
      roleName: ctx.request.body.roleName,
      remark: ctx.request.body.remark,
    };
    const result = await ctx.service.login.sysRoleUpdate(data);
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
  // 查询角色
  async sysRoleQuery() {
    // eslint-disable-next-line no-unused-vars
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
    };
    const result = await ctx.service.login.sysRoleQuery(data);
    // console.log(result);
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
  // 下拉查询角色
  async queryRole() {
    // eslint-disable-next-line no-unused-vars
    const ctx = this.ctx;
    const data = {
      draw: ctx.request.query.draw,
      start: ctx.request.query.start,
      length: ctx.request.query.length,
    };
    const result = await ctx.service.login.sysRoleQuery(data);
    // console.log(result);
    if (result.status == 200) {
      ctx.body = {
        result: true,
        data: result.data.data,
      };
    } else {
      ctx.logger.error(new Error(result.message));
      ctx.body = { result: false, data: null, errMsg: result.message };
    }
  }
  // 修改mima
  async sysPswUpdate() {
    const ctx = this.ctx;
    const data = {
      userId: ctx.session.userInfo.userId,
      oldPassword: crypto.createHash('md5').update(ctx.request.body.oldPassword).digest('hex'),
      newPassword: crypto.createHash('md5').update(ctx.request.body.newPassword).digest('hex'),
    };
    console.log(data);
    const result = await ctx.service.login.sysPswUpdate(data);
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
  // 重置密码
  async resetPassword() {
    const ctx = this.ctx;
    const reseatpsw = '123456';
    const data = {
      opratorUserId: ctx.session.userInfo.userId,
      userId: ctx.request.body.userId,
      password: crypto.createHash('md5').update(reseatpsw).digest('hex'),
    };
    const result = await ctx.service.login.resetPassword(data);
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

}

module.exports = sign;
