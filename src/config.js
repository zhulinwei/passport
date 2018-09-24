module.exports = {
  mongodb: {
    passport: {
      url: process.env.MONGODB,
      options: {},
    },
  },
  authorization: [{
    platform: "qq",
    clients:[
      { type: 'web', appId: 'xxx', appKey: 'xxx' },
      { type: 'app', appId: 'xxx', appKey: 'xxx' },
    ]}, {
    platform: "wechat",
    clients:[
      { type: 'web', appId: 'xxx', appKey: 'xxx' },
      { type: 'app', appId: 'xxx', appKey: 'xxx' },
    ]}, {
    platform: "baidu",
    clients:[
      { type: 'web', appId: 'xxx', appKey: 'xxx' },
      { type: 'app', appId: 'xxx', appKey: 'xxx' },
    ]}, {
    platform: "weibo",
    clients:[
      { type: 'web', appId: 'xxx', appKey: 'xxx' },
      { type: 'app', appId: 'xxx', appKey: 'xxx' },
    ]
  }],
  // authorization: {
  //   qq: {
  //     web: {
  //       appId: process.env.QQ_WEB_APPID,
  //       appKey: process.env.QQ_WEB_APPKEY   
  //     }
  //   },
  //   wechat: {
  //     web: {
  //       appId: process.env.WECHAT_WEB_APPID,
  //       appKey: process.env.WECHAT_WEB_APPKEY
  //     }
  //   },
  //   baidu: {
  //     web: {
  //       appId: process.env.BAIDU_WEB_APPID,
  //       appKey: process.env.BAIDU_WEB_APPKEY
  //     }
  //   },
  //   weibo: {
  //     web: {
  //       appId: process.env.WEIBO_WEB_APPID,
  //       appKey: process.env.WEIBO_WEB_APPKEY,   
  //     }
  //   }
  // }
};
