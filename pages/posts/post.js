var postsData = require('../../data/posts-data.js');
var util = require('../../utils/util.js');
function postHandle(postData){
  for (var i in postData){
    postData[i].createDate = dateHandle(postData[i].createDate);
    postData[i].photofiles = postData[i].photofiles.slice(0, 3);
    if (postData[i].content.length > 72) {
      postData[i].content = postData[i].content.substr(0, 72) + '...';
    }
    postData[i].category = categoryHandle(postData[i].category);
    postData[i].server = util.server;
  }
  return postData;
}

function dateHandle(date){
  var time = new Date(date);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var day = time.getDate();
  var hour = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();

  // return year + '-' + handle(month) + '-' + handle(day) + ' ' + handle(hour) + ':' + handle(minutes) + ':' + handle(seconds);
  return handle(hour) + ':' + handle(minutes);

  function handle(data){
    if (data < 10){
      data = '0' + data;
    }
    return data;
  }
}

function categoryHandle(category){
  var categoryList = ['生活', '情感', '就业', '娱乐', '教育'];
  return categoryList[category];
}

Page({
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为动作A
    // 而这个动作A的执行，是在onLoad函数执行之后发生的
    postList: [],
    page: 1,
    size: 10,
    hasMore: true,
    hasRefesh: false,
    isPage: 0,
  },
  
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    }); 
    util.httpPost('/api/v1/getPostsList?pageIndex='+this.data.page+'&pageSize='+ this.data.size, this.handleData);
  },

  handleData: function(postsData){
    var that = this;
    var more = true;
    if (!postsData.data || postsData.data.length < 10){
      more = false;
    }
    if (that.data.isPage == 1){
      this.setData({
        postList: postHandle(postsData.data),
        hasMore: more,
        page: 2
      });
    } else {
      this.setData({
        postList: that.data.postList.concat(postHandle(postsData.data)),
        hasMore: more,
        page: ++that.data.page
      });
    }

    setTimeout(function(){
      that.setData({
        hasRefesh: false
      })
    }, 500);

    wx.stopPullDownRefresh();
  },

  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

  onSwiperTap: function (event) {
    // target 和currentTarget
    // target指的是当前点击的组件 和currentTarget 指的是事件捕获的组件
    // target这里指的是image，而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: "post-detail/post-detail?id=" + postId
    })
  },

  //加载更多
  onReachBottom: function (e) {
    console.log(this.data.page);
    var that = this;
    var ableHttp = true;
    if (that.data.isPage == that.data.page){
      ableHttp = false;
    } else {
      that.setData({
        isPage: that.data.page
      });
      ableHttp = true;
    }
    

    that.setData({
      hasRefesh: true,
    });
    if (!that.data.hasMore) return
    if (ableHttp) {
      util.httpPost('/api/v1/getPostsList?pageIndex=' + that.data.page + '&pageSize=' + this.data.size, this.handleData)
    }
  },
  //刷新处理
  onPullDownRefresh: function (e) {
    var that = this;
    that.setData({
      hasRefesh: true,
      isPage: 1,
      page: 1
    });

    util.httpPost('/api/v1/getPostsList?pageIndex=1&pageSize=' + this.data.size, this.handleData)
  }
})