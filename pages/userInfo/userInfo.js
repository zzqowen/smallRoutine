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

    onLoad: function(){
      var that = this;
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            windowHeight: res.windowHeight,
            windowWidth: res.windowWidth
          })

          var w = that.data.windowWidth;
          var h = that.data.windowHeight;
          var data = that.data.accountList;
          var circleSize = w / 4;

          app.ability("my_canvas", that.data.accountList, w, h, circleSize);
        }
      });

      wx.getSetting({
        success: (res) => {
          console.log(res);
          /*
           * res.authSetting = {
           *   "scope.userInfo": true,
           *   "scope.userLocation": true
           * }
           */
        }
      })
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
        wx.getImageInfo({
          src: '../../images/avatar/1.png',
          success: function (res) {
            console.log(res.width)
            console.log(res.height)
            var path = res.path;
            wx.saveImageToPhotosAlbum({
              filePath: path,
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