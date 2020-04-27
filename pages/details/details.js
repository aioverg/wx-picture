// pages/details/details.js
let imgHeightList = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgCoverData: null,
    imgCoverId: null,
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
    this.getImgCoverData()
    this.getImgCollectionData(this.data.imgCoverData)
    this.getRecommendImgData(this.data.imgCoverData)
  },
  scrollToLower: function () {//监听滚动条
    this.getRecommendImgData(this.data.imgCoverData)
  },

/*>>>>>>>>>>>>>>>>>>>>>自定义方法<<<<<<<<<<<<<<<<<<<<<<*/
  getImgCoverData: function () {//接受传过来的图集封面信息
    const _this = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptImgId', function (res) {
      _this.setData({
        imgCoverData: res.imgCollectionData
      })
    })
  },
  getImgCollectionData: function (imgCoverData) { //根据图集封面数据获取整个图集
    imgHeightList = []
    if (imgCoverData.collectionId == 0) {
      this.setData({
        imgCollectionList: [imgCoverData],
      })
    } else {
      getApp().request({
        url: "/api/applets/contentCollection/" + imgCoverData.collectionId
      }).then(res => {
        let index = res.data.data.contents.findIndex(value => value.id == imgCoverData.id)
        res.data.data.contents.splice(index, 1)
        res.data.data.contents.unshift(imgCoverData)
        this.setData({
          imgCollectionList: res.data.data.contents
        })
      })
    }
  },

  clickNum: function () { //统计图片点击
    getApp().request({
      url: "/api/applets/content/" + this.data.imgCover.id
    })
  },
  getRecommendImgData: function (imgCoverData) { //根据图集封面数据获取推荐图片
    getApp().request({
      url: "/api/applets/content/pageQueryRelateContent",
      method: "POST",
      data: {
        contentId: imgCoverData.id,
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
        this.setData({
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
  backTop: function (e) { //回到顶部
    this.setData({
      scrollTop: 0
    })
  },
/*>>>>>>>>>>>>>>>>>>>>>自定义方法<<<<<<<<<<<<<<<<<<<<<<*/

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