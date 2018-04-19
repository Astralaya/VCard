// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    wxInfo: null,
    userInfo: {},
    openId: '',
    appId: '',
    sendBtnShow: false
  },
  mutations: {
    inUserInfo: (state , data) => {
      const obj = state
      if(data != '' && data != undefined) {
        wx.setStorageSync("userInfo", data);
      }
      obj.userInfo = data || wx.getStorageSync('userInfo')
    },
    inWxInfo: (state) => {
      const obj = state
      
    },
    inOpenId: (state , data) => {
      const obj = state
      if(data != '' && data != undefined) {
        wx.setStorageSync("openId", data);
      }
      obj.openId = data || wx.getStorageSync('openId')
    },
    inSendBtn: (state , data ) => {
      const obj = state
      obj.inSendBtn = data
    }
  }
})

export default store
