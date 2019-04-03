const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const keys = require('../../config/keys')
const User = require('../../models/Users')
//$route GET api/users/test
//@desc 返回请求的json数据
//@access public
/* router.get('/test',(req,res)=>{
  res.json({
    msg: "login works"
  })
}) */

//$route POST api/users/register
//@desc 返回请求的json数据
//@access public
router.post('/register',(req,res)=>{
  //console.log(req.body)
  //查询邮箱是否已存在 若不存在 保存注册信息
  User.findOne({email:req.body.email})
    .then((user)=>{
      if(user){
        return res.status(400).json("邮箱已经被注册")
      }else{
        const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          avatar,
          password: req.body.password,
          identity: req.body.identity
        })
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt,(err, hash) => {
              if(err){
                throw err
              }
              newUser.password = hash
              newUser.save()
                .then(user=>res.json(user))
                .catch(err=>console.log(err))
          });
      });
      }
    })
})
//$route POST api/users/login
//@desc 返回token jwt passport
//@access public
router.post('/login',(req,res)=>{
  const email = req.body.email
  const password = req.body.password
  User.findOne({email})
    .then(user=>{
      if(!user){
        return res.status(404).json("用户不存在")
      }
      //密码匹配
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch){
            const rule = {
              id: user.id,
              username: user.username,
              avatar: user.avatar,
              identity: user.identity
            }
            jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
              if(err) throw err
              res.json({
                success: true,
                token: "Bearer " + token
              })
            })
           //res.json({msg: "success"})
          }else{
            return res.status(404).json("密码错误")
          }
        })
    })
})
//$route GET api/users/current      使用passport-jwt验证token
//@desc return current user
//@access private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
  res.json({
    id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    identity: req.user.identity
  })
})
module.exports = router