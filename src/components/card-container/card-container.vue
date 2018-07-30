<template>
	<div class="card-container" >
    <!-- 信息部分 -->
    <img class="card-background" :src="userCard.strBackground ? userCard.strBackground : '../../static/assets/head.png'"/>
    <div class="card-content"  >
      <!-- 名片上半部分 -->
      <div class="card-content-top panel__bd card-content-border">
        <div class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd weui-media-box__hd_in-appmsg">
            <image class="weui-media-box__thumb card-userAvatar" :src="userCard.strAvatarUrl ? userCard.strAvatarUrl : '../../static/assets/head.png'" />
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <text class="weui-media-box__title card-content-text">{{userCard.strName}}</text>
            <text class="weui-media-box__desc card-content-text">{{userCard.strPosition}}</text>
          </div>
          <div class="weui-media-box__bd weui-media-box__bd_in-appmsg">
            <!-- <div class="link-btn" > -->
            <img class="link-btn" :src="linkBtnIcon" @click="linkBtnClick">
            <!-- </div> -->
          </div>
        </div> 
      </img>
    </div>
    <!-- 名片下半部分 -->
    <div class="card-content-bottom">
      <div class="weui-media-box__bd_in-appmsg">
        <text class="weui-media-box__desc card-content-text">
          公司: {{userCard.strCompany}}
        </text>
        <text class="weui-media-box__desc card-content-text">
          手机: {{userCard.strMobile}}
        </text>
        <text class="weui-media-box__desc card-content-text">
          邮箱: {{userCard.strEmail}}
        </text>
      </div>
    </div>
  </div>
  <!-- 工具栏部分 -->
  <div class="card-toolbar ">
    <div class="weui-grids">
      <block v-for="(item,index) in grids" :key="index">
        <navigator class="card-toolbar-grid" hover-class="weui-grid_active" @click="tabClick(item)">
          <image class="weui-grid__icon" :src="item.icon" />
          <div class="weui-grid__label">{{ item.title }}({{item.num}})</div>
        </navigator>
      </block>
    </div>
    <!-- 简介 -->
    <div class="card-text ">
      <text class="weui-media-box__desc">
        简介: {{userCard.strIntro}}
      </text>
    </div>
  </div>
</img>
</div>
</template>



<script>
  export default {
    props: {
     userCard: {
      type: Object,
      default: {}
    },
    linkBtnIcon: {
      type: String,
      default: '../../static/assets/modifiy.png'
    },
    isMy: {
      type: Boolean,
      default: true
    }
  }, 
  data () {
    return {
      modifiyIcon: '../../static/assets/modifiy.png',
      otherIcon: '../../static/assets/person.png'
    }
  },
  computed : {
    grids () {
      var arr = [{
        title: '人气',
        num: this.userCard.intHits || 0,
        icon: '../../static/assets/hot.png',
        type: 1
      },{
        title: '点赞',
        num: this.userCard.intLikes || 0,
        icon: this.userCard.isLike ? '../../static/assets/zan-active.png' : '../../static/assets/zan.png' ,
        type: 2
      },{
        title: '收藏',
        num: this.userCard.intCollects || 0,
        icon: this.userCard.isCollects ? '../../static/assets/collection-active.png' : '../../static/assets/collection.png' ,
        type: 3
      }]
      return arr
    }
  },
  methods: {
    linkBtnClick() {
      this.$emit('link-on-click' , this.isMy )
    },
    tabClick(e) {
      var info = {
        title: e.title,
        type: e.type,
        isMy: this.isMy
      }
      this.$emit('tab-on-click' , info)
    }
  },
  mounted() {
    
  }
}
</script>

<style >
  .card-container {
    position: relative;
    overflow: hidden;
    width: 690rpx;
    height: 690rpx;
    border-radius: 8rpx;
    box-shadow: 1px 1px 10px rgba(0,0,0,0.2); 
  }
  .card-background {
    width: 690rpx;
    height: 690rpx;
    filter: brightness(60%) blur(2px);
  }
  .card-content {
    position: absolute;
    width: 690rpx;
    top: 0;
    left: 0;
    height: 400rpx;
  }
  .card-content-border {
    border-bottom-width: 1rpx;
    border-bottom-style: solid;
    border-bottom-color: #999;
  }
  .card-content-bottom {
    padding-left: 30rpx;
    padding-right: 30rpx;
  }
  .card-content-text {
    margin-top: 30rpx;
    color: #eee;
  }
  .card-toolbar {
    position: absolute;
    width: 690rpx;
    height: 160rpx;
    top: 200px;
    background-color: #fff;
  }
  .card-text {
    /*position: absolute;*/
    width: 100%;
    height: 134rpx;
    padding-top: 15rpx;
    padding-left: 30rpx;
    background-color: #fff;
  }
  .card-userAvatar {
    border-radius: 50%;
  }
  .card-toolbar-grid {
    position:relative;
    float:left;
    padding:24rpx 16rpx;
    width:33.33333333%;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    border-right:1rpx solid #d9d9d9;
    border-bottom:1rpx solid #d9d9d9;
  }
  .link-btn  {
    position: relative;
    float: right;
    margin-right: 30rpx;
    width: 60rpx;
    height: 60rpx;
  }
</style>