// pages/details/details.js
let imgHeightList = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgCover: null,
    like: false,
    toUrl: "../../pages/details/details",
    toHome: "../../pages/index/index",
    imgCollectionList: null,
    imgList: [],
    pageNo: 1,
    imgsHeight: [],
    current: 0,
    scrollTop: 0
  },
  imageLoad: function (e) {
    // 获取图片宽高比
    let ratio = e.detail.width / e.detail.height
    // 按照宽高比计算图片宽度 100% 时的高度
    imgHeightList[e.target.dataset.id] = 712.5 / ratio
    this.setData({
      imgsHeight: imgHeightList
    })
  },
  bindchange: function (e) {
    this.setData({
      current: e.detail.current
    })
    this.selectComponent("#like-info").refresh()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getImgCollectionData()
  },
  getImgCollectionData: function () { //获取轮播图片
    const _this = this
    imgHeightList = []
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptImgId', function (res) {
      _this.setData({
        imgCover: res.imgCollectionData
      })
      _this.recommend()
      _this.clickNum()
      if (res.imgCollectionData.collectionId == 0) {
        _this.setData({
          imgCollectionList: [res.imgCollectionData],
        })
      } else {
        getApp().request({
          url: "/api/applets/contentCollection/" + res.imgCollectionData.collectionId
        }).then(res => {
          let index = res.data.data.contents.findIndex(value => value.id == _this.data.imgCover.id)
          res.data.data.contents.splice(index, 1)
          res.data.data.contents.unshift(_this.data.imgCover)
          _this.setData({
            imgCollectionList: res.data.data.contents
          })
        })
      }
    })
  },
  //页面滚动获取数据
  scrollToLower: function () {
    this.recommend()
  },
  clickNum: function () { //统计图片点击
    getApp().request({
      url: "/api/applets/content/" + this.data.imgCover.id
    })
  },
  recommend: function () { //推荐图片
    const _this = this
    getApp().request({
      url: "/api/applets/content/pageQueryRelateContent",
      method: "POST",
      data: {
        contentId: this.data.imgCover.id,
        pageNo: this.data.pageNo,
        pageSize: 8
      }
    }).then(res => {
      if (res.data.data.nextPage == 0 || !res.data.data.nextPage) {
        wx.showToast({
          title: '没有更多数据',
          duration: 1500
        })
        return "over"
      } else {
        _this.setData({
          imgList: res.data.data.list,
          pageNo: res.data.data.nextPage
        })
        return "run"
      }
    }).then((res) => {
      if (res == "run") {
        this.selectComponent("#water-fall").getBothList()
      } else {
        return
      }
    })
  },
  backTop: function(e){
    this.setData({
      scrollTop: 0
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    /*wx.showToast({
      title: '没有更多数据',
      duration: 2000
    })
    */
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from == 'button') {
      getApp().request({
        url: "/api/applets/content/operate/" + this.data.imgCollectionList[this.data.current].id,
        method: "POST"
      })
    }
    return {
      title: '蚂蚁看图',
      path: '/pages/details/details'
    }
  }
})