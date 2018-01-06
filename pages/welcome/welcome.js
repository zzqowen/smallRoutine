Page({
    data: {

    },

    onLoad: function(){
      var that = this;
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res);
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      });
    },

    onTap: function (event) {

        // wx.navigateTo({
        //     url:"../posts/post"
        // });
        
        wx.switchTab({
            url: "../posts/post"
        });
        
    }
})