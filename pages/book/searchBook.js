// pages/book/searchBook.js
let that = '';
const config = require('../../config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    
    bookNameTxt: '',
    top: '150px',
    display: 'none',
    booklist: '',
    book_id:'',
    pageNum:[],
    pageTxt:'',
    curPage: 1,
    index: 0,
    resultTotal: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;

    this.setData({
        windowWidth: wx.getSystemInfoSync().windowWidth
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

  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    wx.showLoading({
      title: '正在查询',
    });
    
    // console.log('enter')
    // console.log("bookName:",that.data.bookNameTxt)
    wx.request({
        url: config.service.bookUrl,
      method: 'POST',
      data: {
        page:parseInt(e.detail.value)+1,
        findName:that.data.bookNameTxt
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },

      success: function (res) {
        // console.log(res.data);

        var arr = new Array(parseInt(res.data[0].pageTotal));
        for (var i = 0; i < arr.length; i++) {
          arr[i] = i+1;
        }
        that.setData({
          booklist: res.data,
          pageNum: arr,
          curPage: parseInt(that.data.index) + 1
        })
         wx.hideLoading()

      }
    })
  },



  showDetail:function (e) {
    // console.log("showDetail+", e.detail.value)
    wx.request({
        url: config.service.bookDetailUrl,
        method: 'POST',
        data: e.detail.value,
        header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
        },

        success: function (res) {
            var bookDetail = JSON.stringify(res.data)
            wx.navigateTo({
                url: "../../pages/book/book?bookDetail=" + bookDetail,
            })
        }
    })
    var books=this.data.booklist
    for(var i = 0; i<books.length;i++){
      if (parseInt(books[i].id) === parseInt(e.detail.value.book_id)){
        var bookDetail = JSON.stringify(books[i].detail)
        wx.navigateTo({
          url: "../../pages/book/book?bookDetail=" + bookDetail,
        })
      }
    }

  },

  book_submit: function (e) {
    wx.showLoading({
      title: '正在查询',
    });
    that.data.bookNameTxt = e.detail.value.findName;
    // console.log('form发生了submit事件，携带数据为：', e.detail.value);
    // this.setData({
    //   top: "10px",
    //   display: "block"
    // })
    wx.request({
      url: config.service.bookUrl,
      method:'POST',
      data: e.detail.value,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },

      success: function (res) {
        // console.log(res.data);
        let sum = parseInt(res.data[0].pageTotal);
        var arr = new Array(sum);
        for (var i = 0; i < arr.length; i++) {
          arr[i] = i+1;
        }
        // console.log(arr)
        that.setData({
          booklist: res.data,
          pageNum: arr,
          top: "10px",
          display: "block",
          resultTotal: res.data[0].resultTotal
        });

        if(sum == 0) {
            that.setData({
                display: "none",
                resultTotal: 0
            });
        }

        wx.hideLoading();
          // 跳转到书籍列表页面
        //var booksList = JSON.stringify(res.data)
        //  getApp().globalData.bookList = res.data.bookList;
          // wx.navigateTo({
          //   url: "../../pages/book/book?bookList=" + booksList,
          // });
      }
    })

  }
})