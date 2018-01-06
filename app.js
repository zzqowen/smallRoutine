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
    }
})