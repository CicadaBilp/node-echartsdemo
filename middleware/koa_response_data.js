const path = require('path')
const fileUtils = require('../utils/file_utils')

//第三层中间件,处理请求路径返回相应数据
module.exports = async (ctx,next) => {
  const url = ctx.request.url
  //拿到路径中的文件名
  let filePath = url.replace('/api','')
  //拼接读取文件的相对路径
  filePath = '../data' + filePath + '.json'
  filePath = path.join(__dirname,filePath)
  //调用方法读取目标文件
  try {
    const ret = await fileUtils.getFileData(filePath)
    ctx.response.body = ret
  } catch (error) {
    const errorMsg = {
      message:'读取文件失败',
      status:404
    }
    ctx.response.body = JSON.stringify(errorMsg)
  }

  await next()
}