'use strict';

module.exports = () => {
  return async (ctx, next) => {
    const say = await ctx.service.login.say();
    ctx.socket.emit('res', 'auth!' + say);
    await next();
    // console.log('disconnect!');
  };
};
