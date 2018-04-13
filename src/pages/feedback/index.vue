<template>
	<div class="page" style="padding: 0 20rpx;">
		<div class="weui-cells__title">反馈问题</div>
		<div class="weui-cells weui-cells_after-title">
			<div class="weui-cell">
				<div class="weui-cell__bd">
					<textarea class="" placeholder="请输入您要反馈的内容" style="height: 10.3em" v-model="feedbackText"/>
				</div>
			</div>
		</div>
		<div class="weui-cells__title"></div>
		<div class="submit-btn-area" >
	      <button class="weui-btn btn-defalut" hover-class="btn-hover" @click="saveForm">发送反馈</button>
	    </div>
	</div>
</template>

<script>
	import api from '@/utils/api'
	import store from '@/store/store'

	export default {
		data () {
			return {
				feedbackText: ''
			}
		},
		computed: {
			userInfo() {
				return store.state.userInfo
			}
		},
		mounted () {
			
		},
		methods: {
			saveForm() {

			}
		}
	}

</script>
<style scoped>

</style>
