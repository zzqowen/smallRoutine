// pages/index/index.js
var that;
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
            console.log(res);
            that.setData({
              userInfo: res.userInfo
            });
          }
        })
      }
    });
  },

  //答题点击事件
  questionTap: function(event){
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
    })
  },

  //绑定手机点击事件
  phoneTap: function(event){
    wx.navigateTo({
      url: '../phone/phone',
    })
  },

  //个人信息点击事件
  userInfoTap: function(event){
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
            url: '../userInfo/userInfo?userInfo='+ JSON.stringify(that.data.userInfo),
          })
        }
      }
    })
  },

  //设置点击事件
  settingTap: function(event){
    wx.openSetting({
      success: (res) => {
         
      }
    })
  },

  //排行点击事件
  rankTap: function(){
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
    wx.getUserInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          userInfo: res.userInfo
        });
      }
    })
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