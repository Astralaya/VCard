import Vue from 'vue'
import App from './App'

import './common/css/app.css'
import '../static/weui/weui.css'

Vue.config.productionTip = false
App.mpType = 'app'
// 代码兼容转化
import WXAPI from './transfer/src/WXP.js'
import Router from './transfer/src/router.js'
Vue.use(Router)
Vue.use(WXAPI)
// Vue.prototype.WXP = WXP

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      'pages/mine/mine'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#7f81f8',
      navigationBarBackgroundColor: '#7f81f8',
      navigationBarTitleText: '体验名片',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      color: '#999',
      selectedColor: '#7f81f8',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/mine/mine',
        text: '名片',
        iconPath: 'static/assets/index.png',
        selectedIconPath: 'static/assets/index-active.png'
      }, {
        pagePath: 'pages/map/map',
        text: '附近 ',
        iconPath: 'static/assets/group.png',
        selectedIconPath: 'static/assets/group-active.png'
        }, {
          pagePath: 'pages/news/news',
          text: '宣传栏 ',
          iconPath: 'static/assets/companylist.png',
          selectedIconPath: 'static/assets/companylist-active.png'
        }, {
        pagePath: 'pages/person/person',
        text: '个人',
        iconPath: 'static/assets/person.png',
        selectedIconPath: 'static/assets/person-active.png'
      }]
    }
  }
  
}
