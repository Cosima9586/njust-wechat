// pages/news/news.js
let that = '';
const config = require('../../config');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newslist: ''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    this.search();
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
  showNews: function (e) {
    // console.log(e.currentTarget.dataset.number)
    // wx.navigateTo({
    //   url: "../../pages/news/newsDetail?newsContent=" + e.currentTarget.dataset.number,
    // })
    var news = this.data.newslist
    console.log("length ",news.length)
    for (var i = 0; i < news.length; i++) {
      if (parseInt(news[i].number) === parseInt(e.currentTarget.dataset.number)) {
        console.log('enter')
        getApp().globalData.newsDetail = news[i]
       // var newsDetail = JSON.stringify(news[i])
        wx.navigateTo({
          url: "../../pages/news/newsDetail",
        })


      }
    }

  },

  search: function () {
      wx.showLoading({
          title: '正在加载...',
      })
    wx.request({
      //url: config.service.newsUrl,
      url: config.service.newsUrl,
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },

      success: function (res) {
        // console.log(res.data);
        // newslist = res.data;
        that.setData({
          newslist: res.data
        });
        wx.hideLoading();
      }
    })
  }
})