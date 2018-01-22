var postsData = require('../../data/posts-data.js');
var app = getApp();
var windowWidth = app.globalData.windowWidth;
var windowHeight = app.globalData.windowHeight;
var scoreArr = [0, 0, 0];//得分数组
var queNum = [3, 3, 4];
var that

Page({
  data: {
    userInfo: null,
    resultInfo: postsData.resultInfo,
    windowWidth: windowWidth,
    windowHeight: windowHeight,
    userInfo: app.globalData.userInfo,
    circleSize: windowWidth * 185 / 750,
    canvasHeight: windowWidth * 185 / 750 * 22 / 8
  },

  onLoad: function(option){
    console.log(app.globalData);
    that = this;  
    that.setData({
      userInfo: app.globalData.userInfo,
    });
    var avatar = app.globalData.avatar;

    if (that.data.userInfo.mid == app.globalData.mid){
      wx.setNavigationBarTitle({
        title: "个人"
      })
    } else {
      wx.setNavigationBarTitle({
        title: that.data.userInfo.displayName
      });
      avatar = app.globalData.otherAvatar;
    }

    app.abilityMap("my_canvas", that.resultRandom(that.data.userInfo.result, that.data.resultInfo), that.data.circleSize, that.data.windowWidth, avatar, Math.PI / 6);

      //保存图片canvas
      var gradeText1 = "", gradeText2 = "";
      var grade = that.data.userInfo.grade ? that.data.userInfo.grade : "";
      if (that.data.userInfo.gradeText) {
        if (that.data.userInfo.gradeText.indexOf("\n") != -1) {
          gradeText1 = that.data.userInfo.gradeText.split("\n")[0];
          gradeText2 = that.data.userInfo.gradeText.split("\n")[1];
        }
      }

      setTimeout(function(){
        app.saveAbilityPhoto("save_canvas", that.resultRandom(that.data.userInfo.result, that.data.resultInfo), that.data.circleSize, that.data.windowWidth, that.data.windowHeight, avatar, Math.PI / 6, grade, gradeText1, gradeText2);
      }, 500)
  },

  //随机选项
  resultRandom: function (resultScore, resultInfo) {
    var mapAry = [];
    var result = [];

    if (!resultScore){
      for (var i = 0; i < resultInfo.length; i++) {
        var name = resultInfo[i][parseInt(Math.random() * 2)];
        result[i] = {
          'name': name,
        };
      }
      return result;
    }

    for (var j = 0; j < queNum.length; j++) {
      var score = 1 - (resultScore[j]) / queNum[j];
      mapAry.push(score);
      mapAry.push(0);
    }
    for (var i = 0; i < resultInfo.length; i++) {
      if (i % 2 != 0) {
        mapAry[i] = (mapAry[i - 1] + mapAry[(i + 1) % 6]) / 2;
      }
      var name = resultInfo[i][parseInt(Math.random() * 2)];
      result[i] = {
        'name': name,
        'score': mapAry[i]
      };
    }
    return result;
  },

  //继续挑战
  continueTap: function(event){
    wx.navigateTo({
      url: '../question/question?userInfo=' + JSON.stringify(that.data.userInfo),
    })
  },

  //分享好友点击事件
  shareTap: function(event){
    this.onShareAppMessage();
  },

  //保存相册按钮点击事件
  saveTap: function(event){
    console.log(event);
    wx.canvasToTempFilePath({
      quality: 1,
      canvasId: 'save_canvas',
      success: function (res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res);
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    that.setData({
      userInfo: app.globalData.userInfo
    })
  },

    /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (res) {
    return {
      title: '章鱼答答堂',
      path: '/pages/index/index?mid=' + that.data.userInfo.mid,
      success: function (res) {

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})