// components/likeInfo/likeInfo.js
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
    select: 0,
    heart: "../../icons/heart-1.png",
    heartOne: "../../icons/heart-1.png",
    heartTwo: "../../icons/heart-2.png"
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
        
      }else{
        this.setData({
          select: 0,
          heart: this.data.heartOne
        })
      }
    }
  }
})
