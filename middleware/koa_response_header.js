//第二层中间件,设置响应头
module.exports = async (ctx,next) => {
  //设置响应头
  const contentType = 'application/json; charset=utf-8'
  ctx.set('Content-Type',contentType)
  //设置允许跨域的响应头
  ctx.set('Access-Control-Allow_Origin','*');
  ctx.set('Access-Control-Allow_Methods','OPTIONS,GET,POST,DELETE')
  await next()
}