module.exports = {
  mongodb: {
    passport: {
      url: process.env.MONGODB,
      options: {},
    },
  },
  authorization: {
    qq: {
      web: {
        appId: process.env.QQ_WEB_APPID
        appKey: process.env.QQ_WEB_APPKEY,   
      }
    },
    weibo: {
      web: {
        appId: process.env.WEIBO_WEB_APPID,
        appKey: process.env.WEIBO_WEB_APPKEY,   
      }
    }

  }
}
