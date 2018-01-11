var app = getApp();

Page({
    data: {
      accountList: [
        { name: '酒量', size: 4, img: '../../images/avatar/f_2@3x.png' },
        { name: '社交', size: 2, img: '../../images/avatar/f_3@3x.png' },
        { name: '酒文化', size: 3, img: '../../images/avatar/f_4@3x.png' },
        { name: '礼仪', size: 4, img: '../../images/avatar/f_5@3x.png' }
      ],
      userInfo: null
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
            circleSize : res.windowWidth / 3,
            canvasWidth: circleSize * 2 + 4 * fontSize + 2 * distance,
            canvasHeight: circleSize * 2 + 2 * fontSize + 2 * distance
          })
          app.ability("my_canvas", that.data.accountList, circleSize, fontSize, distance, that.data.userInfo);
        }
      });
    },

    imgLoad: function(re){
      console.log(re)
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