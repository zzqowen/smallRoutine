var postsData = require('../../data/posts-data.js');
const ImgLoader = require('../../img-loader/img-loader.js');
var app = getApp();
var scoreArr = [0, 0, 0];//得分数组
var queNum = [3, 3, 4];
var that

Page({
  data: {
    userInfo: null,
    resultInfo: postsData.resultInfo,
  },

  onLoad: function(option){
    that = this;
    that.imgLoader = new ImgLoader(this);


    var w = app.globalData.windowWidth;//屏幕宽度
    var h = app.globalData.windowHeight;//屏幕高度

    that.setData({
      userInfo: JSON.parse(option.userInfo),
      windowHeight: h,
      windowWidth: w,
      circleSize: w * 185 / 750,
      canvasHeight: w * 185 / 750 * 22 / 9
    })
    //获取缓存好的头像

    that.imgLoader.load(that.data.userInfo.avatar, (err, data) => {
      console.log('图片加载完成', err, data.src, data.width, data.height);
      app.abilityMap("my_canvas", that.resultRandom(that.data.userInfo.result, that.data.resultInfo), that.data.circleSize, that.data.windowWidth, data.src, Math.PI / 6);


      //保存图片canvas
      app.saveAbilityPhoto("save_canvas", that.resultRandom(that.data.userInfo.result, that.data.resultInfo), that.data.circleSize, that.data.windowWidth, that.data.windowHeight, data.src, Math.PI / 6);
    })
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
    app.getStorage("userInfo", function (res) {
      that.setData({
        userInfo: res.data
      });
    }, function (res) {
      
    });
  },

    /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (res) {
    return {
      title: '答尔文智力库',
      path: '/pages/index/index?mid=' + that.data.userInfo.mid,
      success: function (res) {

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})