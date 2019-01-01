function request(url, params, success, fail) {
  this.requestLoading(url, params, "", success, fail)
}
function requestLoading(url, params, message, success, fail) {
  //console.log(params)
  wx.showNavigationBarLoading()
  if (message != "") {
    wx.showLoading({
      title: message,
    })
  }
  wx.request({
    url: url,
    data: params,
    header: {
      //'Content-Type': 'application/json'
      'content-type': 'application/x-www-form-urlencoded'
    },
    method: 'POST',
    success: function (res) {
      //console.log(res.data)
      wx.hideNavigationBarLoading()
      if (res.data != 0){      

        if (res.statusCode == 200) {
          success(res.data)
        } else {
          fail()
        }
      }
      if (message != "") {
        wx.hideLoading()
      }

    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      if (message != "") {
        wx.hideLoading()
      }
      fail()
    },
    complete: function (res) {
      wx.stopPullDownRefresh();
    },
  })
}
module.exports = {
  request: request,
  requestLoading: requestLoading,
}