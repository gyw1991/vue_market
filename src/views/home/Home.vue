<template>
  <div id="home">
    <div class="loading" v-if="showLoading">
      <van-loading type="circular" color="#75a342">数据加载中...</van-loading>
    </div>
    <div v-else>
      <Header />
      <Swiper :swiperList="swiperList" />
      <Navs :navsList="navsList" />
      <FlashSale :flashSaleList="flashSaleList" />
      <Like :likeList="likeList" />
      <Anchor :scrollToTop="scrollToTop" v-show="anchorShow" />
    </div>
  </div>
</template>

<script>
import { getHomeData, postToCart } from './../../serve/api/index'
import { showBack, animate } from './../../config/untils'
import { Toast } from 'vant'
import PubSub from 'pubsub-js'
import Header from './components/Header'
import Swiper from './components/Swiper'
import Navs from './components/Navs'
import FlashSale from './components/FlashSale'
import Like from './components/Like'
import Anchor from './components/anchor'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'Home',
  created() {
    // 获取首页数据
    this.reqHomeData()
  },
  data() {
    return {
      showLoading: true,
      anchorShow: false,
      swiperList: [],
      navsList: [],
      flashSaleList: [],
      likeList: []
    }
  },
  methods: {
    ...mapMutations(['initUserInfo', 'addToCart']),
    // 请求首页数据
    async reqHomeData() {
      let res = await getHomeData()
      // console.log(res)
      if (res.success) {
        this.swiperList = res.data.list[0].icon_list
        this.showLoading = false
        this.navsList = res.data.list[2].icon_list
        this.flashSaleList = res.data.list[3].product_list
        this.likeList = res.data.list[12].product_list
        // console.log(res.data.list)
        // 监听滚动，显示/印象锚点按钮
        showBack(flag => {
          this.anchorShow = flag
        })
      }
    },
    // 滚动到顶部
    scrollToTop() {
      let dom = document.documentElement || document.body
      animate(dom, { scrollTop: '0' }, 400, 'ease-out')
    },
    // 购物车添加
    async handleAddCart(goods) {
      console.log(goods)
      console.log(this.userInfo.token)
      let res = await addToCart(
        this.userInfo.token,
        goods.id,
        goods.name,
        goods.price,
        goods.small_image
      )
      console.log(res)
    }
  },
  components: {
    Header,
    Swiper,
    Navs,
    FlashSale,
    Like,
    Anchor
  },
  mounted() {
    // this.initUserInfo()
    // 订阅消息（添加到购物车）
    PubSub.subscribe('HomeAddToCart', (msg, goods) => {
      if (msg === 'HomeAddToCart') {
        // 判断用户是否登陆
        if (this.userInfo.token) {
          // this.handleAddCart(goods)
          this.addToCart(goods)
          Toast({
            message: '成功添加到购物车',
            duration: 1000
          })
        } else {
          Toast('请先登录')
          this.$router.push('/login')
        }
      }
    })
  },
  computed: {
    ...mapState(['userInfo'])
  },
  beforeDestroy() {
    PubSub.unsubscribe('HomeAddToCart')
  }
}
</script>

<style lang='less' scoped>
#home {
  width: 100%;
  // height: 300%;
  .loading {
    position: fixed;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
  }
}
</style>