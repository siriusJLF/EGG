module.exports = app => {
  const start = Date.now();
  app.once('server', server => {
    // websocket
  });
  app.on('error', (err, ctx) => {
    // report error
  });
  app.on('request', ctx => {
    // console.log(ctx.request);
    // console.log(ctx.request.request.method, ctx.request.request.url);
    // console.log(ctx.request.header.cookie);
  });
  app.on('response', ctx => {
    // ctx.starttime is set by framework
    // const used = Date.now() - ctx.starttime;
    // log total cost
  });
  // app.logger.info('启动耗时 %d ms', Date.now() - start);

};
