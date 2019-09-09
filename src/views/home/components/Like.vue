<template>
  <div class="like">
    <div class="title">
      <span></span>
      <h3>猜你喜欢</h3>
      <span></span>
    </div>
    <div class="item-list">
      <LikeItem v-for="item in likeList" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import LikeItem from './../../../components/LikeItem'
export default {
  name: 'Like',
  props: {
    likeList: Array
  },
  components: {
    LikeItem
  }
}
</script>

<style lang='less' scoped>
.like {
  .title {
    width: 100%;
    height: 3rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    h3 {
      margin: 0 2rem;
      color: #333;
    }
    span {
      width: 30%;
      height: 1px;
      background: rgba(0, 0,0, .1);
    }
  }
  .item-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-bottom: 4rem;
  }
}
</style>