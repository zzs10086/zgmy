//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    scrollTop: 0,
    scrollHeight: 0,
    userInfo: {},
    hasUserInfo: false,
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg'
    ],
    newsList: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    var that = this;

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    
    var params = {};
    params.page = 1;
    params.category_id = 0;
    params.limit = 10;

    that._getNewsList(params);

  },

  _getNewsList:function (params) {

    var that = this;
    app.request({
      url: '/api/feed',
      data: params,
      success: function (res) {

        if (res.data.code == 0) {
          console.log(res.data);
          if (!res.data.data.length) { // 避免无效请求
            that.setData({
              invalid_data: true,
              is_show: true,
              hidden: true
            })
            return;
          }

          that.setData({
            //newsList: that.data.newsList.concat(res.data.data),
            newsList: res.data.data,
            hidden: true
          });


        }
      }

    });

  },

})
