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
    imgsHeight: [],
    current: 0
  },
  imageLoad: function(e) {
    // 获取图片宽高比
    let ratio = e.detail.width / e.detail.height
    // 按照宽高比计算图片宽度 100% 时的高度
    imgHeightList[e.target.dataset.id] = 712.5 / ratio
    this.setData({
      imgsHeight: imgHeightList
    })
  },
  bindchange: function(e) {
    this.setData({
      current: e.detail.current
    })
    this.selectComponent("#like-info").refresh()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    })
    const _this = this
    imgHeightList = []
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptImgId', function(res) {
      _this.setData({
        imgCover: res.imgCollectionData
      })
      if(res.imgCollectionData.collectionId == 0){
        _this.setData({
          imgCollectionList: [res.imgCollectionData],
        })
      }else{
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
    getApp().request({
      url: "/api/applets/content/" + this.data.imgCover.id
    })
    getApp().request({
      url: "/api/applets/content/relatedResourceQuery",
      method: "POST",
      data: {
        contentId: this.data.imgCover.id,
        limit: 8
      }
    }).then(res => {
      this.setData({
        imgList: res.data.data.contents
      })
      return Promise.resolve()
    }).then(()=>this.selectComponent("#water-fall").getBothList())
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res){
    if( res.from == 'button' ){
      getApp().request({
        url: "/api/applets/content/operate/" + this.data.imgCollectionList[this.data.current].id,
        method: "POST"
      })
    }
    return {
      title: '蚂蚁看图',
      path: '/pages/details/details',
    }
  }
})