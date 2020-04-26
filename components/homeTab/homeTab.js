// components/homeTab/homeTab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    toUrl: {
      type: String,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    iconPath: "../../icons/index-1.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    skip: function(){
      wx.switchTab({
        url: this.properties.toUrl,
      })
    }
  }
})
