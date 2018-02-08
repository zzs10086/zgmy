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
    newsList: [],
    hidden: true,
    page: 1,
    category_id: 4,
    limit: 10,
    lastPage: false
  },
  //事件处理函数
  bindViewTap: function () {
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

    that._getNewsList();

  },

  _getNewsList: function () {

    var that = this;
    var params = {};
    params.page = that.data.page;
    params.category_id = that.data.category_id;
    params.limit = that.data.limit;

    that.setData({
      hidden: false
    });

    app.request({
      url: '/api/feed',
      data: params,
      success: function (res) {

        if (res.data.code == 0) {
          if (!res.data.data.length) { // 避免无效请求
            that.setData({
              invalid_data: true,
              is_show: true,
              hidden: true
            })
            return;
          }

          that.setData({
            newsList: that.data.newsList.concat(res.data.data),
            hidden: true
          });


        }
      }

    });

  },
  //加载更多
  lowermore: function (e) {

    if (!this.data.lastPage) {
      this.setData({
        page: this.data.page + 1
      });

      this._getNewsList();
    }
  },

})
