//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    scrollTop: 0,
    toUrl: "../../pages/details/details",
    queryValue: "",
    imgList: [], //传递给瀑布图组件的数据
    pageNo: 1
  },
  query: function (obj) {
    let _this = this
    if (this.data.pageNo == 0) {
      wx.showToast({
        title: '没有更多数据',
        duration: 1500
      })
      return "over"
    }
    getApp().request({
      url: obj.url,
      method: obj.method,
      data: {
        keywords: obj.keywords,
        pageSize: obj.pageSize,
        pageNo: obj.pageNo
      }
    }).then(res => {

      _this.setData({
        imgList: res.data.data.list,
        pageNo: res.data.data.nextPage
      })
      return "run"
    }).then((res) => {
      if (res == "run") {
        this.selectComponent("#water-fall").getBothList()
      }
    })
  },

  queryAllData: function () { //全部数据
    this.query({
      url: "/api/applets/content/pageQueryPopular",
      method: "POST",
      pageSize: 10,
      pageNo: this.data.pageNo
    })
  },

  querySearch: function () { //搜索时发送的请求
    this.query({
      url: "/api/applets/content/pageQueryPopular",
      keywords: this.data.queryValue,
      method: "POST",
      pageSize: 10,
      pageNo: this.data.pageNo
    })
  },
  //判断是否进行搜索
  setQueryValue: function (e) {
    if (e.detail.value.length !== 0) {
      this.setData({
        queryValue: e.detail.value,
        scrollTop: 0,
        imgList: [],
      })
      this.selectComponent("#water-fall").clearBothList()
      this.querySearch()
    } else {
      this.setData({
        queryValue: "",
        scrollTop: 0,
        imgList: [],
      })
      this.selectComponent("#water-fall").clearBothList()
      this.queryAllData()
    }
  },
  //页面滚动获取数据
  scrollToLower: function () {
    if (this.data.queryValue == "") {
      this.queryAllData()
    } else {
      this.querySearch()
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.queryAllData()
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})