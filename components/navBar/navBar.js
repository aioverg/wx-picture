// components/navBar/navBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    datas: [
      {
        "index": 0,
        "title": "主页",
        "pagePath": "../../pages/index/index",
        "iconPath": "../../icons/index-1.png",
        "selectedIconPath": "../../icons/index-2.png"
      },
      {
        "index": 1,
        "title": "热门",
        "pagePath": "../../pages/popular/popular",
        "iconPath": "../../icons/popular-1.png",
        "selectedIconPath": "../../icons/popular-2.png"
      },
      {
        "index": 2,
        "title": "推荐",
        "pagePath": "../../pages/recommend/recommend",
        "iconPath": "../../icons/recommend-1.png",
        "selectedIconPath": "../../icons/recommend-2.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //跳转到详情页面，并将图片ID传送给详情页
    skip: function(e){
      wx.navigateTo({
        url: e.currentTarget.dataset.pagepath
        /*success: function(res){
          res.eventChannel.emit('acceptImgId', {
            imgCollectionData: e.currentTarget.dataset.imgcollectiondata
          })
        }*/
      })
    }
  }
})
