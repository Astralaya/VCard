<template>
  <view class="page">
    <view class="profile-info" >
      <image class="avatar" :src="userInfo.strAvatarUrl"></image>
      <text class="name">{{userInfo.strName}}</text>
    </view>
    <div class="weui-grids">
      <block v-for="item in grids" :key="index">
        <navigator  class="companylist-weui-grid" hover-class="weui-grid_active" @click="goPage(item)">
          <div class="weui-grid__icon icon-style" v-bind:style="{ backgroundColor: item.backgroundColor }">
            <image class="weui-grid__icon grid-img"  :src="item.icon" />
          </div>
          <div class="weui-grid__label">{{ item.title }} </div>
        </navigator>
      </block>
    </div>
    <div class="weui-cells__title"></div>
    <div class="weui-cells weui-cells_after-title" >
      <div class="weui-cell weui-cell_access" v-for="pageItem in pageList" @click="goPageList(pageItem)">
        <div class="weui-cell__bd">{{ pageItem.title }}</div>
        <div class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0">
        
        </div>
      </div>
    </div>
    <div class="weui-cells__title"></div>
    <div class="weui-cells weui-cells_after-title" >
      <div class="weui-cell weui-cell_access" @click="setting">
        <div class="weui-cell__bd">系统设置</div>
        <div class="weui-cell__ft weui-cell__ft_in-access" style="font-size: 0">
          <!-- <div class="weui-badge weui-badge_dot" style="margin-left: 5px;margin-right: 5px;"></div> -->
        </div>
      </div>
    </div>
  </view>
</template>

<script>
  import api from '@/utils/api'
  import store from '@/store/store'

  export default {
    data () {
      return {
        grids: [{
          title: '编辑名片',
          icon: '../../static/assets/flash.png',
          backgroundColor:'rgb(45, 140, 240)',
          type: 5
        },{
          title: '我的收藏',
          icon: '../../static/assets/save.png',
          backgroundColor: 'rgb(100, 213, 114)',
          type: 3 ,
          my: true
        },{
          title: '浏览记录',
          icon: '../../static/assets/listen.png',
          backgroundColor: 'rgb(255, 213, 114)',
          type: 1 ,
          my: true
        },{
          title: '拨号记录',
          icon: '../../static/assets/call-jilu.png',
          backgroundColor: 'rgb(242, 94, 67)',
          type: 4 ,
          my: true
        }],
        pageList: [{
          title: '反馈问题',
          url: '../feedback/feedback',
          type: 2
        }]
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
      goPage (item) {
        if(!item.my){
          this.linkOnClick()
          return
        }
        var info = {
          type : item.type,
          title: item.title,
          isMy: false
        }
        this.$router.open({
          name: '名片列表',
          url: '../cardlist/cardlist',
          type: 'PUSH',
          params: {
            params: info
          }
        })
      },
      linkOnClick (type) {
        this.$router.open({
          name:'编辑名片',
          url: '../cardinfo/cardinfo',
          type: 'PUSH',
          params: {
            params: this.userInfo
          }
        })
      },
      goPageList (item) {
        this.$router.open({
          name:item.title,
          url: item.url,
          type: 'PUSH'
        })
      },
      setting () {
        wx.openSetting({
            success:(res) => {

            }
          })
      }
    }
  }

</script>
<style scoped>
  .profile-info{
    position: relative;
    width: 100%;
    height: 280rpx;
    /*display: flex;*/
    /*flex-wrap: wrap;*/
    /*align-items: center;*/
    /*justify-content: flex-start;*/
    /*padding: 0 30.25rpx;*/
    background: #7f81f8;
    text-align: center;
  }

  .profile-info .avatar{
    /*position: relative;*/
    /*left: 50%;*/
    height: 148rpx;
    width: 148rpx;
    border-radius: 50%;
    /*transform: translateX(-148rpx);*/
  }

  .profile-info .info{
    flex: 1;
    height: 85rpx;

  }

  .profile-info .name{
    display: block;
    color: #fff;
    font-size: 37.5rpx;
  }
  .companylist-weui-grid {
    position:relative;
    float:left;
    padding:20rpx 20rpx;
    width:25%;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    /*border-right:1rpx solid #d9d9d9;*/
    border-bottom:1rpx solid #d9d9d9; 
    background-color: #fff;
  }
  .icon-style {
    position: relative;
    width: 80rpx;
    height: 80rpx;
    border-radius: 4px;
  }
  .grid-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }

</style>
