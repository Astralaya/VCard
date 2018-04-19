<template>
  <div class="page">
    <div>
      <div class="weui-grids">
        <block v-for="(item , index) in grids" :key="index">
          <navigator class="companylist-weui-grid" hover-class="weui-grid_active" @click="goPage(item)">
            <div class="weui-grid__icon icon-style" v-bind:style="{ backgroundColor: item.backgroundColor }">
              <image class="weui-grid__icon grid-img" :src="item.icon" />
            </div>
            <div class="weui-grid__label">{{ item.title }} </div>
          </navigator>
        </block>
      </div>

      <div class="weui-cells weui-cells_after-title">
        <div class="weui-cell">
          <div class="weui-cell__hd">
            <image src="../../static/assets/listenicon.png" style="margin-right: 5px;vertical-align: middle;width:20px; height: 20px;"></image>
          </div>
          <div class="weui-cell__bd"></div>
          <div class="weui-cell__ft">总浏览255</div>
        </div>
      </div>

    </div>

    <div class="weui-cells weui-cells_after-title text-banner">
      <div class="text-banner-content">
        <div class="text-banner-title">恭喜
          <text style="color:#7f81f8"> # {{newInitCompany}} # </text>入驻</div>
        <div class="text-banner-btn" @click="goCompanyInfo">欢迎入驻</div>
      </div>
    </div>

    <div style="background-color:#fff;">
      <company-component></company-component>
    </div>
  </div>
</template>

<script>
import api from "@/utils/api";
import companyComponent from "@/components/company-component/company-component";

export default {
  components: {
    companyComponent
  },
  data() {
    return {
      rowIndex: 0,
      newInitCompany: "印捷",
      grids: [
        {
          title: "所有分类",
          icon: "../../static/assets/class.png",
          backgroundColor: "#f4ea2a",
          type: 5
        },
        {
          title: "我的收藏",
          icon: "../../static/assets/save.png",
          backgroundColor: "#1296db",
          type: 3,
          my: true
        },
        {
          title: "浏览记录",
          icon: "../../static/assets/listen.png",
          backgroundColor: "#0e932e",
          type: 1,
          my: true
        },
        {
          title: "拨号记录",
          icon: "../../static/assets/call-jilu.png",
          backgroundColor: "#ea9518",
          type: 4,
          my: true
        }
      ]
    };
  },
  computed: {},
  mounted() {
    var n = 0;
    var _this = this;
    this.companyList = [];
    this.getData();
    setInterval(() => {
      n++;
      _this.newInitCompany = "印捷" + n;
    }, 3000);
  },

  methods: {
    async getData() {},
    goPage(item) {
      if (item.type != 5) {
        this.$router.open({
          title: item.title,
          url: "../cardlist/cardlist",
          type: "PUSH",
          params: {
            params: item
          }
        });
      } else {
        this.$router.open({
          title: item.title,
          url: "../cardlist/cardlist",
          type: "PUSH"
        });
      }
    },
    goCompanyInfo() {
      this.$router.open({
        title: "申请入驻",
        url: "../companyinfo/companyinfo",
        type: "PUSH"
      });
    }
  }
};
</script>
<style>
.companylist-weui-grid {
  position: relative;
  float: left;
  padding: 20rpx 20rpx;
  width: 25%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-right: 1rpx solid #d9d9d9;
  /*border-bottom:1rpx solid #d9d9d9;*/
  background-color: #fff;
}
.icon-style {
  position: relative;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
}
.grid-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.text-banner {
  padding: 15rpx;
  font-size: 26rpx;
  background-color: #f5f5f9;
}
.text-banner-content {
  position: relative;
  width: 720rpx;
  height: 70rpx;
  border-radius: 50rpx;
  overflow: hidden;
  background-color: #fff;
}
.text-banner-title {
  float: left;
  height: 70rpx;
  line-height: 70rpx;
  padding-left: 50rpx;
}
.text-banner-btn {
  float: right;
  height: 70rpx;
  line-height: 70rpx;
  text-align: center;
  width: 200rpx;
  color: #fff;
  background-color: #7f81f8;
}
</style>
