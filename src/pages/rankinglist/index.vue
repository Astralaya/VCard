<template>
	<div class="page">
		<div class="rankinglist-container">
			<div class="rankinglist-top">
				<text class="rankinglist-top-title">排行榜</text>
				<img class="rankinglist-top-icon" :src="topIcon" >
			</div>
			<div class="rankinglist-topbar">
				<ul class="rankinglist-topbar-list">
					<li class="rankinglist-topbar-item " @click="resizeType(1)">
						<div class="weui-navbar__title ">
							<text :class="{ active: type == 1 }">人气榜</text>
						</div>
					</li>
					<li class="rankinglist-topbar-item" @click="resizeType(2)">
						<div class="weui-navbar__title">
							<text :class="{ active: type == 2 }">点赞榜</text>
						</div>
					</li>
					<li class="rankinglist-topbar-item" style="border:none;" @click="resizeType(3)">
						<div class="weui-navbar__title">
							<text :class="{ active: type == 3 }">收藏榜</text>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="rankinglist-content">
			<div class="weui-cells weui-cells_after-title" v-for="(item , index) in rankingList">
				<navigator  class="weui-media-box weui-media-box_appmsg" hover-class="weui-cell_active" @click="goOtherCard(item)">
					<div class="weui-cell__hd rankinglist-left">
						<image v-if="index === 0" :src="noIcon.noIcon1" style="width: 20px;height: 20px;margin-right: 5px" />
						<image v-if="index === 1" :src="noIcon.noIcon2" style="width: 20px;height: 20px;margin-right: 5px" />
						<image v-if="index === 2" :src="noIcon.noIcon3" style="width: 20px;height: 20px;margin-right: 5px" />
						<text v-if="index > 2"> {{ index + 1 }}</text>
					</div>
					<div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
						<image class="weui-media-box__thumb card-list-avator" :src="item.strAvatarUrl" />
					</div>
					<div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
						<div class="weui-media-box__title">{{ item.strName }}<text class="card-list-joy">{{ item.strPosition }}</text></div>
						<div class="weui-media-box__desc">{{ item.strIntro }}</div>
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
		data() {
			return {
				rankingList: [],
				type: 1,
				rowIndex: 1,
				$pageRecord: 10,
				intCount: 1,
				topIcon: '../../static/assets/medal.png',
				noIcon: {
					noIcon1: '../../static/assets/no1.png',
					noIcon2: '../../static/assets/no2.png',
					noIcon3: '../../static/assets/no3.png'
				}
			}
		},
		computed: {

		},
		mounted () {
			this.getData()
		},
		// 下拉刷新
		onPullDownRefresh () {
			this.resize()
		},
		// 上拉加载
		onReachBottom () {
			this.loadMore()
		},
		methods: {
			async getData() {
				wx.showLoading({title:'加载中'})
				const _this = this;
				const par = {
					type: this.type,
					$rowIndex: this.rowIndex
				}
				const data = await api.get_rankingList(par)
				wx.hideLoading()
				wx.stopPullDownRefresh()
				try {
					data.map((item) => {
						let cardInfo = item.map;
						_this.rankingList.push(cardInfo)
					})
				} catch (error) {
					
				}
			},
			resizeType( type ) {
				const _this = this;
				if(type == _this.type) return
					_this.type = type
				_this.rowIndex = 1
				_this.rankingList = []
				_this.getData()
			},
			loadMore () {
				this.rowIndex++
				this.getData()
			},
			resize () {
				this.rowIndex = 1
				this.rankingList = []
				this.getData()
			},
			goOtherCard (item) {
				this.$router.open({
		          name: '查看名片',
		          url: '../othercard/othercard',
		          type: 'PUSH',
		          params: {
		            params: item
		          }
		        })
			}
		},
		created() {

		}
	}

</script>

<style scoped>
	.rankinglist-container {
		width: 750rpx;
		height: 400rpx;
		background: -webkit-linear-gradient(to right, #13f1e7 ,#c213f1);
		background: linear-gradient(to right, #13f1e7 ,#c213f1);
	}
	.rankinglist-top {
		height: 300rpx;	
		padding: 0 100rpx;
		overflow: hidden;
	}
	.rankinglist-top-title {
		font-size: 32px;
		height: 300rpx;
		line-height: 300rpx;
		font-weight: 700;
		float: left;
		background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#bfbfbf), to(#f4ea2a));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.rankinglist-top-icon {
		float: left;
		margin-top: 50rpx;
		margin-left: 150rpx;
		width: 200rpx;
		height: 200rpx;
	}
	.rankinglist-topbar {
		height: 100rpx;
		background-color: rgba(0,0,0,0.4);
	}
	.rankinglist-topbar-list {
		width: 100%;
		height: 100px;
		line-height: 100px;
		display:-webkit-box;
		color: #fff;
	}
	.rankinglist-topbar-item {
		display: block;
		flex: 1;
		text-align:center;
		font-size:30rpx;
		margin-top: 35rpx;
		height: 30rpx;
		line-height: 30rpx;
		border-right: 1px solid #fff;
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
	.rankinglist-left {
		width: 70rpx;
		color: #000;
	}
	.active {
		color: #7f81f8;
	}
</style>