//app.js
var encryption = require('./utils/md5.js');
App({
  cacheKey:{

    globCityInfo:'globCityInfo',

    globLocationText:'globLocationText'

  },

  data_const: {

    wechatley: 'zzs594ba@*2f5fH9zzs',

    api_host: 'https://api.zhongguomayun.com',//上线的时候要改！！https://api.zhongguomayun.com

    storage_key: {

      user_info: 'user_info',

    }

  },


  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },

  /**
   * 封装wx.request：
   * 1.取消api前缀及type=json
   * 2.添加身份验证，params中auth参数为true时，将进行微信登录操作获取code传入服务端（参数为'_code'）
   * 3.加密
   * @param params
   * @returns {*}
   */
  request: function(params) {
    var that = this;
    if (undefined == params.url) {
      return false;
    }
    params.url = this.data_const.api_host + params.url + '?type=json';
    params.method = "GET";
    params.data.version = "1.1.0";
    var time = ((new Date()).getTime()).toString();
    var rand = (parseInt(Math.random()*(9999-1000+1) + 1000)).toString();
    var token = encryption.md5(time + rand + this.data_const.wechatley);
    params.data.time_wechat = time;
    params.data.rand_wechat = rand;
    params.data.token_wechat = token;
    params.header = {"content-type": "application/x-www-form-urlencoded"};

    return wx.request(params);
  },

 


})