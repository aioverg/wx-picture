// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgId: null,
    imgUrl: null,
    imgList: [],
    allImgList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptImgId', function(res) {
      console.log(res)
      _this.setData({
        imgId: res.id,
        imgUrl: res.url,
      })
    })
    getApp().request({
      url: "/api/applets/content/relatedResourceQuery",
      method: "POST",
      data: {
        contentId: this.data.imgId,
        limit: 8
      }
    }).then(res => {
      res.data.data.contents.forEach(value => this.data.allImgList.push(value))
      this.setData({
        imgList: this.data.allImgList
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
  onShareAppMessage: function () {

  }
})