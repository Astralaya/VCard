<template>
<div class="page">
	<div class="header">
		<h1 class="news-title">{{ title }}</h1>
		<div class="auth-info">{{news.newssource}}({{news.newsauthor}})</div>
	</div>
	<rich-text class="news-content" :nodes="news.detail">
	</rich-text>
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
      show: false,
      id: null,
      title: '',
      news: {},
      relatedNews: []
    }
  },
  computed: {
    
  },
  onPullDownRefresh () {
    this.getData()
  },
  mounted () {
    this.getData()
  },
  onUnload () {
  },
  methods: {
    async getData() {
      const obj = this.$root.$mp.query
      var _this = this;
      var par = {
        '$rowIndex': 1,
        '$id' : obj.id
      }
      const res = await api.get_PropagandaColumn(par)
      var item = res.dgData[0]
      this.title = item.strTitle
      this.news.newsauthor = item.dCreateTime
      this.news.newssource = item.strName
      this.news.detail = item.strContent
      wx.stopPullDownRefresh();
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #fff;
  background-color: #7f81f8;
  padding: 10px;
  box-sizing: border-box;
}
.news-title {
  font-size: 22px;
}
.auth-info {
  font-size: 12px;
  margin-top: 10px;
  align-self: flex-end;
}
.news-content {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
  line-height: 1.6;
}

.related-title {
  font-size: 18px;
  font-weight: 600;
  align-self: flex-start;
  border-left: 4px solid #7f81f8;
  padding: 2px 5px;
}

.news-wrap {
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}

.comment-btn {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #7f81f8;
  position: fixed;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.comment-icon {
  width: 40px;
  height: 40px;
}
</style>
