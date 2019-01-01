const API_URL = 'https://bbs.bcb5.com/shiwu/';
Page({
  data: {
    picUrl: "https://bbs.bcb5.com/",
    openid: null,
    items: [],
    startX: 0, 
    startY: 0,
    tabs: ["丢失信息", "捡到信息"],
    activeIndex: 0
  },

  onLoad: function (e) {
    var that = this;
    var activeIndex = that.data.activeIndex;
    if (activeIndex){
      var openid = e;
    }else{
      var openid = e.openid;
    }
    wx.showNavigationBarLoading(); 
    wx.request({
      url: API_URL + 'userMore/openid/' + openid + '/activeIndex/' + activeIndex,
      data: '',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var datas = res.data;
        if(datas == 0){
          wx.navigateTo({
            url: '../mobile/mobile',
          })
        }else{
          for (var i = 0; i < 10; i++) {
            that.data.items.push({
              isTouchMove: false 
            })
          }
          that.setData({
            items: res.data,
            openid: openid
          })
        }
      },
      complete: function () {
        wx.hideNavigationBarLoading(); 
      },
    })
  },
  touchstart: function (e) {
    this.data.items.forEach(function (v, i) {
      if (v.isTouchMove)
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      items: this.data.items
    })
  },
  touchmove: function (e) {
    var that = this,
      index = e.currentTarget.dataset.index,
      startX = that.data.startX,
      startY = that.data.startY,
      touchMoveX = e.changedTouches[0].clientX,
      touchMoveY = e.changedTouches[0].clientY,
      angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
    that.data.items.forEach(function (v, i) {
      v.isTouchMove = false
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) 
          v.isTouchMove = false
        else 
          v.isTouchMove = true
      }
    })
    that.setData({
      items: that.data.items
    })
  },

  angle: function (start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  
  del: function (e) {
    var that = this;
    var txtId = e.currentTarget.dataset.id;
    that.data.items.splice(e.currentTarget.dataset.index, 1)
    wx.request({
      url: API_URL + 'delTxt/id/' + txtId,
      data: '',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.clearData();
        wx.showToast({
          title: '已删除',
          icon: 'success',
          duration: 2000
        })
        that.setData({
          items: that.data.items
        })
      }
    })

  },
  clearData: function () {
    var that = this;
    var openid = that.data.openid;
    wx.request({
      url: API_URL + 'userMore/openid/' + openid,
      data: '',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          views: res.data,
          openid: openid
        });
      },
      complete: function () {
        wx.hideNavigationBarLoading(); 
      },
    })


  },

  tabClick: function (e) {
    var openid = e.currentTarget.dataset.opid;
    this.setData({
      activeIndex: e.currentTarget.id,
      items: []
    });
    this.onLoad(openid);
  }

})