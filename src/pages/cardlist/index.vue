<template>
	<div class="page">
		<div class="weui-cells weui-cells_after-title" v-for="(item , index) in list" v-if="pageType">
			<div  class=" weui-cell_access" hover-class="weui-cell_active">
				<div class="weui-cell">
					<div class="weui-cell__hd" style="position: relative;margin-right: 10px;" @click="goOtherCard(item)">
						<image class="card-list-avator" :src="item.strAvatarUrl" />
						<!-- <div class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">{{index}}</div> -->
					</div>
					<div class="weui-cell__bd" @click="goOtherCard(item)">
						<div>{{ item.strName }} <text class="card-list-joy">{{ item.strPosition }}</text></div>
						<div style="font-size: 13px;color: #888888;">{{ item.strIntro }}</div>
					</div>
					<div class="weui-cell__ft " @click="call(item.strMobile)" >
						<image class="weui-cell__ft card-list-phone" src="../../static/assets/call.png" />
					</div>
				</div>
			</div>
		</div>

		<div class="weui-cells weui-cells_after-title" v-for="(item , index) in list" v-if="!pageType">
			<div class="card-list-top">
				
			</div>
			<div>
				<navigator  class="weui-cell_access" hover-class="weui-cell_active"  @click="goOtherCard(item)">
					<div class="weui-cell">
						<div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
							<image class="card-list-avator" :src="item.strName" />
							<div class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">{{index}}</div>
						</div>
						<div class="weui-cell__bd">
							<div>{{ item.strName }} <text class="card-list-joy">{{ item.strPosition }}</text></div>
							<div style="font-size: 13px;color: #888888;">{{ item.strIntro }}</div>
						</div>
					</div>
					<div class="weui-flex">
						<div class="weui-flex__item">
							<div class="placeholder">
								{{ item.strCompany }}
							</div>
						</div>
						<div>
							<div class="placeholder">距离 1058.47km</div>
						</div>
					</div>
				</navigator>
			</div>
		</div>
		
	</div>

</template>

<script>
	import api from '@/utils/api'
	import store from '@/store/store'

	export default {
		components: {
  	// cardListComponent
  },
  data() {
  	return {
  		pageType: true,
  		list: [],
  		type: 1 ,
  		rowIndex: 1,
  		router: {}
  	}
  },
  computed: {

  },
  mounted() { 
  	var routerPar = this.$root.$mp.query;
  	wx.setNavigationBarTitle({
  		title: routerPar.title
  	})
  	this.routerPar = routerPar
  	this.type = parseInt(routerPar.type)
  	this.list = []
  	this.getData()
  },
  onReachBottom () {
  	this.loadMore()
  },
  methods: {
  	async getData () {
  		const _this =this;
  		const userInfo = store.state.userInfo
  		if(_this.routerPar.my) {
  			var par = {
  				'@type': this.type,
  				'@rowIndex': this.rowIndex,
  				'@strOpenId_c' : userInfo.strOpenId,
  			}
  		} else {
  			var par = {
  				'@type': this.type,
  				'@rowIndex': this.rowIndex,
  				'@strOpenId_b' : userInfo.strOpenId
  			}
  		}
  		
  		var data = await api.get_card_List(par)
  		if(data.success) {
  			var list = data.data.data
  			list.map(item => {
  				_this.list.push(item.map)
  			})
  			this.intCount = parseInt(data.data.intCount)
  		}
  	},
  	loadMore () {
  		this.rowIndex++
  		this.getData()
  	},
  	goOtherCard (item) {
  		var par = {
  			strOpenId: item.strOpenId
  		}
  		this.$router.open({
  			name: '查看名片',
  			url: '../othercard/othercard',
  			type: 'PUSH',
  			params: {
  				params: par
  			}
  		})
  	},
  	call (mobileNum) {
  		if(mobileNum) {
  			wx.makePhoneCall({
  				phoneNumber: mobileNum
  			})
  		} else {
  			api.wxToast({
  				title: '该用户没有设置电话号码'
  			})
  		}
  	}
  },
  created() {

  }
}
</script>

<style scoped>
	.weui-cell {
		padding: 12px 8px 12px 8px;
	}
	.card-list-joy {
		font-size: 12px;
		color: #999;
	}
	.card-list-avator {
		width: 50px; 
		height: 50px; 
		display: block;
		border-radius: 50%;
	}
	.card-list-phone {
		width: 50rpx;
		height: 50rpx;
		margin-right: 16rpx;
	}
	.placeholder {
		padding: 0 10px 5px;
		font-size: 12px;
		color: #8a8a8a;
	}
	.company-list {
		text-align: left;
		background-color: #f5f5f9;
	}
	.weui-cell {
		/*margin-bottom: 10rpx;*/
		padding: 12px 8px 12px 8px;
	}
	.weui-cell_access {
		margin-bottom: 10rpx;
	}
	.card-list-joy {
		font-size: 12px;
		color: #999;
	}
	.card-list-avator {
		width: 50px; 
		height: 50px; 
		display: block;
		border-radius: 50%;
	}
	.card-list-phone {
		width: 50rpx;
		height: 50rpx;
		margin-right: 16rpx;
	}
</style>