<template>
	<div class="page">
		<div class="weui-cells__title"></div>
		<div class="weui-cells weui-cells_after-title" hover-class="weui-grid_active">
			<div class="weui-cell">
				<div class="weui-cell__bd">LOGO</div>
				<div class="weui-cell__ft">
					<image class="company-logo"  mode="aspectFill" />
				</div>
			</div>
		</div>
		<div class="weui-cells__title">基础资料</div>
		<div class="weui-cells weui-cells_after-title">
			<div class="weui-cell">
				<div class="weui-cell__bd">商企名称</div>
				<div class="weui-cell__ft"><input class="weui-input" placeholder="请输入" v-model="companyInfo.strName"/></div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__bd">商企简称</div>
				<div class="weui-cell__ft"><input class="weui-input" placeholder="请输入" v-model="companyInfo.strText"/></div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__bd">联系人</div>
				<div class="weui-cell__ft"><input class="weui-input" placeholder="请输入" v-model="companyInfo.strUserName"/></div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__bd">联系电话</div>
				<div class="weui-cell__ft"><input class="weui-input" placeholder="请输入" v-model="companyInfo.strMobile"/></div>
			</div>
			<div class="weui-cell">
				<div class="weui-cell__bd">微信号</div>
				<div class="weui-cell__ft"><input class="weui-input" placeholder="请输入" v-model="companyInfo.strWeChat"/></div>
			</div>
		</div>

		<div class="weui-cells__title">位置</div>
		<div class="weui-cells weui-cells_after-title" @click="selectMap">
			<div class="weui-cell weui-cell_access">
				<div class="weui-cell__bd">详细地址</div>
				<div class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0">
					<div style="display: inline-block;vertical-align:middle; font-size: 17px;">{{companyInfo.strAddress}}</div>
					<div class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></div>
				</div>
			</div>
			
		</div>

		<div class="weui-cells__title">业务介绍</div>
		<div class="weui-cells weui-cells_after-title">
			<div class="weui-cell weui-cell_select">
			  <div class="weui-cell__hd weui-cell__hd_in-select-after">
	            <div class="weui-label">类别</div>
	          </div>	
	          <div class="weui-cell__bd">
	            <picker @change="bindAccountChange" :range="accounts">
	              <div class="weui-select">{{accounts[accountsIndex]}}</div>
	            </picker>
	          </div>
	        </div>
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<textarea class="" placeholder="业务介绍" style="height: 3.3em" v-model="companyInfo.strIntro"/>
					<div class="weui-textarea-counter">0/200</div>
				</div>
			</div>
		</div>

		<div class="weui-cells__title">产品上传</div>
		<div class="weui-cells weui-cells_after-title">
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<div class="weui-uploader">
						<div class="weui-uploader__hd">
							<div class="weui-uploader__title">图片上传</div>
							<div class="weui-uploader__info">{{files.length}}/8</div>
						</div>
						<div class="weui-uploader__bd">
							<div class="weui-uploader__files" id="uploaderFiles">
								<div v-for="item in files" :key="index">
									<div class="weui-uploader__file" @click="predivImage" :id="item">
										<image class="weui-uploader__img" :src="item" mode="aspectFill" />
									</div>
								</div>
							</div>
							<div class="weui-uploader__input-box">
								<div class="weui-uploader__input" @click="chooseImage"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="submit-btn-area" >
			<button class="weui-btn btn-defalut" hover-class="btn-hover" @click="saveForm">保存</button>
		</div>

	</div>
</template>

<script>
// 编辑名片
import api from '@/utils/api'
import store from '@/store/store'

export default {
	data () {
		return {
			companyInfo: {
				strName: '',
				strText: '',
				strUserName: '',
				strMobile: '',
				strWeChat: '',
				strAddress: '',
				strIntro: '',
				intLat: 0,
				intLng: 0,
				strOpenId: store.state.userInfo.strOpenId,
				strAddress: '请选择',
			},
			accounts: ["微信号", "QQ", "Email"],
  			accountsIndex: 0,
			files: []
		}
	},
	computed: {

	},
	mounted () {

	},
	methods: {
		bindAccountChange(e) {
	      this.accountsIndex = e.mp.detail.value;
	    },
		chooseImage(e) {
			var _this = this;
			wx.chooseImage({
				sizeType: ['original', 'compressed'], 
				sourceType: ['album', 'camera'], 
				success: function (res) {
					_this.files = _this.files.concat(res.tempFilePaths)
					_this.uploaderFiles(res.tempFilePaths)
				},
				fail: function () {
					console.log('fail');
				},
				complete: function () {
					console.log('commplete');
				}
			})
		},
		predivImage(e) {
			wx.previewImage({
				current: e.currentTarget.id, 
				urls: this.files 
			})
		},
		uploaderFiles(tempFilePaths) {
			const uploadTask = wx.uploadFile({
				url:  'http://192.168.30.37:22669/Mobile/Upload/UpLoadImgs', 
				filePath: tempFilePaths[0],
				name: 'file',
				formData:{
					'test' : 'test'
				},
				success: function(res){
					var data = res.data
					console.log(res)
				}
			})
			uploadTask.onProgressUpdate((res) => {
				console.log('上传进度', res.progress)
				console.log('已经上传的数据长度', res.totalBytesSent)
				console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
			})

		},
		async selectMap () {
			var data = await api.wxChooseLocation()
			this.companyInfo.strAddress = data.address
			this.companyInfo.intLat = data.latitude
			this.companyInfo.intLng = data.longitude
		},
		async saveForm() {
			var par = this.companyInfo
			wx.showLoading({title: '正在保存'})
			// console.log(par)
			var res = await api.post_company_save(par)
			console.log(res)
			  wx.hideLoading()
		      if(data.success) {
		        api.wxToast({title:'入驻申请' , icon: 'success'})  
		      } else {
		        api.wxToast({title:'入驻失败' }) 
		      }
		}

	}
}

</script>
<style>
	.modifiy-userAvatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 12rpx;
	}
	.submit-btn-area {
		margin:30rpx;
	}
	.company-logo {
		display: block;
		width: 75rpx;
		height: 75rpx;
		/*background: #000;*/
	}
</style>
