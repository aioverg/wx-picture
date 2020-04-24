//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false,
    scrollTop: 0,
    toUrl: "../../pages/details/details",
    queryValue: "",
    imgList: [],//传递给瀑布图组件的数据
    allImgList: [],
    queryImgList: [],
    lastId: null
  },
  //不进行搜索时发送的请求
  queryAllData: function(){
    let _this = this
    getApp().request({ 
      url: "/api/applets/content/travelQuery",
      method: "POST",
      data: {
        limit: 10,
        lastId: this.data.lastId
      }
    }).then(res => {
      if(res.data.data.contents.length == 0){
        _this.setData({
          show: true
        })
        return "over"
      }else{
      res.data.data.contents.forEach(value => _this.data.allImgList.push(value))
      _this.setData({
        imgList: _this.data.allImgList,
        lastId: res.data.data.lastId
      })
      return "run"
    }
    }).then((res) => {
      if(res == "run"){
        this.selectComponent("#water-fall").getBothList()
      }else{
        return
      }
    })
  },
  //搜索时发送的请求
  querySearch: function(){
    let _this = this
    getApp().request({ 
      url: "/api/applets/content/travelQuery",
      data: {
        keywords: this.data.queryValue,
        limit: 10,
        lastId: this.data.lastId
      }
    }).then(res => {
      res.data.data.contents.forEach(value => _this.data.allImgList.push(value))
      _this.setData({
        imgList: _this.data.queryImgList,
        lastId: res.data.data.lastId
      })
      return Promise.resolve()
    }).then(()=>this.selectComponent("#water-fall").getBothList())
  },
  //判断是否进行搜索
  setQueryValue: function(e){
    if(e.detail.value.length !== 0){
      this.setData({
        queryValue: e.detail.value,
        scrollTop: 0,
        lastId: null,
        imgList: [],
        allImgList: [],
        queryImgList: []
      })
      this.selectComponent("#water-fall").clearBothList()
      this.querySearch()
    }else{
      this.setData({
        queryValue: "",
        scrollTop: 0,
        lastId: null,
        imgList: [],
        allImgList: [],
        queryImgList: []
      })
      this.selectComponent("#water-fall").clearBothList()
      this.queryAllData()
    }
  },
  //页面滚动获取数据
  scrollToLower: function(){
    if(this.data.queryValue == ""){
      this.queryAllData()
    }else{
      this.querySearch()
    }
  },
  //事件处理函数
  bindViewTap: function() {
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
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
