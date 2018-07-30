import WXP from 'minapp-api-promise'

export default {
  install(Vue, options) {
    Vue.prototype.$WXAPI = WXP
    
  }

}