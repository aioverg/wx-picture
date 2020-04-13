// components/WaterPlot/WaterPlot.js
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
    imgList: [2]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  created: function(){
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata', 
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success (res) {
        console.log(res.data)
      }
    })
  }
})
