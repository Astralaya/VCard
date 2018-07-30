<template>
	<div class="page">
		<div class="news-wrap">
			<news-item v-for="news of news.newslist" :news="news" :key="news.newsid" @linkClick="linkClick"></news-item>
		</div>
	</div>
</template>

<script>
import api from '@/utils/api'
import newsItem from '@/components/news-item/news-item'

export default {
  components: {
    newsItem
  },
  data () {
    return {
      loading: false,
      slides: [],
      news: {
        toplist: [],
        newslist: []
      },
      par : {
        $rowIndex: 0
      }
    }
  },
  mounted () {
    this.list = [];
    this.getData()
  },
  onPullDownRefresh () {
    this.news.newslist = []
    this.par['$rowIndex'] = 0
    this.getData()
  },
  onReachBottom () {
    this.getData()
  },
  methods: {
    async getData() {
      var _this = this;
      this.par['$rowIndex']++
      const res = await api.get_PropagandaColumn(this.par)
      const dgData = res.dgData
      dgData.map(item => {
        _this.news.newslist.push(item)
      })
      wx.stopPullDownRefresh();
    },
    linkClick(item) {
      var par = {
        id: item.id
      }
      this.$router.open({
        name: "文章详情",
        url: "../ndetail/ndetail",
        type: "PUSH",
        params: {
          params: par
        }
      })
    }
  }
}
</script>

<style>
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}
.slider-wrap {
  width: 375px;
  height: 200px;
}
.slider-item {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.slider-title {
  position: absolute;
  top: 10px;
  right: 0;
  background-color: rgba(0, 0, 0, .3);
  color: #fff;
  padding: 2px 6px;
  font-size: 18px;
}
.slider-img {
  width: 100%;
  height: 100%;
}

.news-wrap {
  padding: 0 10px;
}
</style>
