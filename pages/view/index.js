// pages/view/index.js
//获取应用实例
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    hidden: true,
    article:{},
    content:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    wx.setNavigationBarTitle({
      title: '马云资讯',
    });
    
    this.setData({
      id: options.id
    });
    
    //获取资讯详情
    this._getDetail();

  },
  /**
   * 获取文章详情
   */
  _getDetail:function(){

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
          WxParse.wxParse('content', 'html', res.data.data.content.content, that, 5);
          that.setData({
            article: res.data.data,
            //content: app.convertHtmlToText(res.data.data.content.content),
            //content: res.data.data.content.content,
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