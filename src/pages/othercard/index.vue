<template>
	<div class="page">
		<div class="page__hd">
			<user-card-component
			:userCard="cardInfo"
			:isMy= 'false' 
			:linkBtnIcon = "linkIcon"
			@link-on-click = "linkOnClick"
			@tab-on-click = 'tabOnClick'
			></user-card-component>
		</div>
		<div class="weui-cells_after-title" v-if="files.length != 0">
			<div class="weui-cell no-padding-top" >
				<div class="weui-cell__bd">
					<div class="weui-uploader">
						<div class="weui-uploader__bd">
							<div class="weui-uploader__files" id="uploaderFiles">
								<div v-for="item in files" :key="index">
									<div class="weui-uploader__file" :id = 'index'   @click="previewImage(index)">
										<image class="weui-uploader__img" :src="item" mode="aspectFill" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="weui-btn-area sub" >
			<button class="weui-btn " hover-class="btn-hover" @click="addPhoneContact">导入到手机</button>
		</div>
	</div>
</template>

<style>
	.no-padding-top {
		padding-top: 0;
		padding-bottom: 0;
	}
	.index-link {
		padding-left: 30rpx;
		padding-right: 30rpx;
	}
	.index-link-container {
		position: relative;
		width: 690rpx;
		border-radius: 4rpx;
		overflow: hidden;
	}
	.index-button-content {
		margin:15rpx 30rpx 0.3em;
	}
</style>

<script>
	import api from '@/utils/api'
	import store from '@/store/store'
	import userCardComponent from '@/components/card-container/card-container'

	export default {
		components : {
			userCardComponent
		},
		data () {
			return {
				wxCode : '',
				cardInfo: {},
				linkIcon: '../../static/assets/goperson.png',
				files: []
			}
		},
		computed: {
			userInfo() {
				return store.state.userInfo
			}
		},
		mounted () {
			this.getUserInfo()
		},
		onPullDownRefresh () {
			this.getUserInfo()
		},
		methods: {
			async getUserInfo () {
				var _this =this
				var otherUser = this.$root.$mp.query;
				_this.files = []
				var par = {
					strOpenId_c : this.userInfo.strOpenId,
					strOpenId_b   : otherUser.strOpenId
				}
	
				wx.showLoading({title:'加载中'})
				var data = await api.get_otherCard(par);

				this.cardInfo = data
				data.images.map(item => {
					var item = item.map
					var urlPath = item.strUrl + '/' + item.strFilePath + '/'  + item.strFileName
					_this.files.push(urlPath)
				})
				wx.hideLoading()
				wx.stopPullDownRefresh()

			},
			linkOnClick (type) {
				this.$router.open({
					name: '首页',
					url: '../mine/mine',
					type: 'TAB'
				})
			},
			async tabOnClick (info) {
				if(info.type === 1) return
					var par = {
						type: info.type,
						strOpenId_c: this.userInfo.strOpenId,
						strOpenId_b: this.cardInfo.strOpenId
					}
					try {
						var data = await api.post_like(par)
						this.getUserInfo()
					} catch (error) {
						
					}
				},
				addPhoneContact () {
					api.wxAddPhoneContact({
						firstName: this.cardInfo.strName,
						remark: this.cardInfo.strIntro,
						mobilePhoneNumber: this.cardInfo.strMobile,
						organization: this.cardInfo.strCompany,
						title: this.cardInfo.strPosition
					})
				},
				previewImage(e) {
			      var arr = []
			      this.files.map(item => {
			        arr.push(item.imgUrl)
			      })
			      wx.previewImage({
			        current: e, // 当前显示图片的http链接
			        urls: this.files // 需要预览的图片http链接列表
			      })
			    }
			}

		}

	</script>

