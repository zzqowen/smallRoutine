Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight: 0,
    windowWidth: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        console.log(res);
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    });
    

    var query = wx.createSelectorQuery()
    query.select('#view').boundingClientRect()
    query.selectViewport().scrollOffset()
    console.log(query);
    query.exec(function (res) {
      console.log(res);
      res[0].top       // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var timeArr = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    var halfWidth = that.data.windowWidth/2; //屏幕宽的一半
    var halfHeight = that.data.windowHeight/2; //屏幕高的一半

    var ctx = wx.createCanvasContext('myCanvas');
    var gctx = wx.createCanvasContext("gameCanvas");

    function clock(){
      var date = new Date();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var seconds = date.getSeconds();
      ctx.save();
      ctx.translate(halfWidth, halfWidth - 80);

      //绘制圆盘
      ctx.beginPath();
      ctx.setStrokeStyle("violet");
      ctx.setLineWidth(5);
      ctx.arc(0, 0, halfWidth-100, 0, 2*Math.PI, false);
      ctx.stroke();

      //绘制时钟的值
      ctx.beginPath();
      for (var i in timeArr){
        var timeX = (halfWidth-120)*Math.cos(Math.PI*i/6);
        var timeY = (halfWidth-120)*Math.sin(Math.PI*i/6);
        ctx.setTextAlign("center");
        ctx.setTextBaseline("middle");
        ctx.setFontSize('12');
        ctx.fillText(timeArr[i], timeX, timeY);

      };

      //绘制时钟刻度
      for (var j = 0; j< 60; j++){
        ctx.beginPath();
        var dotX = (halfWidth - 100) * Math.cos(Math.PI * j / 30);
        var dotY = (halfWidth - 100) * Math.sin(Math.PI * j / 30);
        var dot_X = (halfWidth - 105) * Math.cos(Math.PI * j / 30);
        var dot_Y = (halfWidth - 105) * Math.sin(Math.PI * j / 30);
        ctx.setStrokeStyle('#cccccc');
        ctx.setLineWidth(2);
        if (j%5 == 0){
          ctx.setStrokeStyle('#000000');
          var dot_X = (halfWidth - 110) * Math.cos(Math.PI * j / 30);
          var dot_Y = (halfWidth - 110) * Math.sin(Math.PI * j / 30);
        }
        ctx.moveTo(dotX, dotY);
        ctx.lineTo(dot_X, dot_Y);
        ctx.stroke();
      };

      ctx.save();
      var hourDegree1 = Math.PI * (hour + minute / 60 + seconds / 3600) / 6;
      ctx.rotate(hourDegree1);
      ctx.drawImage("../../images/canvas/hour.png", -8, -40, 16, 48);
      ctx.restore();

      ctx.save();
      var minuteDegree1 = Math.PI * (minute + seconds / 60) / 30;
      ctx.rotate(minuteDegree1);
      ctx.drawImage("../../images/canvas/minute.png", -5, -60, 10, 70);
      ctx.restore();

      ctx.save();
      var minuteDegree1 = Math.PI * (seconds) / 30;
      ctx.rotate(minuteDegree1);
      ctx.drawImage("../../images/canvas/seconds.png", -5, -90, 10, 100);
      ctx.restore();

      ctx.restore();
      ctx.draw();
    };
    clock();

    var x=100,y=100; 
    //xyx
    gctx.save();

    gctx.beginPath();
    gctx.arc(50,50,20,0,2*Math.PI);
    gctx.setFillStyle('yellow');
    gctx.fill();

    gctx.beginPath();
    gctx.setFillStyle("blue");
    gctx.fillRect(x,y,60,60);
    gctx.fill();

    gctx.restore();
    gctx.draw(true);
    
    var touchX, touchY, enbleMove = false;

    this.touchStart = function(e){
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
      console.log(x,y)
      if (touchX > x && touchX < (x+60) && touchY > y && touchY < (y+60) ){
        enbleMove = true;
      }

      console.log(gctx);
    };

    this.touchMove = function(e){
      var _touchX = e.touches[0].clientX;
      var _touchY = e.touches[0].clientY;

      if (enbleMove){
        console.log(44)
        gctx.save();
        gctx.clearRect(x,y,60,60);
        gctx.setFillStyle('blue');
        gctx.fillRect(x + _touchX - touchX, y + _touchY - touchY, 60, 60);
        gctx.restore();
        x = x + _touchX - touchX;
        y = y + _touchY - touchY;
        touchX = _touchX;
        touchY = _touchY;

      }
      gctx.draw(true);
    };

    this.touchEnd = function(e){
      enbleMove = false;
      console.log('end');
    };

    this.touchCancel = function(e){
      console.log('cancel');
    };

    setInterval(function(){
      ctx.clearRect(0, 0, that.data.windowWidth, that.data.windowHeight/2);
      clock();
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("show");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("hide");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("unload");
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log(333);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(4444);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})