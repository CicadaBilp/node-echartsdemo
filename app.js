//入口文件

const Koa = require('koa')

const app = new Koa() 

//绑定中间件

//第一层
const responseDuration = require('./middleware/koa_response_duration')
app.use(responseDuration)
//第二层
const responseHeader = require('./middleware/koa_response_header')
app.use(responseHeader)
//第三层
const responseData = require('./middleware/koa_response_data')
app.use(responseData)



//监听端口号
app.listen(8888)

const myWebSocket = require('./service/web_socket_service')
//调用websocket对客户端的连接和发送数据的监听
myWebSocket.listen()