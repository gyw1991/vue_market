<template>
  <div id="dashboard">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
    <!-- 底部tabBar -->
    <van-tabbar v-model="active" active-color="#75a342" inactive-color="#333">
      <van-tabbar-item replace to="/dashboard/home">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? homeIcon.active : homeIcon.normal" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/category">
        <span>分类</span>
        <img slot="icon" slot-scope="props" :src="props.active ? cateIcon.active : cateIcon.normal" />
      </van-tabbar-item>
      <!-- <van-tabbar-item>
        <span>吃什么</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.normal" />
      </van-tabbar-item>-->
      <van-tabbar-item replace to="/dashboard/cart" :info=" tagNum > 0 ? tagNum : '' ">
        <span>购物车</span>
        <img slot="icon" slot-scope="props" :src="props.active ? cartIcon.active : cartIcon.normal" />
      </van-tabbar-item>
      <van-tabbar-item replace to="/dashboard/mine">
        <span>我的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? mineIcon.active : mineIcon.normal" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { getAutoLogin,getCartInfo } from './../../serve/api/index'
import axios from 'axios'
export default {
  name: 'Dashboard',
  data() {
    return {
      active: Number(window.sessionStorage.getItem('tabbarActive')) || 0,
      homeIcon: {
        normal: require('./../../images/tabbar/category_default.png'),
        active: require('./../../images/tabbar/category_selected.png')
      },
      cateIcon: {
        normal: require('./../../images/tabbar/home_default.png'),
        active: require('./../../images/tabbar/home_selected.png')
      },
      cartIcon: {
        normal: require('./../../images/tabbar/shoppingcart_default.png'),
        active: require('./../../images/tabbar/shoppingcart_selected.png')
      },
      mineIcon: {
        normal: require('./../../images/tabbar/mine_default.png'),
        active: require('./../../images/tabbar/mine_selected.png')
      }
    }
  },
  watch: {
    active() {
      // 保存底部激活图标索引
      window.sessionStorage.setItem('tabbarActive', this.active)
    }
  },
  computed: {
    ...mapState(['cart', 'userInfo']),
    tagNum() {
      let num = 0
      if (this.cart) {
        // console.log(Object.values(this.cart))
        // 取出指定对象中所有的value，并以数组的形式返回
        Object.values(this.cart).forEach(item => {
          num += item.num
        })
      }
      return num
    }
  },
  methods: {
    ...mapMutations(['initCart', 'initUserInfo','updateCart']),
  },
  created() {
    //1.自动登录
    this.initUserInfo()
    //2.获取购物车数据
    if(this.userInfo.token) {
      this.initCart(this.userInfo.token)
    }
  }
}
</script>

<style lang='less' scoped>
#dashboard {
  width: 100%;
  height: 100%;
}
</style>