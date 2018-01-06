Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 0,
    windowHeight: 0,
    markers: [{
      iconPath: "../../images/canvas/tip.png",
      id: 0,
      latitude: 22.6029377986,
      longitude: 114.0581810474,
      width: 10,
      height: 18,
      title: "华问科技有限公司",
      callout: {
        content: '华问科技有限公司',
        display: "ALWAYS",
        color: "black",
        fontSize: "14",
        padding: "5",
        borderRadius: '10',
        bgColor: 'white'
      }
    }],
    circles: [{
      latitude: 22.6029377986,
      longitude: 114.0581810474,
      color: '#00AA00AA',
      radius: 100,
      fillColor: '#00000040',
      strokeWidth: "1"
    }],
    controls: [{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res);
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    });
    this.mapCtx = wx.createMapContext('myMap')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },

  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },

  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 0,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 22.6029377986,
        longitude: 114.0581810474,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },

  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 22.6029377986,
        longitude: 114.0581810474,
      }, {
        latitude: 22.6029377986,
        longitude: 114.0581810474,
      }]
    })
  }
})