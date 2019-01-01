
Page({


  data: {
    loadingHide: true,
    loadingText: "加载中"
  },
  callmeTap: function () {
    wx.makePhoneCall({
      phoneNumber: '0351-7171839'
    })
  },

  onLoad: function (options) {
    var that = this;
    that.setData({ loadingHide: false });
    setTimeout(function () {
      that.setData({ loadingHide: true });
    }, 1000)
  }
})