// pages/index/index.js
var util = require('../../utils/util.js');
var crypt = require('../../WXBizDataCrypt/WXBizDataCrypt.js')

var that;
var ableTap = [true, true, true, true, true, true, true];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    switchCheck: true,//音效按钮是否被选中
    popupStatus: false,//设置弹框是否显示
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });

    that = this;
    wx.showLoading({
      title: '登录中',
    });

    //获取屏幕宽高
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
        })
      }
    });

    //登录
    wx.login({
      success: function (res) {
        console.log(res);
        wx.getUserInfo({
          success: function (res) {
            wx.hideLoading()
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
                  ableTap[0] = true;
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
    if (ableTap[6]){
      wx.navigateTo({
        url: '../phone/phone',
      })
      ableTap[6] = false;
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
                  ableTap[1] = true;
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

  //奖品点击事件
  prizeTap: function(){
    if (ableTap[4]){
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
                  ableTap[4] = true;
                  console.log('用户点击取消')
                }
              }
            })
          } else {
            wx.navigateTo({
              url: '../prize/prize?userInfo=' + JSON.stringify(that.data.userInfo),
            })
          }
        }
      });
      ableTap[4] = false;
    }
  },

  //设置点击事件
  settingTap: function(event){
    if (ableTap[3]){
      that.setData({
        popupStatus: true
      })
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
                  ableTap[2] = true;
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

  switchTap: function(e){
    console.log(e);
    that.setData({
      switchCheck: !(that.data.switchCheck)
    })
  },

  contentTap: function(){
    return;
  },

  popupTap: function(){
    that.setData({
      popupStatus: false
    });
    ableTap[3] = true;
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
    ableTap = [true, true, true, true, true, true, true];
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
      path: '/pages/index/index?id=123',
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