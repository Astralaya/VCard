<template>
	<div class="page">
		<div class="news-wrap">
			<news-item v-for="news of news.newslist" :news="news" :key="news.newsid"></news-item>
		</div>
	</div>
</template>

<script>
import api from '@/utils/api'
import newsItem from '@/components/news-item/news-item'
import { formatTime } from '@/utils'

var list = {
  "toplist": [],
  "newslist": [
    {
      "newsid": 352503,
      "title": "可变光圈让三星Galaxy S9拍照获得质变了吗？",
      "postdate": "2018-03-25T09:24:38.957",
      "description": "在智能手机的拍照水平愈发提升的今天，使用手机拍照已经是信手拈来的日常操作，而拥有一部旗舰手机——尤其它还处于智能手机拍照第一梯队的情况下，更是会让拍照变得非常舒服自在",
      "image": "http://img.ithome.com/newsuploadfiles/thumbnail/2018/3/352503_240.jpg",
      "hitcount": 403,
      "commentcount": 13,
      "cid": 74,
      "url": "/html/android/352503.htm"
    },
    {
      "newsid": 352503,
      "title": "可变光圈让三星Galaxy S9拍照获得质变了吗？",
      "postdate": "2018-03-25T09:24:38.957",
      "description": "在智能手机的拍照水平愈发提升的今天，使用手机拍照已经是信手拈来的日常操作，而拥有一部旗舰手机——尤其它还处于智能手机拍照第一梯队的情况下，更是会让拍照变得非常舒服自在",
      "image": "http://img.ithome.com/newsuploadfiles/thumbnail/2018/3/352503_240.jpg",
      "hitcount": 403,
      "commentcount": 13,
      "cid": 74,
      "url": "/html/android/352503.htm"
    },
    {
      "newsid": 352503,
      "title": "可变光圈让三星Galaxy S9拍照获得质变了吗？",
      "postdate": "2018-03-25T09:24:38.957",
      "description": "在智能手机的拍照水平愈发提升的今天，使用手机拍照已经是信手拈来的日常操作，而拥有一部旗舰手机——尤其它还处于智能手机拍照第一梯队的情况下，更是会让拍照变得非常舒服自在",
      "image": "http://img.ithome.com/newsuploadfiles/thumbnail/2018/3/352503_240.jpg",
      "hitcount": 403,
      "commentcount": 13,
      "cid": 74,
      "url": "/html/android/352503.htm"
    }
  ]
}

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
      }
    }
  },
  mounted () {
    // this.getSlides()
    this.getNewslist(2, true)
  },
  onPullDownRefresh () {
    // this.getNewslist(2, true)
  },
  onReachBottom () {
    if (this.loading) return
    const { newslist } = this.news
    const lastnews = newslist[newslist.length - 1]
    this.getNewslist(Date.parse(new Date(lastnews.postdate)))
  },
  methods: {
    getNewslist (r = Date.now(), init) {
      this.loading = true
      wx.showNavigationBarLoading()
      const news = list
      news.newslist.forEach((news) => {
        // news.postdate = formatTime(news.postdate)
        news.link = `/pages/ndetail/ndetail?id=${news.newsid}&title=${news.title}`
      })
      if (init) {
        this.news = news
        wx.stopPullDownRefresh()
      } else {
        this.news.toplist = this.news.toplist.concat(news.toplist)
        this.news.newslist = this.news.newslist.concat(news.newslist)
      }
      wx.hideNavigationBarLoading()
      this.loading = false
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
