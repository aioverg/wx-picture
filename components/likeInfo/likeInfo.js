// components/likeInfo/likeInfo.js
Component({
  /**
   * 组件的属性列表
   */
  /**
   * 组件的初始数据
   */
  data: {
    select: 0,
    imgData: null,
    heart: "../../icons/heart-1.png",
    heartOne: "../../icons/heart-1.png",
    heartTwo: "../../icons/heart-2.png"
  },
  properties: {
    select: {
      type: Boolean,
      value: []
    },
    imgId: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    collect: function () {
      this.triggerEvent('collect')
    }
  },
  observers: {
    "select": function () {
      console.log(9999999999)
      if (!this.properties.select) {
        this.setData({
          heart: this.data.heartOne
        })
      } else {
        this.setData({
          heart: this.data.heartTwo
        })
      }
    }
  }
})