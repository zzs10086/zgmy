// pages/view/index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    hidden: true,
    article: {},
    danmuList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      id: options.id
    });

    //获取资讯详情
    this._getDetail();

  },
  /**
   * 获取文章详情
   */
  _getDetail: function () {

    var that = this;
    var params = {};
    params.id = that.data.id;

    that.setData({
      hidden: false
    });

    app.request({
      url: '/api/detail',
      data: params,
      success: function (res) {

        if (res.data.code == 0) {         
          that.setData({
            article: res.data.data,           
            hidden: true

          });

        }
      }

    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})