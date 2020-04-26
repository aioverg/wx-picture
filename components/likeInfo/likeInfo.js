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
    imgData: {
      type: Array,
      value: []
    },
    imgIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    select: function(e){
      if(this.data.select == 0){
        this.setData({
          select: 1,
          heart: this.data.heartTwo
        })
        /*getApp().request({ 
          url: "/api/applets/content/operate/" + this.properties.imgData[this.properties.imgIndex].id,
          method: "POST",
          data: {
            userId: null
          }
        })
        */
      }else{
        this.setData({
          select: 0,
          heart: this.data.heartOne
        })
        /*getApp().request({ 
          url: "/api/applets/content/operate/" + this.properties.imgData[this.properties.imgIndex].id,
          method: "POST",
          data: {
            userId: null
          }
        })
        */
      }
    },
    refresh: function(){
      this.setData({
        select: 0,
        heart: this.data.heartOne
      })
    }
  }
})
