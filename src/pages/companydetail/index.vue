<template>
  <div class="page" style="padding: 0 20rpx;">
    <div class="weui-cells__title"></div>
    <div  class=" weui-cell_access" style="background-color: #fff;">
      <div class="weui-cell">
        <div class="weui-cell__hd" style="position: relative;margin-right: 10px;">
          <image class="card-list-avator" :src="userInfo.strAvatarUrl" />
          <!-- <div class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">{{index}}</div> -->
        </div>
        <div class="weui-cell__bd" >
          <div>{{ companyInfo.strText }} <text class="card-list-joy">{{ companyInfo.strName }}</text></div>
          <div style="font-size: 13px;color: #888888;">{{ companyInfo.strIntro }}</div>
        </div>
      </div>
    </div>
    
    <div class="weui-cells__title"></div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell weui-cell_access"  >
        <div class="weui-cell__bd">电话</div>
        <div class="weui-cell__ft " >
          {{companyInfo.strMobile}}
        </div>
      </div>
      <div class="weui-cell weui-cell_access"  >
        <div class="weui-cell__bd">微信号</div>
        <div class="weui-cell__ft " >
          {{companyInfo.strWeChat}}
        </div>
      </div>
    </div>
    <div class="weui-cells__title"></div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell ">
        <div class="weui-cell__hd">
          <image :src="locationIcon" style="width: 20px;height: 20px;margin-right: 5px" />
        </div>
        <div class="weui-cell__bt">
          {{companyInfo.strAddress}}
        </div>
      </div>
    </div>
    <div class="weui-cells__title"></div>
    <div class="weui-cells weui-cells_after-title">
      <div class="weui-cell ">
        <div class="weui-cell__bd">
          简介
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <textarea v-model="companyInfo.strIntro" style="height: 3.3em" disabled="disabled" />
        </div>
      </div>
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

    <div class="weui-footer weui-footer_fixed-bottom bottom-box">
      <div class="bottom-bar">
        <div class="bottom-icon-list">
              <div  class="companydetail-weui-grid "  style="position:relative;">
                <button open-type="share" class="share-btn">
                  <div class=" icon-style">
                    <image class="companydetail-grid-img"  :src="grids[0].icon" />
                  </div>
                  <div class="weui-grid__label companydetail-grid-title" >{{ grids[0].title }} </div>
                </button>
              </div>
              <div  class="companydetail-weui-grid" @click="onLocation" >
                <div class=" icon-style">
                  <image class="companydetail-grid-img"  :src="grids[1].icon" />
                </div>
                <div class="weui-grid__label companydetail-grid-title" >{{ grids[1].title }} </div>
              </div>
              <div  class="companydetail-weui-grid" >
                <div class=" icon-style">
                  <image class="companydetail-grid-img"  :src="grids[2].icon" />
                </div>
                <div class="weui-grid__label companydetail-grid-title" >{{ grids[2].title }} </div>
              </div>
        </div>
        <button class="bottom-call-btn" hover-class="bottom-call-btn-hover">
          电话联系
        </button>
      </div>
    </div>
  </div>
</template>


<script>
  import store from '@/store/store'
  import api from '@/utils/api'

  export default {
    data () {
     return {
      companyInfo: {},
      locationIcon: '../../static/assets/location.png',
      files: [],
      grids: [{
          title: '分享',
          icon: '../../static/assets/share.png',
          backgroundColor:'#f4ea2a',
          type: 1
        },{
          title: '导航',
          icon: '../../static/assets/goto.png',
          backgroundColor: '#1296db',
          type: 2 ,
          my: true
        },{
          title: '收藏',
          icon: '../../static/assets/collection.png',
          backgroundColor: '#0e932e',
          type: 3 ,
          my: true
        }]
    }
  },
  computed: {
    userInfo () {
      return store.state.userInfo
    }
  },
  mounted () {
    this.getData()
  },
  onShareAppMessage (res) {
    const strOpenId = this.userInfo.strOpenId
    const userName = this.userInfo.strName
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: `${userName}的公司`,
      path: `pages/companydetail/companydetail?companyId=${strOpenId}`,
      success: function(res) {
        // 转发成功
        console.log(res)
      },
      fail: function(res) {
        // 转发失败
        console.log(res)
      }
    }
  },
  methods: {
    async getData() {
      var query = this.$root.$mp.query;
      var res = await api.get_company_list({strId: query.companyId})
      if(res.success) this.companyInfo = res.data[0].map
    },
    onLocation() {
      var option = {
        name: this.userInfo.strName,
        address: this.userInfo.strAddress || '12312312312321',
        latitude: this.userInfo.intLat,
        longitude: this.userInfo.intLng
      }
      api.wxGetLocation()
      .then(res => api.wxOpenLocation(option))
      .catch(ex => api.wxGetAccess())
    }
  },
  created () {

  }
}

</script>
<style scoped>
  .bottom-box {
    bottom: 0;
    background-color: #fff;
  }
  .bottom-bar {
    display: flex;
    height: 90rpx;
    align-items: center;
    border-top: 1px solid #eee;
  }
  .bottom-icon-list {
    width: 450rpx;
    height: 75rpx;
    margin-right: 10rpx;
    display: flex;
  }
  .bottom-call-btn {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    color: #fff;
    background-color: #7f81f8;
    border-radius: 0;
  }
  .bottom-call-btn-hover {
    background-color: #7f81f7;
  }
  .companydetail-weui-grid {
    flex: 1;
  }
  .companydetail-grid-img {
    display: block;
    width: 35rpx;
    height: 35rpx;
    margin:0 auto;
  }
  .share-btn {
    position: relative;
    display: inline;
    margin-left:0;
    margin-right:0;
    padding-left:0;
    padding-right:0;

    line-height: 36rpx;
    overflow: none;
    background-color:#fff;
  }
  .companydetail-grid-title {
    font-size: 26rpx;
    color: #2c2c2c;
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
  .placeholder {
    padding: 0 10px 5px;
    font-size: 12px;
    color: #8a8a8a;
  }
  .company-list {
    text-align: left;
    background-color: #f5f5f9;
  }
  .weui-footer {
    margin-bottom: 50px;
  }
  .weui-footer_fixed-bottom {
    margin-bottom: 0;
  }
</style>