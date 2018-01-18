// pages/phone/phone.js
var util = require('../../utils/util.js');

var app = getApp();
var that;
var arr = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getCode: "获取验证码",
    message: "",
    phone: null,
    code: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    arr = getCurrentPages();//获取全部页面进行传值
    arr[arr.length - 2].data.directBack = true;
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo: res.userInfo,
          unionid: options.unionid
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  getCodeTap: function(event){
    if (that.data.phone != null){
      util.httpPost("/api/v1/sendWxMobileCode?mobile=" + that.data.phone, function (data) {
        wx.showToast({
          title: data.msg,
          icon: 'success',
          duration: 2000
        })
      })
    }
  },

  formSubmit: function (e) {
    var data = e.detail.value;
    if (data.input == ""){
      wx.showToast({
        title: "手机号不能为空",
        icon: 'success',
        duration: 2000
      })
    } else if (data.code == ""){
      wx.showToast({
        title: "验证码不能为空",
        icon: 'success',
        duration: 2000
      })
    } else {
      console.log(that.data.unionid);
      util.httpPost("/api/v1/sendWxValidateCode?mobile=" + data.input + "&code=" + data.code + "&unionid=" + that.data.unionid + "&nickname=" + that.data.userInfo.nickName + "&headimgurl=" + that.data.userInfo.avatarUrl, function (data) {
        console.log(data);
        wx.showToast({
          title: data.msg,
          icon: 'success',
          duration: 2000
        });
        if (data.status == "OK"){
          wx.navigateBack({
            delta: 2,
            success: function(res){
              arr[arr.length - 2].data.whetherBinding = true
            }
          })
        }
      })
    }

  },

  inputBlur: function(e){
      console.log(e);
      if (e.detail.value == ""){
        that.setData({
          message: '手机号码不能为空'
        })
      } else if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(e.detail.value))) {
        that.setData({
          message: '手机号码输入不正确',
        })
      } else {
        that.setData({
          message: '',
          phone: e.detail.value
        })
      }
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