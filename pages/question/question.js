// pages/question/question.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var w = res.windowWidth;
        var h = res.windowHeight;
        var data = that.data.accountList;
        var circleSize = res.windowWidth / 10;
        var lineWidth = 15;
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          canvasWidth: 2 * circleSize + lineWidth + 6
        })
        app.countDown("my_canvas_time", circleSize, lineWidth);
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
    app.clearTime();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.clearTime();
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