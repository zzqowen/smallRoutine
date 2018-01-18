// pages/index/index.js
var util = require('../../utils/util.js');
var crypt = require('../../WXBizDataCrypt/WXBizDataCrypt.js')
var app = getApp();

var that;
var ableTap = [true, true, true, true, true, true];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    settingOpacityStatus: true,//初始化弹框opacity为0
    moreOpacityStatus: true,//初始化弹框opacity为0
    switchCheck: true,//音效按钮是否被选中
    popupStatus: true,//设置弹框是否显示
    expectPopupStatus: true,//设置弹框是否显示
    darwinUserInfo: null,//答尔文用户资料
    wxUserInfo: null,//微信用户资料
    mid: null,//用户mid
    whetherBinding: false,//是否要绑定手机,true为是
    directBack: false, //绑定手机页面是否直接点的返回键
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.getCurrentUserInfo();

    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });

    //获取音效按钮当前状态
    app.getStorage("switchCheck", function(res){
      that.setData({
        switchCheck: res.data
      })
    }, function(res){
      app.setStorage("switchCheck", true);
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
  },

  //答题点击事件
  questionTap: function(event){
    if (ableTap[0]){
      var info = that.data.wxUserInfo;
      info.id = that.data.mid;
      that.getAuthority(0, '../question/question?userInfo=' + JSON.stringify(info));

      ableTap[0] = false;
    }
  },

  //个人信息点击事件
  userInfoTap: function(event){
    if (ableTap[1]){
      that.getAuthority(1, '../userInfo/userInfo?userInfo=' + JSON.stringify(that.data.wxUserInfo));

      ableTap[1] = false;
    }  
  },

  //奖品点击事件
  prizeTap: function(){
    if (ableTap[4]){
      that.getAuthority(4, '../prize/prize?userInfo=' + JSON.stringify(that.data.wxUserInfo))

      ableTap[4] = false;
    }
  },

  //设置点击事件
  settingTap: function(event){
    if (ableTap[3]){
      that.setData({
        popupStatus: false,
        
      })
      setTimeout(function(){
        that.setData({
          settingOpacityStatus: false
        })
      }, 100);
      ableTap[3] = false;
    }
    
  },

  //排行点击事件
  rankTap: function(){
    if (ableTap[2]){
      that.getAuthority(2, '../rank/rank')
      ableTap[2] = false;
    }  
  },

  //判断有没有获取微信用户权限
  getAuthority: function (index, nUrl){
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
                    wx.getSetting({
                      success(res) {
                        if (res.authSetting['scope.userInfo']) {
                          that.getCurrentUserInfo();
                        }
                      }
                    })
                  }
                });
              } else if (res.cancel) {
                ableTap[index] = true;
                console.log('用户点击取消')
              }
            }
          })
        } else {
          wx.navigateTo({
            url: nUrl,
          })
        }
      }
    });
  },

  //更多智力题点击事件
  moreTap: function(){
    if (ableTap[5]){
      that.setData({
        expectPopupStatus: false
      });
      setTimeout(function(){
        that.setData({
          moreOpacityStatus: false
        })
      }, 100);
      ableTap[5] = false;
    }
  },

  //打开和关闭音效
  switchTap: function(e){
    app.setStorage("switchCheck", !(that.data.switchCheck));
    that.setData({
      switchCheck: !(that.data.switchCheck)
    });
  },

  contentTap: function(){
    return;
  },

  //敬请期待点击透明层隐藏弹框
  expectPopupTap: function(){
    that.setData({
      expectPopupStatus: true,
      moreOpacityStatus: true
    });
    ableTap[5] = true;
  },

  //设置弹框点击透明层隐藏弹框
  popupTap: function(){
    that.setData({
      popupStatus: true,
      settingOpacityStatus: true
    });
    ableTap[3] = true;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  //获取当前用的信息
  getCurrentUserInfo: function(){
    app.userInfoData(function (darwinData, mid) {
      wx.hideLoading();
      that.setData({
        darwinUserInfo: darwinData,
        mid: mid
      });
    }, function (wxData) {
      that.setData({
        wxUserInfo: wxData
      });
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(that.data.directBack)
    if (that.data.whetherBinding || that.data.directBack){
      that.getCurrentUserInfo();
      that.setData({
        whetherBinding: false,
        directBack: false,
      })
    };
    ableTap = [true, true, true, true, true, true];
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