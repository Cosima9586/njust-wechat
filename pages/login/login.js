// pages/login/login.js
const config = require('../../config');
let that = '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      stuIdTxt: '',
      passwordTxt: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that = this;
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

  /**
   * 登录信息提交
   */
  login_submit: function (e) {
      wx.showLoading({
          title: '正在登录',
      });
    
      console.log('form发生了submit事件，携带数据为：', e.detail.value);
      if (e.detail.value.stu_id === '' || e.detail.value.password === '') {
          wx.hideLoading();
          wx.showModal({
              title: '提示',
              content: '学号和密码不能为空！',
              showCancel: false,
              confirmText: '知道了'
          })
      } else {
          wx.request({
              url: config.service.loginUrl,
            //   url: 'http://localhost:5000/weapp/login',
              data: e.detail.value,
              method: "POST",
              header: {
                  'content-type': 'application/x-www-form-urlencoded' // 默认值
              },

              success: function (res) {
            
                //   console.log(res.data);
                //   console.log(res.data.loginResult);
                //   res.data.status = 'success';
                  if (res.data.loginResult === 'success') {
                      // 跳转到登录成功界面
                      getApp().globalData.classTable = res.data.classTable;
                      getApp().globalData.score = res.data.score;
                      wx.hideLoading();
                    //   console.log(getApp().globalData.classTable);
                      wx.redirectTo({
                          url: "../../pages/main/main"
                      });
                  } else if (res.data.loginResult === 'LoginInfoErr') {
                      wx.hideLoading();
                      wx.showModal({
                          title: '提示',
                          content: '学号或密码错误！',
                          showCancel: false,
                          confirmText: '知道了'
                      });
                      that.setData({
                          stuIdTxt: '',
                          passwordTxt: ''
                      });
                  } else if (res.data.loginResult === 'LoginInfoErr') {
                      wx.hideLoading();
                      wx.showModal({
                          title: '提示',
                          content: '密码过于简单或长时间未修改，请前往教务处网站修改密码！',
                          showCancel: false,
                          confirmText: '知道了'
                      });
                      that.setData({
                          stuIdTxt: '',
                          passwordTxt: ''
                      });
                      
                    } else {
                      wx.hideLoading();
                      wx.showModal({
                          title: '提示',
                          content: '教务处系统抽了！',
                          showCancel: false,
                          confirmText: '知道了'
                      });
                      that.setData({
                          stuIdTxt: '',
                          passwordTxt: ''
                      });
                  }
                  
              },
              fail: function() {
                  setInterval(wx.hideLoading(), 5000)
                  wx.showModal({
                      title: '提示',
                      content: '抱歉！我们服务器抽了！',
                      showCancel: false,
                      confirmText: '知道了'
                  });
                  that.setData({
                      stuIdTxt: '',
                      passwordTxt: ''
                  });
              }
              
          });
      }
  },
})