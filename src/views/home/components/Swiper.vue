<template>
  <div class="swiper">
    <van-swipe :autoplay="2000" indicator-color="#75a342">
      <van-swipe-item v-for="item in swiperList" :key="item.cid">
        <img :src="item.icon_url" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: 'homeSwiper',
  props: {
    swiperList: Array
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 15rem;
  .van-swipe {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>