// components/waterFall/waterFall.js
let leftHeight = 0;
let rightHeight = 0;
let queryDom;
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
    list: [
      {
        id: "1",
        url: "https://api-hmugo-web.itheima.net/full/ff4053cad62fb77359083d642ce53d3583b0da1e.jpg"
      },
      {
        id: 2,
        url: "https://api-hmugo-web.itheima.net/full/e2da8d14f735eea48763a6abc6f04f794b25f6fb.jpg"
      },
      {
        id: "3",
        url: "https://api-hmugo-web.itheima.net/full/a5a0ba5eb45b20a3865755a4fa71ad87924b7bdf.jpg"
      }
    ],
    leftList: [],
    rightList: [],
    imgList: [],
    oldImgList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //跳转到详情页面
    toDetails: function(e){
      let imgId = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '../../pages/details/details',
        success: function(res){
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: imgId })
        }
      })
    },
    getBothHeight: function(leftList, rightList){
      queryDom = wx.createSelectorQuery().in(this) //创建组件dom对象
      return new Promise((resolve, reject) => {
        this.setData({leftList, rightList}, ()=>{
          queryDom.select('#left').boundingClientRect()
          queryDom.select('#right').boundingClientRect()
          queryDom.exec((res) => {
            leftHeight = res[0].height; //获取左边列表的高度
            rightHeight = res[1].height; //获取右边列表的高度
            resolve();
          })
        })
      })
    },
    getBothList: async function(){
      let { list, leftList, rightList } = this.data
      for(let img of this.data.imgList){
        leftHeight <= rightHeight ? leftList.push(img) : rightList.push(img)
        await this.getBothHeight(leftList, rightList);
      }
    },
    queryImgData: function(){
      let _this = this
      getApp().request({ url: "/api/public/v1/categories"}).then(res => {
        //_this.data.oldImgList.push(res.data.message[17].children[1].children)
        res.data.message[17].children[1].children.forEach(value => _this.data.oldImgList.push(value))
        _this.setData({
          imgList: _this.data.oldImgList
        })
        return Promise.resolve()
      }).then(()=>this.getBothList())
    }

  },
  attached: function(){this.queryImgData()},
})
