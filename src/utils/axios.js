import encode from './encode'

let axios = {}
let domain = 'https://yj.kiy.cn'

// domain = 'http://192.168.30.37:9898'

axios.domain = domain

axios.getQrCode = (options) => new Promise((resolve, reject) => {
  const strUrl = options.url + '&scene=' + options.scene;
  wx.request({
    url: domain + '/WeChat/GetLoginQRCode?page=' + strUrl,
    method: 'post',
    data: {},
    success: res => {
      var RES = res.data
      if (RES.success) {
        resolve(RES.data)
      } else {
        wx.showToast({
          title: RES.msg,
          icon: 'none'
        })
      }

    },
    fail: res => {
      reject(res)
    }
  })
})

axios.getApiData = (options) => new Promise((resolve, reject) => {
  var param = options.data
  var strUrl = options.url + '?'
  for (var key in param) {
    strUrl += key + '=' + param[key] + '&'
  }
  var data = {
    url: strUrl,
    method: options.type || 'get'
  }
  wx.request({
    url: domain + '/Home/post',
    method: 'post',
    data: data,
    success: res => {
      resolve(res.data)
    },
    fail: res => {
      reject(res)
    }
  })
})

axios.postApiData = (options) => new Promise((resolve, reject) => {
  wx.request({
    url: domain + options.url,
    method: options.method || 'POST',
    data: options.data,
    success: res => {
      resolve(res.data)
    },
    fail: res => {
      reject(res)
    }
  })
})

axios.getAjaxData = (param, strMethod, uid) => new Promise((resolve, reject) => {
  if (strMethod) {
    const paramData = Object.assign(param, {
      strMethod: strMethod
    })
  }
  const data = Object.assign({
    uid: uid || '217141a5-01d0-4696-9500-ae2d82a8cb4c'
  }, {
    param: param || paramData
  })
  const en = encode(JSON.stringify(data))
  wx.request({
    url: domain + '/Mobile/GetData/GetAjaxData',
    method: 'POST',
    data: {
      data: en
    },
    success: res => {
      try {
        if (res.data.success) {
          resolve(res.data.data)
        } else if (res.data.map.result === 'ok') {
          resolve(res.data.map)
        } else {
          wx.showToast({
            title: res.data.msg ? res.data.msg : res.data.map.errMsg,
            icon: 'none'
          })
          reject(res.data)
        }
      } catch (error) {
        wx.showToast({
          title: '网络异常',
          icon: 'none'
        })

      }
    },
    fail: res => {
      wx.showToast({
        title: '服务器维护,请稍等',
        icon: 'none'
      })
      reject(res)
    }
  })
})

export default axios
