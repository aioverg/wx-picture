// components/waterFall/waterFall.js
let leftHeight = 0;
let rightHeight = 0;
let queryDom;
Component({
  //组件的属性列表
  properties: {
    imgList: {
      type: Array,
      value: null
    },
    toUrl: {
      type: String,
      value: null
    }
  },

  //组件的初始数据
  data: {
    maxHeight: null,
    leftList: [], //左列数据
    rightList: [], //右列数据
    dataList: [] //全部数据
  },

  //组件的方法列表
  methods: {
    //跳转到详情页面，并将图片ID传送给详情页
    toDetails: function(e){
      //let imgCollectionData = e.currentTarget.dataset.collectiondata
      wx.navigateTo({
        url: this.properties.toUrl + "?id="+ e.currentTarget.dataset.imgcollectiondata.id,
      })
    },
    //获取左右两边的图片列表高度
    getBothHeight: function(leftList, rightList){
      queryDom = wx.createSelectorQuery().in(this) //创建组件dom对象
      return new Promise((resolve, reject) => {
        this.setData({leftList, rightList}, ()=>{
          queryDom.select('#left').boundingClientRect()
          queryDom.select('#right').boundingClientRect()
          queryDom.exec((res) => {
            leftHeight = Number.parseInt(res[0].height); //获取左边列表的高度
            rightHeight = Number.parseInt(res[1].height); //获取右边列表的高度
            console.log(leftHeight, rightHeight)
            this.setData({
              maxHeight: leftHeight >= rightHeight ? leftHeight-20 : rightHeight-20
            })
            resolve();
          })
        })
      })
    },
    //根据图片列表的高度选择将图片放在哪一列
    getBothList: async function(){
      this.setData({
        dataList: this.properties.imgList
      })
      let { dataList, leftList, rightList } = this.data
      for(let img of dataList){
        leftHeight <= rightHeight ? leftList.push(img) : rightList.push(img)
        await this.getBothHeight(leftList, rightList);
      }
    },
    //清空数据
    clearBothList: function(){
      this.setData({
        leftList: [],
        rightList: []
      })
    }
  }
})
