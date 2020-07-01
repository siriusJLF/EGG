module.exports = (options, app) => {

  return async function testMiddleware(ctx, next) {
    if (ctx.request.originalUrl.indexOf('login') >= 0) {
      var flag = 0;
    }
    // else if (ctx.request.originalUrl.indexOf('index') >= 0 && ctx.request.originalUrl.indexOf('no-cache') < 0){
    //   if(ctx.request.originalUrl.indexOf('erro') < 0){
    //     return ctx.response.redirect('/erro/412');
    //   }
    // }
    // eslint-disable-next-line block-scoped-var,eqeqeq,no-empty
    if (flag != 0) {
      // const say = await ctx.controller.sign.loginAPI;
      // console.log(say);
      if (!ctx.session.userInfo) {
        return ctx.response.redirect('/login');
      }
    }
    await next();
  };
};
