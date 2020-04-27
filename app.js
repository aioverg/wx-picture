//app.js
App({
  request: (params) => {
    const baseUrl = "https://affiliater.zone" ////"http://192.168.3.44:8080"
    return new Promise((resolve, reject) => {
      wx.request({
        ...params,
        url: baseUrl + params.url,
        header: {security_token: getApp().globalData.openId},
        success: (result) => {
          resolve(result)
        },
        fail: (error) => {
          reject(error)
        }
      })
    })
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success (res) {
        const _this = this
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://affiliater.zone/api/applets/user/login',//"http://192.168.3.44:8080/api/applets/user/login",
            method: "POST",
            data: {
              resCode: res.code
            },
            success (res) {
              getApp().globalData.openId = res.data.data.token
            },
            fail(res){console.log(res)}
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openId: null
  }
  
})