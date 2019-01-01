
Page({

  data: {
    loadingHide: true,
    loadingText: "加载中"
  },

  onLoad: function (options) {
    var that = this;
    that.setData({ loadingHide: false });
    setTimeout(function () {
      that.setData({ loadingHide: true });
    }, 1000)
  }
})