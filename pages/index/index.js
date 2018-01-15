// pages/index/index.js
var util = require('../../utils/util.js');

var that;
var ableTap = [true, true, true, true, true];
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
    that = this;
    wx.login({
      success: function (res) {
        console.log(res);
        wx.getUserInfo({
          success: function (res) {
            //console.log(res);
            that.setData({
              userInfo: res.userInfo
            });
          }
        })
      }
    });

    var str = "/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET";

    util.wxHttp(str, function(res){
       // console.log(res);
    });
  },

  //答题点击事件
  questionTap: function(event){
    if (ableTap[0]){
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.showModal({
              title: '需要用户信息授权',
              content: '',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: (res) => {
                      console.log(res);
                    }
                  });
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            wx.navigateTo({
              url: '../question/question?userInfo=' + JSON.stringify(that.data.userInfo),
            })
          }
        }
      });
      ableTap[0] = false;
    }
    
  },

  //绑定手机点击事件
  phoneTap: function(event){
    if (ableTap[4]){
      wx.navigateTo({
        url: '../phone/phone',
      })
      ableTap[4] = false;
    } 
  },

  //个人信息点击事件
  userInfoTap: function(event){
    if (ableTap[1]){
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.showModal({
              title: '需要用户信息授权',
              content: '',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: (res) => {
                      console.log(res);
                    }
                  });
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            wx.navigateTo({
              url: '../userInfo/userInfo?userInfo=' + JSON.stringify(that.data.userInfo),
            })
          }
        }
      });
      ableTap[1] = false;
    }
    
  },

  //设置点击事件
  settingTap: function(event){
    if (ableTap[3]){
      wx.openSetting({
        success: (res) => {

        }
      });
      ableTap[3] = false;
    }
    
  },

  //排行点击事件
  rankTap: function(){
    if (ableTap[2]){
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.showModal({
              title: '需要用户信息授权',
              content: '',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  wx.openSetting({
                    success: (res) => {
                      console.log(res);
                    }
                  });
                } else if (res.cancel) {
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            wx.navigateTo({
              url: '../rank/rank',
            })
          }
        }
      });
      ableTap[2] = false;
    }
    
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
    wx.getUserInfo({
      success: function (res) {
        //console.log(res);
        that.setData({
          userInfo: res.userInfo
        });
      }
    });
    ableTap = [true, true, true, true, true];
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