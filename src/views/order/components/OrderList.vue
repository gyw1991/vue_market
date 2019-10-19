<template>
  <div class="order-list">
    <div class="header">
      <van-nav-bar title="订单详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="list">
      <van-card
        v-for="goods in orderList"
        :key="goods.goods_id"
        :num="goods.num"
        :price="goods.goods_price"
        :desc="goods.goods_name"
        :thumb="goods.small_image"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'OrderList',
  methods: {
    onClickLeft() {
      this.$router.push('/order')
    }
  },
  computed: {
    ...mapState(['cart']),
    orderList() {
      let cart = []
      Object.values(this.cart).forEach(item => {
        if (item.checked) {
          cart.push(item)
        }
      })
      return cart
    }
  }
}
</script>

<style lang="less">
.order-list {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f5f5f5;
}
</style>