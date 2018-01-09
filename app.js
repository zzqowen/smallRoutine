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
    ability: function (id, arr, w, h, circleSize) {
      var ctx = wx.createCanvasContext(id);
      ctx.save();
      ctx.translate(w / 4, circleSize);
      ctx.beginPath();
      ctx.arc(0, 0, circleSize, 0, 2 * Math.PI);
      ctx.setFillStyle("black");
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

      ctx.draw()
      ctx.restore();
    },
})