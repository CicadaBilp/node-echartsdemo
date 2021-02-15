//计算服务器消耗时间的中间件

module.exports = async (ctx,next) =>{
  //记录开始时间
  const start = Date.now()
  //执行下层中间件
  await next()
  //内部中间件都执行完后,再执行拿到结束时间
  const end = Date.now()
  //设置响应头
  const duration = end - start
  // console.log(duration);
  ctx.set('X-Response-Time',duration + 'ms')
}