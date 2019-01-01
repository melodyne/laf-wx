var url = "https://bbs.bcb5.com/shiwu/";
var page = 0;
var page_size = 5; 
var GetList = function (that) {
  var activeIndex = that.data.activeIndex;
  that.setData({
    hidden: false
  });
  wx.showNavigationBarLoading();
  wx.request({
    url: url + 'index/rid/' + activeIndex,
    data: {
      page: page,
      page_size: page_size
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var list = that.data.list;
      var whdthNum = res.data;
      if (whdthNum == 0) {
        that.setData({
          ShdthNum: whdthNum
        });
      }
      if (res.data != 0){
        for (var i = 0; i < res.data.length; i++) {
          list.push(res.data[i]);
        }
        setTimeout(function () {
          that.setData({
            list: list
          });
        }, 300)
        page++;
        setTimeout(function () {
          that.setData({
            hidden: true
          });
        }, 4000)
      }else{
        that.setData({
          hidden: true,
          display: false
        });
      }
    },
    complete: function () {
      wx.hideNavigationBarLoading(); 
      wx.stopPullDownRefresh();
    }
  })
}
Page({
  data: {
    picUrl: "https://bbs.bcb5.com/",
    hidden: true,
    list: [],
    scrollTop: 0,
    tabs: ["丢失的物品", "捡到的物品"],
    activeIndex: 0,
    ShdthNum: 1,
    display: true
  },
  onLoad: function () {

  },
  onShow: function () {
    var that = this;
    var ShdthNum = that.data.ShdthNum;
    if (ShdthNum == 1){
      GetList(that);
    }
    
  },

  onReachBottom: function (e) {
    var that = this;
    var ShdthNum = that.data.ShdthNum;
    if (ShdthNum != 0){
      GetList(that);
    }
  },

  tabClick: function (e) {
    page = 0;
    this.setData({
      list: [],
      activeIndex: e.currentTarget.id,
      ShdthNum: 1,
      display: true
    });
    GetList(this)
  },

  onShareAppMessage: function () {
    var that = this;
    var picUrl = that.data.picUrl;
    return {
      title: '来看看大家都捡到了什么【太原】',
      path: '/pages/index/index'
    }
  }
})
