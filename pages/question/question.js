// pages/question/question.js
var postsData = require('../../data/posts-data.js');
var app = getApp();
var index = 0;
var circleSize;
var lineWidth;
var that;
var scoreArr = [0, 0, 0];//得分数组
var queNum = [3, 3, 4];
var innerAudioContext;

Page({

  /**
   * 页面的初始数据
   */
  data: {
      challengeStatus: false,
      challengeResult: false,
      waitingStatus: true,
      resultInfo: postsData.resultInfo,
      idx: index,
      questionList: postsData.question,//所有的问题和答案
      questionData: postsData.question[index],//某一个的问题和答案
      answerData: app.random(postsData.question[index].correct.concat(postsData.question[index].ans)),//答案
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo;
    if (options.userInfo != null){
        userInfo = JSON.parse(options.userInfo);
    }
    index = 0;
    that = this;
        
    wx.getSystemInfo({
      success: function (res) {
        var w = res.windowWidth;
        var h = res.windowHeight;
        circleSize = res.windowWidth / 10;
        lineWidth = 15;
        that.setData({
          userInfo: userInfo,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          canvasWidth: 2 * circleSize + lineWidth + 6,

        })
        setTimeout(function(){
          that.setData({
            waitingStatus: false,
            challengeStatus: true,
          })
          app.countDown("my_canvas_time", circleSize, lineWidth, that.callBack);
        }, 1000);
        
      }
    });
  },

  callBack: function(){
    that.nextQuestion();
  },

  nextQuestion: function(){
    app.clearTime();
    index++;
    if (index >= 10){
      wx.showToast({
        title: '已经答完了',
        duration: 2000
      });
      that.setData({
        challengeStatus: false,
        challengeResult: true,
      });
      app.resultQuestion("result_question", that.resultRandom(scoreArr, that.data.resultInfo), that.data.canvasWidth, that.data.windowWidth, that.data.userInfo);
    
      var resultData = that.setGrade(parseInt((that.calcScore(scoreArr) / that.calcScore(queNum)) * 100));
      that.setData({
        grade: resultData.grade,
        text: resultData.text,
      });

      return;
    }
    that.setData({
      idx: index,
      questionList: postsData.question,
      questionData: postsData.question[index],
      answerData: app.random(postsData.question[index].correct.concat(postsData.question[index].ans)),
    })
    app.countDown("my_canvas_time", circleSize, lineWidth, that.callBack);
  },

  //根据对的提计算分数
  calcScore: function(arr){
    var scoreResult = 0;
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
      if (i == arr.length - 1) {
        scoreResult += (arr[i] + 1) * (arr[0] + 1);
      } else {
        scoreResult += (arr[i] + 1) * (arr[i + 1] + 1)
      }
    }
    return scoreResult;
  },

  //点击答案事件
  answerTap: function(event){
      var data = event.currentTarget.dataset.item;
      if (data == that.data.questionData.ans[0]) {
        for (var i = 0, len = scoreArr.length; i< len; i++ ){
          if (that.data.questionData.category == (i+1)){
            scoreArr[i] += 1;
          }
        }
        that.audioPlay(true);
      } else {
        that.audioPlay(false);
      }
      that.nextQuestion();
  },

  resultRandom: function (resultScore, resultInfo){
      var mapAry = [];
      var result = [];
      for (var j = 0; j < queNum.length; j++) {
        var score = 1 - (resultScore[j]) / queNum[j];
        mapAry.push(score);
        mapAry.push(0);
      }
      for (var i = 0; i < resultInfo.length; i++) {
        if (i % 2 != 0) {
          mapAry[i] = (mapAry[i - 1] + mapAry[(i + 1) % 6]) / 2;
        }
        var name = resultInfo[i][parseInt(Math.random() * 2)];
        result[i] = {
          'name': name,
          'score': mapAry[i]
        };
      }
      return result;
  },

  audioPlay: function(success){
    innerAudioContext = wx.createInnerAudioContext()
    // innerAudioContext.autoplay = true
    innerAudioContext.src = success ? "media/success(1010).mp3" : "media/defeat(1010).mp3";
    console.log(innerAudioContext);
    innerAudioContext.play();
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },

  audioStop: function(){
    innerAudioContext.stop();
  },

  setGrade: function (score) {
    var arr = postsData.gradeInfo;
    var result;
    var rlt = {grade: "", text: ""};
    if (score == 5) {
      result = arr[0];
    } else if (score < 20) {
      result = arr[1];
    } else if (score < 40) {
      result = arr[2];
    } else if (score < 60) {
      result = arr[3];
    } else if (score < 80) {
      result = arr[4];
    } else if (score < 95) {
      result = arr[5];
    } else if (score < 100) {
      result = arr[6];
    } else if (score == 100) {
      result = arr[7];
    } else {
      console.log('错误');
    }

    var len = result.text.length;
    rlt.grade = result.grade;
    rlt.text = result.text[parseInt(Math.random() * len)]
    return rlt;
  },

  continueQuestion: function(){
    index = 0;
    scoreArr = [0, 0, 0];//得分数组

    that.setData({
      waitingStatus: true,
      challengeResult: false,
      challengeStatus: false,
      idx: index,
      questionList: postsData.question,//所有的问题和答案
      questionData: postsData.question[index],//某一个的问题和答案
      answerData: app.random(postsData.question[index].correct.concat(postsData.question[index].ans)),//答案
    })
    setTimeout(function () {
      that.setData({
        waitingStatus: false,
        challengeStatus: true,
      })
      app.countDown("my_canvas_time", circleSize, lineWidth, that.callBack);
    }, 1000);
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

  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '自定义转发标题',
      path: '/pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})