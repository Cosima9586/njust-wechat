// pages/news/news D e tai l.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsTitle: '',
    newsContent: '',
    newsTime: '',
    newsDetail: ''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var WxParse = require('../../pages/wxParse/wxParse.js');
    var article = getApp().globalData.newsDetail.content

    console.log(article)
     WxParse.wxParse('article', 'html', article, that, 5)
    
    
    this.setData({
      // newsTitle: options.newsTitle,
      // newsContent: options.newsContent,
      // newsTime: options.newsTime,
      newsDetail: JSON.parse(JSON.stringify(getApp().globalData.newsDetail)),
      

    })
   // console.log(this.data.newsDetail)
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
  
  },

  

 
})