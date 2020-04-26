// pages/popular/popular.js
const app = getApp()

Page({
  data: {
    scrollTop: 0,
    toUrl: "../../pages/details/details",
    imgList: [],//传递给瀑布图组件的数据
    pageNo: 1
  },
  //不进行搜索时发送的请求
  queryAllData: function(){
    let _this = this
    getApp().request({ 
      url: "/api/applets/content/pageQueryAdvice",
      method: "POST",
      data: {
        pageSize: 10,
        pageNo: this.data.pageNo
      }
    }).then(res => {
      if(res.data.data.nextPage == 0){
        wx.showToast({
          title: '没有更多数据',
          duration: 2000
        })
        return "over"
      }else{
      _this.setData({
        imgList: res.data.data.list,
        pageNo: res.data.data.nextPage
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
  //页面滚动获取数据
  scrollToLower: function(){
    this.queryAllData()
  },
  onLoad: function () {
    this.queryAllData()
  }
})