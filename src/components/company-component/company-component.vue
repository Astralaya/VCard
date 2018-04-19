<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title navbar__company__title">{{item}}</div>
            </div>
          </block>
          <div class="weui-navbar__company" :class="navbarSliderClass"></div>
        </div>
        <div class="weui-tab__panel">
          <div class="weui-tab__content" :hidden="activeIndex != 0">
          	<new-company :lists="newCompanyList"></new-company>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">
          	<new-company :lists='nearCompanyList'></new-company>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utils/api'
import newCompany from './new-company'

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
export default {
  components : {
  	newCompany
  },
  data() {
    return {
      tabs: ["最新收录", "附近发现"],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      fontSize: 30,
      newCompanyList: [],
      nearCompanyList: [],
      rowIndex1: 0,
      rowIndex2: 0
    }
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex == 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex == 2) {
        return 'weui-navbar__slider_2'
      }
    }
  },
  onReachBottom () {
    this.getData()
  },
  mounted() {
    var _this = this;
    _this.newCompanyList = []
    _this.nearCompanyList = []
    _this.getData()
    wx.getSystemInfo({
      success: function (res) {
        _this.sliderLeft = (res.windowWidth / _this.tabs.length - sliderWidth) / 2;
        _this.sliderOffset = res.windowWidth / _this.tabs.length * this.activeIndex;
      }
    });
    
  },
  methods: {
    tabClick(e) {
      this.sliderOffset = e.currentTarget.offsetLeft;
      this.activeIndex = e.currentTarget.id;
    },
    async getData() {
      if(this.activeIndex === 1) return
      var res = await api.get_company_list({'@rowIndex': this.rowIndex1++})
      api.util_update_list(res , this.newCompanyList)
      wx.stopPullDownRefresh()
    }
  }
}
</script>

<style scoped>
page,
.page,
.page__bd {
  height: 100%;
}
.page__bd {
  padding-bottom: 0;
}
.weui-tab__content {
  text-align: center;
}
.weui-navbar__slider_1 {
  left: 14.5px;
  transform: translateX(0);
  -webkit-transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 14.5px;
  transform: translateX(375rpx);
  -webkit-transform: translateX(375rpx);
}
.weui-navbar__slider_2 {
  left: 14.5px;
  transform: translateX(250px);
  -webkit-transform: translateX(250px);
}
.weui-navbar__company {
	position:absolute;
	content:" ";
	left:89rpx;
	bottom:0;
	width:6em;
	height:6rpx;
	background-color:#7f81f8;
	-webkit-transition:-webkit-transform 0.3s;
	transition:-webkit-transform 0.3s;
	transition:transform 0.3s;
	transition:transform 0.3s, -webkit-transform 0.3s;
}
.navbar__company__title {

}
</style>