<template>
  <div class="page">
    <div class="">
      <div class="weui-search-bar">
        <div class="weui-search-bar__form">
          <div class="weui-search-bar__box">
            <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
            <input type="text" confirm-type="search" class="weui-search-bar__input" placeholder="搜索" v-model="inputVal" :focus="inputShowed" @input="inputTyping" />
            <div class="weui-icon-clear" v-if="inputVal.length > 0" @click="clearInput">
              <icon type="clear" size="14"></icon>
            </div>
          </div>
          <label class="weui-search-bar__label" :hidden="inputShowed" @click="showInput">
            <icon class="weui-icon-search" type="search" size="14"></icon>
            <div class="weui-search-bar__text">搜索</div>
          </label>
        </div>
        <div class="weui-search-bar__cancel-btn" :hidden="!inputShowed" @click="hideInput">取消</div>
      </div>
    </div>

    <div class="page__bd" style="margin-top: 5px;">
      <div class="weui-cells weui-cells_after-title" v-for="(item , index) in list" :key="index">
        <div  class=" weui-cell_access" hover-class="weui-cell_active">
          <div class="weui-cell">
            <div class="weui-cell__hd" style="position: relative;margin-right: 10px;" @click="goOtherCard(item)">
              <image class="card-list-avator" :src="item.strAvatarUrl" />
              <!-- <div class="weui-badge" style="position: absolute;top: -.4em;right: -.4em;">{{index}}</div> -->
            </div>
            <div class="weui-cell__bd" @click="goOtherCard(item)">
              <div>{{ item.strName }} <text class="card-list-joy">{{ item.strPosition }}</text></div>
              <div style="font-size: 13px;color: #888888;">{{ item.strIntro }}</div>
            </div>
            <div class="weui-cell__ft " @click="call(item.strMobile)" >
              <image class="weui-cell__ft card-list-phone" src="../../static/assets/call.png" />
            </div>
          </div>
        </div>
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
        inputShowed: false,
        inputVal: "",
        rowIndex: 1,
        list: []
      }
    },
    mounted () {
      this.list = []
      this.getData()
    },
    onReachBottom () {
      this.loadMore()
    },
    methods: {
      showInput() {
        this.inputShowed = true;
      },
      hideInput() {
        this.inputVal = '';
        this.inputShowed = false
      },
      clearInput() {
        this.inputVal = '';
      },
      inputTyping(e) {
        this.inputVal = e.mp.detail.value
      },
      async getData () {
        const _this =this;
        const userInfo = store.state.userInfo
        var par = {
          '@type': 3,
          '@rowIndex': this.rowIndex,
          '@strOpenId_c' : userInfo.strOpenId,
        }
        
        var data = await api.get_card_List(par)
        try {
          var list = data.data
          list.map(item => {
            _this.list.push(item.map)
          })
          this.intCount = parseInt(data.data.intCount)
        } catch (error) {
          
        }
      },
      loadMore () {
        this.rowIndex++
        this.getData()
      },
      goOtherCard (item) {
        var par = {
          strOpenId: item.strOpenId
        }
        this.$router.open({
          name: '查看名片',
          url: '../othercard/othercard',
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
    },
    onPullDownRefresh () {
      this.list = []
      this.getData()
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
  .active {
    color: #7f81f8;
  }
</style>