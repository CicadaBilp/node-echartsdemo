const path = require('path')
//导入读取文件内容的方法
const fileUtils = require('../utils/file_utils')

const webSocket = require('ws')
//创建对象,开启端口
const wss = new webSocket.Server({
  port:9998
})


module.exports.listen = () => {
  //监听连接事件,参数client是客户端连接对象
  wss.on('connection',client => {
    console.log('有客户端连接成功');
    //再对客户端对象进行message事件的监听
    //参数msg是客户端发送来的数据
    client.on('message',async (msg) => {
      let playload = JSON.parse(msg)
      //约定好客户端发送的数据,字段中action,chartName....
      const action = playload.action
      if(action==='getData'){
        let filePath = '../data/' + playload.chartName + '.json'
        //拼接成绝对路径
        filePath = path.join(__dirname,filePath)
        //调用读取文件内容方法得到文件内容
        const ret = await fileUtils.getFileData(filePath)
        //给接收的数据中添加data字段值为获取的文件内容
        playload.data = ret
        ////转为json字符串,发送给客户端
        client.send(JSON.stringify(playload))
      }else{
        //接收的数据中action不是getData,就将接收到的msg转发给所有连接着的客户端
        wss.clients.forEach((client) => {
          client.send(msg)
        })
      }
    })
  })
}
