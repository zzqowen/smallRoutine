var postsData = require('../../data/posts-data.js');
var app = getApp();
var scoreArr = [0, 0, 0];//得分数组
var queNum = [3, 3, 4];

Page({
    data: {
      accountList: [
        { name: '酒量', size: 4, img: '../../images/avatar/f_2@3x.png' },
        { name: '社交', size: 2, img: '../../images/avatar/f_3@3x.png' },
        { name: '酒文化', size: 3, img: '../../images/avatar/f_4@3x.png' },
        { name: '礼仪', size: 4, img: '../../images/avatar/f_5@3x.png' }
      ],
      userInfo: null,
      resultInfo: postsData.resultInfo,
    },

    onLoad: function(option){
      var that = this;
      var userInfo;
      if (option.userInfo != null){
        userInfo = JSON.parse(option.userInfo);
      }
      wx.getSystemInfo({
        success: function (res) {
          var data = that.data.accountList;
          var circleSize = res.windowWidth / 3;
          var fontSize = 85 * circleSize/750;
          var distance = 8;//文字离图的距离
          that.setData({
            userInfo: userInfo,
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth,
            circleSize : res.windowWidth * 185 / 750,
            canvasHeight: res.windowWidth * 185 / 750 * 22 / 9
          })
          // app.resultQuestion("my_canvas", that.data.accountList, circleSize, fontSize, distance, that.data.userInfo);
          console.log(that.resultRandom([2, 2, 3], that.data.resultInfo));
          app.resultQuestion("my_canvas", that.resultRandom([1, 2, 3], that.data.resultInfo), that.data.circleSize, that.data.windowWidth, that.data.userInfo, Math.PI/6);
        }
      });
    },

    resultRandom: function (resultScore, resultInfo) {
      var mapAry = [];
      var result = [];
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

    continueTap: function(event){
      wx.navigateTo({
        url: '../question/question',
      })
    },

    shareTap: function(event){
      this.onShareAppMessage();
    },

    saveTap: function(event){
      console.log(event);
      wx.canvasToTempFilePath({
        quality: 1,
        canvasId: 'my_canvas',
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

    onShareAppMessage: function (res) {
      console.log(res);
      if (res.from === 'button') {
        // 来自页面内转发按钮
        // console.log(res.target)
      }
      return {
        title: '自定义转发标题',
        path: '/pages/question/question',
        success: function (res) {
          // 转发成功
        },
        fail: function (res) {
          // 转发失败
        }
      }
    }
})