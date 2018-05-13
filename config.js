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
        appId: '101405670', 
        appKey: 'd291549280f303d81aaf265cfa73e584',   
      }
    },
    weibo: {
      web: {
        appId: '720641025', 
        appKey: '3387a038eb4e008c7d65e86aa66ab7c0',   
      }
    }

  }
}
