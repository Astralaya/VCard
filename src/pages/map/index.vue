<template>
  <div class="page">
    <map id="myMap" 
    show-location 
    :controls="controls" 
    @controltap="getCenterLocation" 
    :markers="markers" 
    @markertap="markertap" 
    @regionchange="regionchange"/>
  </div>
</template>

<script>
// Use Vuex
import api from '@/utils/api'
import store from '@/store/store'

export default {
  data () {
    return {
      markers: [],
      controls: []
    }
  },
  computed: {
    strOpenId () {
      return store.state.openId
    },
    userInfo () {
      return store.state.userInfo
    }
  },
  mounted () {
    this.setControls()
    this.getCenterLocation()
    this.getData()
  },
  methods: {
    async setControls () {
      const res = await api.wxGetSystemInfo()
      this.controls = [{
            id: 1,
            iconPath: '../../static/assets/location.png',
            position: {
              left: 20,
              top: res.windowHeight  - 40 - 20,
              width: 30,
              height: 30
            },
            clickable: true
          }]
    },
    async saveLocation (intLat , intLng) {
      const par = {
        strOpenId : this.strOpenId,
        intLat : intLat ,
        intLng : intLng
      }
      const data = await api.post_login(par)
    },
    async getData () {
      const _this = this
      _this.markers = []
      var par = {
        'type' : 1,
        '@rowIndex': 1,
        '@pageSize' : 1000000
      }
      var res = await api.get_rankingList(par)
      
      res.map(item => {
        var item = item.map
        if(item.intLat && item.intLng && item.strOpenId != _this.userInfo.strOpenId) {
            item.latitude = item.intLat
            item.longitude = item.intLng
            item.id = item.strOpenId
            item.iconPath = '../../static/assets/map-icon.png'
            item.width = 40
            item.height = 40
            _this.markers.push(item)  
        }
      })
    },
    regionchange(e) {
      // console.log(e.type)
    },
    markertap(e) {
      var par = {
        strOpenId: e.mp.markerId
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
    getCenterLocation: function () {
      var _this = this;
      this.mapCtx.getCenterLocation({
        success: function(res){
          _this.moveToLocation()
          _this.saveLocation(res.latitude , res.longitude)
          _this.getData()
        }
      })
    },
    moveToLocation: function () {
      this.mapCtx.moveToLocation()
    },

    translateMarker: function() {
      this.mapCtx.translateMarker({
        markerId: 0,
        autoRotate: true,
        duration: 1000,
        destination: {
          latitude:23.10229,
          longitude:113.3345211,
        },
        animationEnd() {
          console.log('animation end')
        }
      })
    },
    includePoints: function() {
      this.mapCtx.includePoints({
        padding: [10],
        points: [{
          latitude:23.10229,
          longitude:113.3345211,
        }, {
          latitude:23.00229,
          longitude:113.3345211,
        }]
      })
    }
  },
  onReady () {
    this.mapCtx = wx.createMapContext('myMap')
    
  }
}

</script>
<style>
  #myMap {
    height: 100vh;
    width: 100%;
  }
  .tool-btn {
    z-index: 99999;
    position: fixed;
    bottom: 10rpx;
    padding: 50rpx;
  }

</style>
