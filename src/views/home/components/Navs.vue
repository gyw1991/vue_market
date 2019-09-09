<template>
  <div class="navs">
    <a href="#" v-for="item in navsList" :key="item.cid">
      <img :src="item.icon_url" alt />
      <span>{{item.name}}</span>
    </a>
  </div>
</template>

<script>
export default {
  name: 'homeNavs',
  props: {
    navsList: Array
  }
}
</script>

<style lang='less' scoped>
.navs {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #fff;
  padding-bottom: .5rem;
  a {
    display: inline-block;
    width: 20%;
    text-align: center;
    padding-top: .5rem;
    img {
      width: 3rem;
      height: 3rem;
    }
    span {
      display: block;
      text-align: center;
      font-size: 0.8rem;
      color: #333;
    }
  }
}
</style>