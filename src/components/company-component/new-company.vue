<template>
  <div class="company-list">
    <div class="weui-cells weui-cells_after-title" v-for="(item , index) in lists">
      <div  class="weui-cell_access" hover-class="weui-cell_active" >
        <div class="weui-cell">
          <div class="weui-cell__hd" style="position: relative;margin-right: 10px;" @click="goPage(item)">
            <image class="card-list-avator" src="https://wx.qlogo.cn/mmopen/vi_32/Tw8ershQp82rsEot4u6aotswNWIGzWyIULiaTeUBoL20Bh3u4hQic09NLBMiaWQ9wRuPBrHh19AQRcU0LsBVJKyiag/0" />
            <!-- <div class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">{{index}}</div> -->
          </div>
          <div class="weui-cell__bd" @click="goPage(item)">
            <div>{{item.strText}} <text class="card-list-joy">{{item.strUserName}}</text></div>
            <div style="font-size: 13px;color: #888888;">{{item.strIntro}}</div>
          </div>
          <div class="weui-cell__ft " @click="call(item.strMobile)" >
            <image class="weui-cell__ft card-list-phone" src="../../static/assets/call.png" />
          </div>
        </div> 
        <div class="weui-flex" @click="goPage(item)">
          <div class="weui-flex__item">
            <div class="placeholder">
              {{item.strAddress}}
            </div>
          </div>
          <div>
            <div class="placeholder">距离 1058.47km</div>
          </div>
        </div>
      </div>
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
      goPage(item) {
        var par = {
          companyId: item.id
        }
        this.$router.open({
          title: '企业详情',
          url: '../companydetail/companydetail',
          type: 'PUSH',
          params: {
            params: par
          }
        })
      },
      call (mobileNum) {
        if(mobileNum) {
          wx.makePhoneCall({
            phoneNumber: mobileNum
          })
        } else {
          api.wxToast({
            title: '该用户没有设置电话号码'
          })
        }
      }
    }
  }
</script>

<style scoped>
  .placeholder {
    padding: 0 10px 5px;
    font-size: 12px;
    color: #8a8a8a;
  }
  .company-list {
    text-align: left;
    background-color: #f5f5f9;
  }
  .weui-cell {
    /*margin-bottom: 10rpx;*/
    padding: 12px 8px 12px 8px;
  }
  .weui-cell_access {
    /*margin-bottom: 10rpx;*/
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
    width: 80rpx;
    height: 80rpx;
    margin-right: 16rpx;
  }
</style>