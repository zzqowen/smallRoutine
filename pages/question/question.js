// pages/question/question.js
var postsData = require('../../data/posts-data.js');
const ImgLoader = require('../../img-loader/img-loader.js');
var util = require('../../utils/util.js');
var app = getApp();
var index = 0;
var circleSize;
var lineWidth;
var that;
var scoreArr = [0, 0, 0];//得分数组
var queNum = [3, 3, 4];
var innerAudioContext;
var startAniTime = null;
var ableTap = true; //是否可以点击 true为可以， false为不可以
var spotTime = null;
var totalTime = 0; //答题的总时间

Page({
  /**
   * 页面的初始数据
   */
  data: {
      reset: true,//小章鱼动画是否运行
      spot: "",
      countNum: 3,
      challengeStatus: false,
      challengeResult: false,
      waitingStatus: true,
      resultInfo: postsData.resultInfo,
      idx: index,
      // questionList: postsData.question,//所有的问题和答案
      // questionData: postsData.question[index],//某一个的问题和答案
      // answerData: app.random(postsData.question[index].correct.concat(postsData.question[index].ans)),//答案
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });
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
        circleSize = res.windowWidth * 80 / 750;
        lineWidth = res.windowWidth * 16 / 750;
        that.setData({
          userInfo: userInfo,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          canvasWidth: 2 * circleSize + lineWidth + 6,
          circleSize1: res.windowWidth * 185 / 750,
          canvasHeight1: res.windowWidth * 185 / 750 * 22 / 9
        })
      }
    });

    //动画循环
    // setInterval(function () {
    //   that.setData({
    //     reset: false
    //   })
    //   setTimeout(function(){
    //     that.setData({
    //       reset: true
    //     })
    //   }, 300);
    // }, 4000);

    that.getQuestions();   
  },

  spotAnimation: function(){
    spotTime = setInterval(function () {
      var spot = "";
      for (var i = 0; i < that.data.spot.length + 1; i++) {
        spot += ".";
      }
      that.setData({
        spot: spot
      })
      if (that.data.spot.length == 7) {
        that.setData({
          spot: ""
        })
      }
    }, 500);
  },

  //调用获取问题接口
  getQuestions: function(){
    console.log(that.data.userInfo)
    util.http("/qBank/getRandSpiritsBankList?mid=" + that.data.userInfo.mid, that.questionCallBack);
  },

  //获取问题回调
  questionCallBack: function(data){
    that.spotAnimation();
    console.log(data);
    that.setData({
      questionList: data.questions,
      questionData: data.questions[index],
      answerData: app.random(data.questions[index].correct.concat(data.questions[index].ans))
    });

    startAniTime = setInterval(function () {
      console.log(that.data.countNum);
      that.setData({
        countNum: that.data.countNum - 1
      });

      if (that.data.countNum == 0){
        that.setData({
          countNum: "GO"
        });
      }

      if (that.data.countNum == "GO"){
        setTimeout(function(){
          that.setData({
            challengeStatus: true,
            animationOutData: app.fadeAnimation(false).export(),
          })
          setTimeout(function () {
            that.setData({
              animationInData: app.fadeAnimation(true).export(),
              waitingStatus: false,
              countNum: 3,
              spot: ""
            });
          }, 1000);
          app.countDown("my_canvas_time", circleSize, lineWidth, 10, that.callBack);
        }, 1000);
        
        clearInterval(spotTime);
        clearInterval(startAniTime);
      }
    }, 1000);
  },

  callBack: function(){
    var answerArr = that.data.answerData;
    console.log(answerArr)
    for (var k = 0; k < answerArr.length; k++) {
      if (answerArr[k].name == that.data.questionData.ans[0]) {
        answerArr[k].select = 1;
      }
    }
    
    //获取音效按钮当前状态
    app.getStorage("switchCheck", function (res) {
      if (res.data){
        that.audioPlay(false);
      }
    }, function (res) {
      that.audioPlay(false);
    });
    
    that.setData({
      answerData: answerArr
    });
    setTimeout(function () {
      that.nextQuestion();
    }, 1000);
  },

  //下一题
  nextQuestion: function(){
    ableTap = true;
    app.clearTime(function(time){
      totalTime += time;
    });
    console.log(totalTime)
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

      app.getStorage("avatar", function(res){
        app.abilityMap("result_question", that.resultRandom(scoreArr, that.data.resultInfo), that.data.canvasWidth, that.data.windowWidth, res.data, Math.PI / 6);
      });
    
      var resultData = that.setGrade(parseInt((that.calcScore(scoreArr) / that.calcScore(queNum)) * 100));
      that.setData({
        grade: resultData.grade,
        text: resultData.text,//gradeText传的值
        score: resultData.score
      });

      util.httpPost("/qBank/upgradedSpiritsMember", function(res){
        var data = res.userInfo;
        data.rank = parseInt(data.rank);
        console.log(res);
        app.setStorage("userInfo", data);//把userInfo保存到本地
      }, {
        'mid': that.data.userInfo.mid,
        'result': scoreArr.join(","),
        'useTime': totalTime,
        'grade': that.data.grade,
        'gradeText': that.data.text,
        'score': that.data.score});

      return;
    }
    that.setData({
      idx: index,
      questionList: that.data.questionList,
      questionData: that.data.questionList[index],
      answerData: app.random(that.data.questionList[index].correct.concat(that.data.questionList[index].ans)),
    })
    app.countDown("my_canvas_time", circleSize, lineWidth, 10, that.callBack);
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
    if (ableTap){
      ableTap = false;
      console.log(event)
      var item = event.currentTarget.dataset.item;
      var idx = event.currentTarget.dataset.index;
      var answerArr = that.data.answerData;
      for (var k = 0; k < answerArr.length; k++) {
        if (answerArr[k].name == that.data.questionData.ans[0]) {
          answerArr[k].select = 1;
        }
      }
      if (item == that.data.questionData.ans[0]) {
        answerArr[idx].select = 1
        for (var i = 0, len = scoreArr.length; i < len; i++) {
          if (that.data.questionData.type == (i + 1)) {
            scoreArr[i] += 1;
          }
        }

        //获取音效按钮当前状态
        app.getStorage("switchCheck", function (res) {
          if (res.data) {
            that.audioPlay(true);
          }
        }, function (res) {
          that.audioPlay(true);
        });
      } else {
        answerArr[idx].select = 2;
        //获取音效按钮当前状态
        app.getStorage("switchCheck", function (res) {
          if (res.data) {
            that.audioPlay(false);
          }
        }, function (res) {
          that.audioPlay(false);
        });
      }
      that.setData({
        answerData: answerArr
      });
      app.clearTime(function(){});
      setTimeout(function () {
        that.nextQuestion();
      }, 1000);
    }
      
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

  //点击播放音效
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
    var rlt = {grade: "", text: "", score};
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
    rlt.text = result.text[parseInt(Math.random() * len)],
    rlt.score = result.score;
    return rlt;
  },

  //继续挑战
  continueQuestion: function(){
    index = 0;
    scoreArr = [0, 0, 0];//得分数组
    totalTime = 0;

    that.setData({
      waitingStatus: true,
      challengeResult: false,
      challengeStatus: false,
      idx: index,
      // questionList: postsData.question,//所有的问题和答案
      // questionData: postsData.question[index],//某一个的问题和答案
      // answerData: app.random(postsData.question[index].correct.concat(postsData.question[index].ans)),//答案
    })

    that.getQuestions();
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
    app.getStorage("userInfo", function (res) {
      that.setData({
        userInfo: res.data
      })
    }, function (res) {

    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("hide question")
    app.clearTime(function(){});
    clearInterval(spotTime);
    clearInterval(startAniTime);
    startAniTime = null;
    spotTime = null;
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("unload quesiton")
    app.clearTime(function(){});
    clearInterval(spotTime);
    clearInterval(startAniTime);
    startAniTime = null;
    spotTime = null;
  },

  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function (res) {
    console.log(res);
    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
    }
    return {
      title: '章鱼答答堂',
      path: '/pages/index/index?mid=' + that.data.userInfo.mid,
      success: function (res) {
        // 转发成功
        console.log(res);
        // 转发成功
        console.log(res.shareTickets[0])
        // console.log
        wx.getShareInfo({
          shareTicket: res.shareTickets[0],
          success: function (res) { console.log(res) },
          fail: function (res) { console.log(res) },
          complete: function (res) { console.log(res) }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})