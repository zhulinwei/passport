a passport for koa2 

> Create At：2018-05-20
> Last Changed：2018-09-24
> Authors: [Level.Z]

# Introduction
A set of third-party login (QQ, WeChat, Weibo, and Baidu) demos based on Oauth and reference passport.js

# usage
the basic rules of routing is `router.get('/api/login:type/:mode')`

## password
* url: `POST /api/login/local`
* form: 

|parameter|type|
|-|-|
|mobile|String|
|password|String|

## QQ
* url: `GET /api/login/qq/web`

## WeChat 
* url `GET /api/login/wechat/web`

## Weibo 
* url: `GET /api/login/weibo/web`

## baidu
* url: `GET /api/login/baidu/web`
 
