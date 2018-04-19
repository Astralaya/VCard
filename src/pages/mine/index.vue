<template>
  <div class="page">
    <div class="page__hd">
      <user-card-component :userCard="userInfo" @link-on-click="linkOnClick" @tab-on-click='tabOnClick'></user-card-component>
    </div>
    <div class="index-link">
      <div class="weui-media-box weui-media-box_small-appmsg index-link-container">
        <div class="weui-cells weui-cells_in-small-appmsg">
          <navigator url="../rankinglist/rankinglist" class="weui-cell weui-cell_access" hover-class="weui-cell_active">
            <div class="weui-cell__hd">
              <image src="../../static/assets/charts.png" style="width: 20px;height: 20px;margin-right: 5px" />
            </div>
            <div class="weui-cell__bd weui-cell_primary">
              <div>排行榜</div>
            </div>
            <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </navigator>
          <navigator class="weui-cell weui-cell_access" hover-class="weui-cell_active" @click="goCardHolder">
            <div class="weui-cell__hd">
              <image src="../../static/assets/cards.png" style="width: 20px;height: 20px;margin-right: 5px" />
            </div>
            <div class="weui-cell__bd weui-cell_primary">
              <div>名片夹</div>
            </div>
            <div class="weui-cell__ft weui-cell__ft_in-access"></div>
          </navigator>
        </div>
      </div>
    </div>

    <div class="weui-btn-area sub">
      <button v-if="showShareBtn" open-type="share" class="weui-btn btn-defalut" hover-class="btn-hover" @click="onShare">递名片</button>
    </div>

    <div class="weui-cells__title" style="height: 20rpx;"></div>

  </div>
</template>

<style>
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
    margin: 15rpx 30rpx 0.3em;
}
</style> 

<script>
import api from "@/utils/api";
import store from "@/store/store";
import userCardComponent from "@/components/card-container/card-container";

export default {
    components: {
        userCardComponent
    },
    data() {
        return {
            wxCode: "",
            grids: [
                {
                    title: "人气",
                    num: 0,
                    icon: "../../static/assets/hot.png",
                    type: 1
                },
                {
                    title: "点赞",
                    num: 0,
                    icon: "../../static/assets/zan-active.png",
                    type: 2
                },
                {
                    title: "收藏",
                    num: 0,
                    icon: "../../static/assets/collection-active.png",
                    type: 3
                }
            ],
            showShareBtn : false
        };
    },
    mounted() {
        console.log(this.userInfo)
    },
    computed: {
        userInfo () {
            return store.state.userInfo
        }
    },
    onPullDownRefresh() {
        this.getUserInfo();
    },
    onShareAppMessage(res) {
        const strOpenId = this.userInfo.strOpenId;
        const userName = this.userInfo.strName;
        if (res.from === "button") {
            // 来自页面内转发按钮
            console.log(res.target);
        }
        return {
            title: `${userName}的名片`,
            path: `pages/othercard/othercard?strOpenId=${strOpenId}`,
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        };
    },
    methods: {
        async getUserInfo() {
            const _this = this;
            const openId = store.state.openId;
            let par = {
                    strOpenId: openId
                };
            const data = await api.post_login(par);
                    store.commit("inUserInfo", data);
            console.log(this.userInfo)
            _this.showShareBtn = store.state.inSendBtn;
            // 停止下拉刷新
            wx.stopPullDownRefresh();
        },
        async checkIsOnline() {
            const _this = this;
            const RES = await api.get_isOnline()
            
        },
        linkOnClick(type) {
            this.$router.open({
                name: "编辑名片",
                url: "../cardinfo/cardinfo",
                type: "PUSH",
                params: {
                    params: this.userInfo
                }
            });
        },
        tabOnClick(info) {
            this.$router.open({
                name: "名片列表",
                url: "../cardlist/cardlist",
                type: "PUSH",
                params: {
                    params: info
                }
            });
        },
        goCardHolder() {
            this.$router.open({
                name: "名片夹",
                url: "../cardholder/cardholder",
                type: "PUSH"
            });
        },
        onShare() {
            // console.log('分享')
            // wx.showShareMenu({
            //   withShareTicket: true
            // })
        }
    },
    watch: {
        
    }
};
</script>

