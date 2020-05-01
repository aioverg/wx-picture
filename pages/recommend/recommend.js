// pages/popular/popular.js
const app = getApp()

Page({
  data: {
    scrollTop: 0,
    toUrl: "../../pages/details/details",
    loading: true,
    over: true,
    imgList: [],//传递给瀑布图组件的数据
    pageNo: 1
  },
  //不进行搜索时发送的请求
  queryAllData: function(){
    let _this = this
    if(this.data.pageNo == 0){
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
      url: "/api/applets/content/pageQueryAdvice",
      method: "POST",
      data: {
        pageSize: 10,
        pageNo: this.data.pageNo
      }
    }).then(res => {
      _this.setData({
        loading: true,
        imgList: res.data.data.list,
        pageNo: res.data.data.nextPage
      })
      return "run"
    }).then(res => {
      if(res == "run"){
        this.selectComponent("#water-fall").getBothList()
      }
    })
  },
  backTop: function (e) { //回到顶部
    this.setData({
      scrollTop: 0
    })
  },
  //页面滚动获取数据
  scrollToLower: function(){
    this.queryAllData()
  },
  onLoad: function () {
    this.queryAllData()
  }
})