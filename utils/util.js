// var server = "http://test.aihuawen.com";
var wxServer = "https://api.weixin.qq.com";
var server = "http://192.168.0.149:8080"

function convertToStarsArray(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

function wxHttp(url, callBack) {
  wx.request({
    url: wxServer + url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function wxHttpPost(url, callBack) {
  wx.request({
    url: server + url,
    method: 'POST',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function http(url, callBack, resData) {
  if (resData == null){
    resData = {}
  };
  wx.request({
    url: server + url,
    method: 'GET',
    data: resData,
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function httpPost(url, callBack, resData) {
  if (resData == null){
    resData = {}
  };
  wx.request({
    url: server + url,
    method: 'POST',
    data: resData,
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString:convertToCastString,
  convertToCastInfos:convertToCastInfos,
  server: server,
  httpPost: httpPost,
  wxHttp: wxHttp,
  wxHttpPost: wxHttpPost
}