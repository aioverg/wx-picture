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
        getApp().request({ 
          url: "/api/applets/content/operate/" + this.properties.imgData[this.properties.imgIndex].id,
          method: "POST",
          data: {
            type: "collect"
          }
        })
      }else{
        this.setData({
          select: 0,
          heart: this.data.heartOne
        })
        getApp().request({ 
          url: "/api/applets/content/operate/" + this.properties.imgData[this.properties.imgIndex].id,
          method: "POST",
          data: {
            type: "cancel_collect"
          }
        })
      }
    },
    ready: function(){
      this.refresh()
    },
    refresh: function(){
      //console.log(000,this.properties.imgData[this.properties.imgIndex])
      if(!this.properties.imgData[this.properties.imgIndex].ifFavorite){
        //console.log(000,this.properties.imgData[this.properties.imgIndex].ifFavorite)
        this.setData({
          select: 0,
          heart: this.data.heartOne
        })
      }else{
        //console.log(111,this.properties.imgData[this.properties.imgIndex].ifFavorite)
        this.setData({
          select: 1,
          heart: this.data.heartTwo
        })
      }
    }
  }
})
