var time = null;
App({
    globalData:{
        g_isPlayingMusic:false,
        g_currentMusicPostId:null,
        doubanBase: "https://api.douban.com",
    },
    onLaunch:function(){
      // wx.getSetting({
      //   success(res){
      //     console.log(res);
      //   }
      // });
      // wx.openSetting({
      //   success:function(res){ 
      //      res.authSetting = {
      //        "scope.userInfo": true,
      //        "scope.userLocation": true
      //     }
      //   }
      // })
    },
    ability: function (id, arr, circleSize, fontSize, distance) {
      var ctx = wx.createCanvasContext(id);
      ctx.save();
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

      ctx.draw()
      ctx.restore();
    },

    countDown: function (id, circleSize, lineWidth){
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
      }, 20);
    },
    clearTime: function(){
      clearInterval(time);
    }
})