<template>
  <a class="news-item" @click="goto(news)">
    <img class="news-img" :src="news.strTitleUrl" mode="aspectFill">
    <div class="news-text">
      <div class="news-title">{{news.strTitle}}</div>
      <div class="news-info">
        <text>{{news.dCreateTime}}</text>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      default: {}
    }
  },
  methods: {
    goto(item) {
      this.$emit("linkClick", item);
    }
  }
};
</script>

<style>
.news-item {
  display: flex;
  height: 90px;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.news-img {
  width: 100px;
  height: 75px;
  margin-right: 10px;
}
.news-text {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.news-title {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.news-info {
  color: #aaa;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
