// pages/rank/rank.js
var postsData = require('../../data/posts-data.js');
var util = require('../../utils/util.js');
var app = getApp();

var that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["好友排行", "世界排行"],
    activeIndex: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that = this;
      var w = app.globalData.windowWidth;//屏幕宽度
      var h = app.globalData.windowHeight;//屏幕高度

      that.setData({
        windowHeight: h,
        windowWidth: w,
        userInfo: JSON.parse(options.userInfo)
      });

      wx.showLoading({
        title: '加载中...',
      })

      setTimeout(function(){
        //世界排行榜
        util.httpPost("/qBank/getSpiritsQuestionTopMid", function (res) {
          console.log(res);
          that.setData({
            worldList: res.questionTop
          })
          wx.hideLoading();
        });
        //好友排行榜
        util.httpPost("/qBank/getSpiritsFriendsTopMid?mid=" + that.data.userInfo.mid, function (res) {
          console.log(res);
          that.setData({
            friendsList: res.questionTop
          })
          wx.hideLoading();
        });
      }, 100);

  },

  //选项卡点击事件
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
    app.getStorage("userInfo", function (res) {
      that.setData({
        userInfo: res.data
      })
    }, function (res) {

    });
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '章鱼答答堂',
      path: '/pages/index/index?mid=' + that.data.userInfo.mid,
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})