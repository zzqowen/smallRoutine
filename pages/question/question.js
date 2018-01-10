// pages/question/question.js
var postsData = require('../../data/posts-data.js');
var app = getApp();
var index = 0;
var circleSize;
var lineWidth;
var that;
var scoreArr = [0, 0, 0, 0];//得分数组
var scoreResult;//总得分

Page({

  /**
   * 页面的初始数据
   */
  data: {
      idx: index,
      questionList: postsData.question,//所有的问题和答案
      questionData: postsData.question[index],//某一个的问题和答案
      answerData: app.random(postsData.question[index].correct, postsData.question[index].ans),//答案
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    index = 0;
    that = this;
    wx.getSystemInfo({
      success: function (res) {
        var w = res.windowWidth;
        var h = res.windowHeight;
        circleSize = res.windowWidth / 10;
        lineWidth = 15;
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          canvasWidth: 2 * circleSize + lineWidth + 6
        })
        app.countDown("my_canvas_time", circleSize, lineWidth, that.callBack)
      }
    });    
  },

  callBack: function(){
    that.nextQuestion();
  },

  nextQuestion: function(){
    app.clearTime();
    index++;
    if (index >= 12){
      wx.showToast({
        title: '已经答完了',
        duration: 2000
      });
      console.log(scoreArr);
      scoreResult = (scoreArr[1] + scoreArr[3])*(scoreArr[0] + scoreArr[2])/2;
      console.log(scoreResult);
      return;
    }
    that.setData({
      idx: index,
      questionList: postsData.question,
      questionData: postsData.question[index],
      answerData: app.random(postsData.question[index].correct, postsData.question[index].ans),
    })
    app.countDown("my_canvas_time", circleSize, lineWidth, that.callBack);
  },

  //点击答案事件
  answerTap: function(event){
      var data = event.currentTarget.dataset.item;
      if (data == that.data.questionData.ans[0]) {
        console.log("正确");
        for (var i = 0, len = scoreArr.length; i< len; i++ ){
          if (that.data.questionData.category == (i+1)){
            scoreArr[i] += 1;
          }
        }
      }
      console.log(data);
      that.nextQuestion();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.clearTime();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    app.clearTime();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})