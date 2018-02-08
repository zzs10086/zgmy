//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '中国马云',
    scrollTop: 0,
    scrollHeight: 0,
    userInfo: {},
    hasUserInfo: false,
    imgUrls: [],
    newsList: [],
    hidden: true,
    page:1,
    category_id:0,
    limit: 10,
    lastPage : false
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

    that._getNewsFoucs();

    that._getNewsList();    

  },
  _getNewsFoucs:function(){
    var that = this;
    var params = {};

    app.request({
      url: '/api/foucs',
      data: params,
      success: function (res) {

        if (res.data.code == 0) {
          if (res.data.data.length) { // 避免无效请求
            that.setData({             
              imgUrls: res.data.data
            })
            return;
          }          

        }
      }

    });
  },
/**
 * 获取资讯列表
 */
  _getNewsList:function () {

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
