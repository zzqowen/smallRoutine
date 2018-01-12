var time = null;
App({
    globalData:{
        g_isPlayingMusic:false,
        g_currentMusicPostId:null,
        doubanBase: "https://api.douban.com",
    },
    onLaunch:function(){
      // wx.getSystemInfo({
      //   success: function (res) {
      //     // check sdk version
      //     console.log('SDKVersion:' + res.SDKVersion)
      //     if (res.SDKVersion < '1.6.0') {
      //       wx.showModal({
      //         title: '提示',
      //         showCancel: false,
      //         content: '当前微信版本过低，无法使用某些功能，请升级到最新微信版本后重试。'
      //       })
      //     }
      //   },
      // })
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
                console.log("已经同意获取用户信息")
              },
              fail(){
                wx.showModal({
                  title: '设置用户信息授权',
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
              }
            })
          }
        }
      })
    },
    ability: function (id, arr, circleSize, fontSize, distance, userInfo) {
      var ctx = wx.createCanvasContext(id);
      wx.downloadFile({
        url: userInfo.avatarUrl,
        success: function (res) {
          if (res.statusCode === 200) {
            ctx.translate(circleSize + 2 * fontSize + distance, circleSize + fontSize + distance);
            ctx.beginPath();
            ctx.arc(0, 0, circleSize, 0, 2 * Math.PI);
            ctx.setFillStyle("violet");
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, circleSize * 3 / 4, 0, 2 * Math.PI);
            ctx.setFillStyle("blue");
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, circleSize / 2, 0, 2 * Math.PI);
            ctx.setFillStyle("green");
            ctx.fill();
            ctx.beginPath();
            ctx.arc(0, 0, circleSize / 4, 0, 2 * Math.PI);
            ctx.setFillStyle("yellow");
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(0, -(arr[0].size * circleSize / 4));
            ctx.lineTo((arr[1].size * circleSize / 4), 0);
            ctx.lineTo(0, (arr[2].size * circleSize / 4));
            ctx.lineTo(-(arr[3].size * circleSize / 4), 0);
            ctx.setStrokeStyle("red");
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(-circleSize, 0);
            ctx.lineTo(circleSize, 0);
            ctx.setStrokeStyle("white");
            ctx.moveTo(0, -circleSize);
            ctx.lineTo(0, circleSize);
            ctx.setStrokeStyle("white");
            ctx.stroke();

            ctx.beginPath();
            ctx.setFontSize(fontSize);
            ctx.setFillStyle("black");
            ctx.setTextAlign("center");
            ctx.setTextBaseline("bottom");
            ctx.fillText(arr[0].name, 0, -circleSize - (distance - 3));

            ctx.setTextAlign("left");
            ctx.setTextBaseline("middle");
            ctx.fillText(arr[1].name, circleSize + (distance - 3), 0);

            ctx.setTextAlign("center");
            ctx.setTextBaseline("top");
            ctx.fillText(arr[2].name, 0, circleSize + (distance - 3));

            ctx.setTextAlign("right");
            ctx.setTextBaseline("middle");
            ctx.fillText(arr[3].name, -circleSize - (distance - 3), 0);

            ctx.save();
            ctx.beginPath();
            ctx.setGlobalAlpha(0);
            ctx.arc(0, 0, circleSize/4, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.clip();
            ctx.setGlobalAlpha(1);
            ctx.drawImage(res.tempFilePath, -circleSize / 4, -circleSize / 4, circleSize / 2, circleSize/2);
            ctx.restore();
            ctx.draw();
          }
        }
      })
    },

    resultQuestion: function (id, arr, circleSize, windowWidth, userInfo){
      var ctx = wx.createCanvasContext(id);
      ctx.clearRect(0, 0, 3*circleSize, 3*circleSize)
      var r = circleSize;
      wx.downloadFile({
        url: userInfo.avatarUrl,
        success: function (res) {
          console.log(res);
          if (res.statusCode === 200) {
            ctx.translate(windowWidth/2, circleSize*10/9);
            for (var n = 1; n<= 3; n++){
              //绘制六边形
              ctx.beginPath();
              for(var m = 0; m<6; m++){
                ctx.lineTo(r*n/3 * Math.cos(m *Math.PI/3), r*n/3 * Math.sin(m * Math.PI/3));
              }
              ctx.closePath();
              ctx.setStrokeStyle("black");
              ctx.stroke();
            }

            //绘制六条线
            ctx.beginPath();
            for (var k = 0; k < 6; k++) {
              ctx.moveTo(r / 3 * Math.cos(k * Math.PI / 3), r / 3 * Math.sin(k * Math.PI / 3));
              ctx.lineTo(r * Math.cos(k * Math.PI / 3), r * Math.sin(k * Math.PI / 3));
            }
            ctx.setStrokeStyle("black");
            ctx.stroke();

            //分数点
            var dis;
            ctx.beginPath();
            for (var j = 0; j< arr.length; j ++){
              ctx.lineTo((r / 3 + (r * 2 / 3) * arr[j].score) * Math.cos(j * Math.PI / 3), (r / 3 + (r * 2 / 3) * arr[j].score) * Math.sin(j * Math.PI / 3));
              ctx.setFontSize(circleSize/9);
              ctx.setFillStyle("red");
              ctx.setTextAlign("center");
              ctx.setTextBaseline("middle");
              if (j == 0 || j == 3){
                dis = arr[j].name.length / 2 * circleSize / 9 +2
              } else {
                dis = circleSize / 9;
              }
              ctx.fillText(arr[j].name, (r + dis) * Math.cos(j * Math.PI / 3), (r + dis) * Math.sin(j * Math.PI / 3))
            }
            ctx.closePath();
            ctx.setGlobalAlpha(0.2)
            ctx.setFillStyle("blue");
            ctx.fill();
            
            ctx.beginPath()
            ctx.setGlobalAlpha(0)
            ctx.arc(0, 0, r/6, 0, 2 * Math.PI)
            ctx.stroke();
            ctx.clip()
            ctx.setGlobalAlpha(1)
            ctx.drawImage(res.tempFilePath, -r/6, -r/6,r/3, r/3)
            ctx.draw()
          }
        }
      })
    },

    countDown: function (id, circleSize, lineWidth, callBack){
      var ctx = wx.createCanvasContext(id);
      var num = 0;
      time = setInterval(function () {
        ctx.clearRect(0, 0, 2*circleSize, 2*circleSize);
        num++
        if (num == 501) {
          num = 1;
        }

        ctx.save();
        ctx.translate(circleSize + (lineWidth+6)/2, circleSize + (lineWidth+6)/2);

        ctx.beginPath();
        ctx.arc(0, 0, circleSize, 0, 2 * Math.PI);
        ctx.setStrokeStyle("black");
        ctx.setLineWidth(lineWidth + 6);
        ctx.stroke();

        ctx.beginPath();
        ctx.setFontSize(lineWidth + 8);
        ctx.setTextAlign("center");
        ctx.setTextBaseline("middle");
        ctx.fillText(11 - Math.ceil(num / 50), 0, 0);
        ctx.setFillStyle("red");

        ctx.beginPath();
        ctx.rotate(-90 * Math.PI / 180);
        ctx.arc(0, 0, circleSize, 0, num * 0.72 * Math.PI / 180, true);
        ctx.setStrokeStyle("red");
        ctx.setLineWidth(lineWidth)
        ctx.stroke();
        ctx.draw();
        ctx.restore();

        if (num == 500){
          clearInterval(time);
          callBack(); 
        }
      }, 20);
    },
    clearTime: function(){
      clearInterval(time);
    },
    //打乱选项
    random: function(arr){
      console.log(arr);
      arr.sort(function(){
        return 0.5 - Math.random();
      });
      return arr;
    }
})