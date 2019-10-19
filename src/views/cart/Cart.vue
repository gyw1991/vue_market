<template>
  <div id="cart">
    <div v-if="userInfo.token">
      <header class="titleWrapper">
        <h4>
          <strong>购物车</strong>
        </h4>
        <span class="clear-cart" @click="handleCartClear()">清空购物车</span>
      </header>
      <div class="contentWrapper">
        <!--中间内容-->
        <main class="contentWrapperList">
          <section>
            <div class="shopCartListCon" v-for="(goods, key) in cart" :key="key">
              <!-- key:{{key}}-----------value:{{goods}}----{{index}} -->

              <div class="left">
                <a
                  href="javascript:;"
                  class="cartCheckBox"
                  :checked="goods.checked"
                  @click="singleSelect(goods.goods_id)"
                ></a>
              </div>
              <div class="center">
                <img :src="goods.small_image" alt />
              </div>
              <div class="right">
                <a href="#">{{goods.goods_name}}</a>
                <div class="bottomContent">
                  <p class="shopPrice">&yen;{{goods.goods_price}}</p>
                  <div class="shopDeal">
                    <span @click="countDecrease(goods)">-</span>
                    <input disabled type="number" v-model="goods.num" />
                    <span @click="countIncrease(goods)">+</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <!--底部通栏-->
        <div class="tabBar">
          <div class="tabBarLeft">
            <a
              href="javascript:;"
              class="cartCheckBox"
              :checked="isSelectAll"
              @click.stop="selectAllGoods"
            ></a>
            <span style="font-size: 16px;">全选</span>
            <div class="selectAll">
              合计：
              <span class="totalPrice">
                <b>￥</b>
                {{totalPrice}}
              </span>
            </div>
          </div>
          <div class="tabBarRight">
            <a href="#" class="pay" @click.stop="goSettlement()">去结算({{selectedNumber}})</a>
          </div>
        </div>
      </div>
    </div>
    <LoginSelect v-else />
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  addToCart,
  goodsSelect,
  initUserInfo
} from 'vuex'
import { Dialog, Toast } from 'vant'
import LoginSelect from './../login/LoginSelect'
import {
  cartNumChange,
  clearCart,
  handleSingleGoods
} from '@/serve/api/index.js'

export default {
  name: 'Cart',
  data() {
    return {
      goodsCount: 0
    }
  },
  methods: {
    ...mapMutations([
      'removeGoods',
      'goodsSelect',
      'addToCart',
      'selectAll',
      'initUserInfo',
      'initCart',
      'clearLocalCart'
    ]),
    async countDecrease(goods) {
      // 商品-1
      // console.log(typeof goods.num)
      let params = {
        user_id: this.userInfo.token,
        goods_id: goods.goods_id,
        type: 'reduce'
      }
      if (goods.num > 1) {
        let res = await cartNumChange(params)
        console.log(res)
        // 减少1
        if (res.success_code === 200) {
          this.removeGoods(goods.goods_id)
        } else {
          Toast({
            message: '操作失败',
            duration: 800
          })
        }
      }
      if (goods.num === 1) {
        // 提示用户
        Dialog.confirm({
          title: '提示',
          message: '确定要将该商品从购物车中移除吗？'
        })
          .then(async () => {
            // on confirm
            let res = await cartNumChange(params)
            if (res.success_code === 200) {
              this.removeGoods(goods.goods_id)
            }
          })
          .catch(() => {
            // on cancel
          })
      }
    },
    async countIncrease(goods) {
      let params = {
        user_id: this.userInfo.token,
        goods_id: goods.goods_id,
        type: 'add'
      }
      let res = await cartNumChange(params)
      console.log(res)
      if (res.success_code === 200) {
        // 商品+1
        this.addToCart({
          goods_id: goods.goods_id,
          goods_name: goods.goods_name,
          small_image: goods.small_image,
          goods_price: goods.goods_price
        })
      }
    },
    // 商品的选中/取消
    async singleSelect(id) {
      let params = {
        user_id: this.userInfo.token,
        goods_id: id
      }
      let res = await handleSingleGoods(params)
      console.log(res)
      if (res.success_code === 200) {
        if (res.data.checked) {
          this.goodsSelect({id, flag:true})
        } else {
          this.goodsSelect({id, flag:false})
        }
      }
    },
    // 购物车全选
    selectAllGoods() {
      this.isSelectAll = !this.isSelectAll
      this.selectAll(this.isSelectAll)
    },
    // 清空购物车
    async handleCartClear() {
      Dialog.confirm({
        title: '提示',
        message: '确定要将该商品从购物车中移除吗？'
      })
        .then(async () => {
          // on confirm
          let res = await clearCart(this.userInfo.token)
          console.log(res.data)
          if (res.data.success_code === 200) {
            this.clearLocalCart()
          }
        })
        .catch(() => {
          // on cancel
        })
    },
    // 跳转到订单结算页面
    goSettlement() {
      this.$router.push('/order')
    }
  },
  computed: {
    ...mapState(['cart', 'userInfo']),
    // 选中商品数量
    selectedNumber() {
      let num = 0
      Object.values(this.cart).forEach(item => {
        if (item.checked) {
          num += item.num
        }
      })
      return num
    },
    // 全选按钮选中/取消选中
    isSelectAll() {
      let tag = this.selectedNumber > 0
      Object.values(this.cart).forEach(item => {
        if (!item.checked) {
          tag = false
        }
      })
      return tag
    },
    // 总价格
    totalPrice() {
      let total = this.typeNumber > 0
      Object.values(this.cart).forEach(item => {
        if (item.checked) {
          // console.log(item.goods_price)
          total += item.goods_price * item.num
        }
      })
      return Number(total).toFixed(2)
    }
  },
  components: {
    LoginSelect
  }
}
</script>

<style lang='less' scoped>
#cart {
  width: 100%;
  height: 100%;
  background: #f5f5f5;

  .titleWrapper {
    width: 100%;
    height: 2.6rem;
    background: #fff;
    -webkit-background-size: 0.1rem 4.4rem;
    background-size: 0.1rem 4.4rem;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    .clear-cart {
      line-height: 2.6rem;
      position: absolute;
      right: 1rem;
      color: red;
    }
  }

  .contentWrapper {
    padding-top: 3.5rem;
  }
}

/*列表内容*/
.contentWrapperList {
  padding-bottom: 6rem;
}

.contentWrapperList section {
  background-color: #fff;
}

.cartCheckBox {
  background: url('./images/shop-icon.png ') no-repeat;
  -webkit-background-size: 2.5rem 5rem;
  background-size: 2.5rem 5rem;
  width: 1rem;
  height: 1rem;
}

.cartCheckBox[checked] {
  background-position: -1.2rem 0;
}

.shopCartListCon {
  display: flex;
  height: 9rem;
  border-bottom: 0.01rem solid #e0e0e0;
  margin-bottom: 0.7rem;
  padding: 0.5rem 0;
}

.shopCartListCon .left {
  flex: 1;
  display: flex;
}

.shopCartListCon .left a {
  display: inline-block;
  margin-top: 0.8rem;
  margin-left: 0.5rem;
}

.shopCartListCon .center {
  flex: 3;
}

.shopCartListCon .center img {
  width: 100%;
  height: 100%;
}

.shopCartListCon .right {
  flex: 6;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 0.5rem;
  margin-right: 0.5rem;

  position: relative;
}

.shopCartListCon .right a {
  height: 2.2rem;
  line-height: 1.2rem;
  overflow: hidden;
  margin-bottom: 0.3rem;
  font-size: 0.8rem;
  color: #000;
}

.shopCartListCon .bottomContent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.shopCartListCon .bottomContent .shopPrice {
  font-size: 0.8rem;
}

.shopCartListCon .right .shopDeal span {
  // display: inline-block;
  width: 1rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  float: left;
}

.shopCartListCon .right .shopDeal input {
  float: left;
  width: 2rem;
  height: 1.2rem;
  text-align: center;
  margin: 0 0.2rem;
  font-size: 0.8rem;
}

/*底部通栏*/
.tabBar {
  position: fixed;
  left: 0;
  bottom: 3.6rem;
  width: 100%;
  height: 3rem;
  background-color: #fff;

  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.01rem solid #e0e0e0;
}

.tabBarLeft {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}

.tabBarLeft .selectAll {
  margin-left: 1rem;
  font-size: 1rem;
}

.totalPrice {
  color: #e9232c;
  font-size: 1.5rem;
  font-style: bold;

  b {
    font-size: 1rem;
  }
}

.tabBarRight .pay {
  width: 5rem;
  height: 2rem;
  background-color: #e9232c;
  border-radius: 1rem;
  margin-right: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  color: #fff;
}
</style>
