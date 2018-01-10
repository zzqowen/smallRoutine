// pages/rank/rank.js
var postsData = require('../../data/posts-data.js');

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
  onShareAppMessage: function () {
  
  }
})