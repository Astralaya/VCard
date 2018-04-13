<template>
	<div >
		<div class="weui-cells weui-cells_after-title" v-for="(item , index) in list">
			<navigator url="" class=" weui-cell_access" hover-class="weui-cell_active" >
				<div class="weui-cell">
					<div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
						<image class="card-list-avator" src="https://wx.qlogo.cn/mmopen/vi_32/Tw8ershQp82rsEot4u6aotswNWIGzWyIULiaTeUBoL20Bh3u4hQic09NLBMiaWQ9wRuPBrHh19AQRcU0LsBVJKyiag/0" />
						<div class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">{{index}}</div>
					</div>
					<div class="weui-cell__bd">
						<div>MINGYU <text class="card-list-joy">前端开发</text></div>
						<div style="font-size: 13px;color: #888888;">摘要信息</div>
					</div>
					<div class="weui-cell__ft ">
						<image class="weui-cell__ft card-list-phone" src="../../static/assets/call.png" />
					</div>
				</div>
			</navigator>
		</div>
	</div>

</template>

<script>

	export default {
		props: {
			lists: {
				type: Array,
				default: []
			}
		},
		data() {
			return {

			}
		},
		computed: {

		},
		mounted() {

		},
		methods: {

		},
		created() {
			
		}
	}
</script>

<style scoped>
	.searchbar-result {
		margin-top: 0;
		font-size: 14px;
	}
	.searchbar-result:before {
		display: none;
	}
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
</style>