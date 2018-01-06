Page({
    data: {
      accountList: [
        { name: '我的钱包', img: '../../images/avatar/f_2@3x.png' },
        { name: '意见反馈', img: '../../images/avatar/f_3@3x.png' },
        { name: '邀请好友', img: '../../images/avatar/f_4@3x.png' },
        { name: '账号绑定', img: '../../images/avatar/f_5@3x.png' },
        { name: '关于答尔文', img: '../../images/avatar/f_6@3x.png' }
      ],
      userInfo: null
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
              that.data.userInfo = res.userInfo;

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