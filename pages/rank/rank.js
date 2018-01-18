// pages/rank/rank.js
var postsData = require('../../data/posts-data.js');
var util = require('../../utils/util.js');

var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["好友排行", "世界排行"],
    activeIndex: 0,
    rankList: postsData.rankList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that = this;
      wx.showShareMenu({
        // 要求小程序返回分享目标信息
        withShareTicket: true
      });
      var userInfo;
      if (options.userInfo != null) {
        userInfo = JSON.parse(options.userInfo);
      }
      wx.getSystemInfo({
        success: function (res) {
          var w = res.windowWidth;
          var h = res.windowHeight;
          that.setData({
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth,
            userInfo: userInfo
          })
        }
      });

      util.httpPost("/qBank/getSpiritsQuestionTopMid", function(res){
        console.log(res);
        that.setData({
          worldList: res.questionTop
        })
      })
  },

  tabTap: function(event){
    console.log(event);
    var id = event.currentTarget.id;
    that.setData({
      activeIndex: id,
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
  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '答尔文智力库',
      path: '/pages/index/index?mid='+ that.data.userInfo.mid,
      success: function (res) {
        // 转发成功
        console.log(res);
        // 转发成功
        console.log(res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '答尔文智力库',
      path: '/pages/index/index?mid=' + that.data.userInfo.mid,
      success: function (res) {
        // 转发成功
        console.log(res);
        // 转发成功
        console.log(res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})