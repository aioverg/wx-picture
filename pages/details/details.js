// pages/details/details.js
let imgHeightList = []
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgCoverData: null,
    shareImgCovergData: null,
    like: false,
    toUrl: "../../pages/details/details",
    toHome: "../../pages/index/index",
    loading: true,
    over: true,
    imgCollectionList: null,
    imgList: [],
    pageNo: 1,
    imgsHeight: [],
    current: 0,
    scrollTop: 0,
    select: true
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
    this.like()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getApp().request({
      url: "/api/applets/content/" + options.id
    }).then(res => {
      this.setData({
        imgCoverId: res.data.data.id
      })
      this.putImgType({ //发送图片被点击
        id: res.data.data.id,
        type: "click"
      })
      this.getImgCollectionData(res.data.data)
      this.getRecommendImgData(res.data.data)
    })
  },
  scrollToLower: function () { //监听滚动条
    this.getRecommendImgData(this.data.imgCoverData)
  },

  /*>>>>>>>>>>>>>>>>>>>>>自定义方法--开始<<<<<<<<<<<<<<<<<<<<<<*/
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
        this.setData({
          imgCollectionList: res.data.data.contents,
          current: index
        })
        this.like()
      })
    }
  },
  getRecommendImgData: function (imgCoverData) { //根据图集封面数据获取推荐图片
    if (this.data.pageNo == 0) {
      this.setData({
        loading: true,
        over: false
      })
      return "over"
    }
    this.setData({
      loading: false
    })
    getApp().request({
      url: "/api/applets/content/pageQueryRelateContent",
      method: "POST",
      data: {
        contentId: imgCoverData.id,
        pageNo: this.data.pageNo,
        pageSize: 8
      }
    }).then(res => {
      this.setData({
        loading: true,
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
  putImgType: function(obj){//发送内容收藏分享点击
    getApp().request({
      url: "/api/applets/content/operate/" + obj.id,
      method: "POST",
      data: {
        type: obj.type
      }
    })
  },
  collect: function(){
    this.data.imgCollectionList[this.data.current].ifFavorite = !this.data.imgCollectionList[this.data.current].ifFavorite
    this.like()
    if(this.data.imgCollectionList[this.data.current].ifFavorite){
      this.putImgType({
        id: this.data.imgCollectionList[this.data.current].id,
        type: "collect"
      })
    }else{
      this.putImgType({
        id: this.data.imgCollectionList[this.data.current].id,
        type: "cancel_collect"
      })
    }
  },
  like: function(){
    this.setData({
      select: this.data.imgCollectionList[this.data.current].ifFavorite
    })
  },
  backTop: function (e) { //回到顶部
    this.setData({
      scrollTop: 0
    })
  },
  /*>>>>>>>>>>>>>>>>>>>>>自定义方法--结束<<<<<<<<<<<<<<<<<<<<<<*/

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
        method: "POST",
        data: {
          type: "share"
        }
      })
    }
    return {
      title: '蚂蚁看图',
      path: '/pages/details/details?id=' + this.data.imgCollectionList[this.data.current].id
    }
  }
})