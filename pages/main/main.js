// pages/main/main.js

const ICON_SCALE = 0.25;

Page({

  /**
   * 页面的初始数据
   */
  data: {

    ui: {
      windowHeight: 0,
      padding: 0,
      menuWidth: 0,
      menuHeight: 0,
      iconWidth: 0,
      iconHeight: 0
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let res = wx.getSystemInfoSync()
    this.data.ui.windowHeight = res.windowHeight;
    this.data.ui.menuWidth = res.windowWidth;
    this.data.ui.menuHeight = res.windowHeight * 0.6;
    // this.data.ui.padding = res.windowHeight * 0.15;
    this.data.ui.iconWidth = ICON_SCALE * this.data.ui.menuWidth;
    this.data.ui.iconHeight = ICON_SCALE * this.data.ui.menuHeight;

    this.setData(
      {
        ui: this.data.ui
      }
    );
  },
    /**
     * 退出登录
     */
    logout: function () {
        wx.showModal({
            title: '退出',
            content: '确定退出登录吗？',
            success: function(res) {
                if (res.confirm) {
                    wx.redirectTo({
                        url: '../../pages/login/login',
                    })
                }
            }
        })
        
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
  redictToClassTable: function () {
      console.log('跳转到课表信息');
      wx.navigateTo({
          url: '../../pages/classtable/classtable',
      });
  },
  redictToScore: function () {
      console.log('跳转到成绩信息');
      wx.navigateTo({
          url: '../../pages/score/score',
      });
  },
  redictToBook: function () {
      console.log('跳转到图书信息');
      wx.navigateTo({
          url: '../../pages/book/searchBook',
      });
  },
  redictToNews: function () {
      console.log('跳转到资讯信息');
      wx.navigateTo({
          url: '../../pages/news/news',
      });
  },
})