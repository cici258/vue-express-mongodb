const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const app = express()

//require('./models/users')

//这两行代码一定要放在引入路由配置之前 否则req.body为undefined
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

//passport 初始化
app.use(passport.initialize())
require('./config/passport')(passport)

const users = require('./routers/api/users')
const profiles = require('./routers/api/profiles')

app.use('/api/users',users)
app.use('/api/profiles',profiles)
//DB config
const db = require('./config/keys').mongoURL
mongoose.connect(db,{useNewUrlParser:true})
  .then(()=>console.log('数据库连接成功'))
  .catch((err)=>console.log(err))


app.get('/',(req,res)=>{
  res.send('hello world')
})
app.listen(5000,()=>{
  console.log('后台服务启动成功')
})