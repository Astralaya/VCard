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
    commentHref () {
      return `/pages/ncomment/ncomment?id=${this.id}`
    }
  },
  mounted () {
    this.id = this.$root.$mp.query.id
    this.title = this.$root.$mp.query.title
    this.getNews()
    // this.getRelatedNews()
  },
  onUnload () {
    this.show = false
  },
  methods: {
    async getNews () {
      wx.showNavigationBarLoading()
      let { id } = this
      id = `${id.slice(0, 3)}/${id.slice(3, 6)}`
      const news = detail
      const parsedNews = xml2json(news).rss.channel.item
      this.news = {
        newssource: parsedNews.newssource['#text'],
        detail: parsedNews.detail['#text'].replace(/<img/g, '<img width="100%"'),
        newsauthor: parsedNews.newsauthor['#text']
      }
      wx.hideNavigationBarLoading()
      this.show = true
    },
    async getRelatedNews () {
      const newslist = await api.getRelatedNews(this.id)
      const parsedNews = JSON.parse(newslist.replace('var tag_jsonp =', ''))
      this.relatedNews = parsedNews.map(news => {
        return {
          title: news.newstitle,
          image: news.img,
          link: `/pages/ndetail/ndetail?id=${news.newsid}&title=${news.newstitle}`,
          postdate: news.postdate
        }
      })
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
