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
    inUserInfo: (state) => {
      const obj = state
      obj.userInfo = wx.getStorageSync('userInfo') || {}
    },
    inWxInfo: (state) => {
      const obj = state
      
    },
    inOpenId: (state) => {
      const obj = state
      obj.openId = wx.getStorageSync('openId') || ''
    },
    inSendBtn: (state) => {
      const obj = state
      obj.inSendBtn = wx.getStorageSync('sendBtnShow') || false
    }
  }
})

export default store
