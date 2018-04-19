<template>
  <div class="page">
	<div class="login-img">
		<img :src="imgsrc" class="login-src">
	</div>

    <div class="weui-btn-area sub" >
      <button class="weui-btn btn-defalut" hover-class="btn-hover" @click="login">登录</button>
    </div>
    <div class="weui-btn-area sub" >
      <button  class="weui-btn " hover-class="btn-hover" @click="backHome">返回首页</button>
    </div>
  </div>
</template>

<script>
import store from '@/store/store'
import api from '@/utils/api'

export default {
  data () {
  	return {
  		imgsrc: '../../static/assets/login.png',
  		scene : ''
  	}
  },
  computed: {
    
  },
  mounted () {
    var scene = this.$root.$mp.query
    this.scene = scene.scene
  },
  methods: {
    async login() {
      var _this = this
      var par = {
        strOpenId : store.state.userInfo.strOpenId,
        scene : this.scene
      }
      wx.showLoading({title: '正在登录网页'})
      var data = await api.get_author_login(par)
      wx.hideLoading()
      try {
        api.wxToast({title:'登录网页成功' , icon: 'success'})  
        setTimeout(function() {
          _this.backHome()
        } , 2000)
      } catch (error) {
        api.wxToast({title:'登录网页失败' }) 
      }
    }, 
    backHome() {
      this.$router.open({
        url: '../mine/mine',
        type: 'TAB'
      })
    }
  },
  created () {
    
  }
}

</script>
<style>
	.login-img {
		text-align: center;
		margin-top: 150rpx;
	}
	.login-src {
		/*position: absolute;*/

	}
</style>
