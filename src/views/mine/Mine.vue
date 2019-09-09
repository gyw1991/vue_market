<template>
  <div id="mine">
    <div v-if="userInfo.token">
      <div class="header">
        <van-nav-bar title="我的" :border="false" />
      </div>
      <router-link tag="div" to="/dashboard/mine/usercenter" class="user-info">
        <van-cell center="true">
          <template slot="title">
            <div class="info">
              <div class="img">
                <img width="50px" :src="userInfo.icon_url" alt />
              </div>
              <div class="des">
                <span class="name">{{userInfo.real_name}}</span>
                <span>手机号：{{userInfo.phone}}</span>
              </div>
            </div>
          </template>
        </van-cell>
      </router-link>
      <van-cell-group>
        <van-cell title="我的订单" value="查看全部订单" is-link icon="label" border />
      </van-cell-group>
      <van-grid>
        <van-grid-item v-for="item in orders" :key="item.text" :icon="item.icon" :text="item.text" />
      </van-grid>
      <van-cell-group>
        <van-cell title="我的优惠卷" value="1张" is-link icon="gold-coin" border />
        <van-cell title="我的收获地址" is-link icon="location" border />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="联系客服" value="客服时间 08:00-21:00" is-link icon="phone" border />
        <van-cell title="意见发聩" is-link icon="smile-comment" border />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="生鲜市场" value="下载APP体验更佳" is-link icon="good-job" border />
      </van-cell-group>
    </div>
    <LoginSelect v-else />
    <router-view></router-view>
  </div>
</template>

<script>
import { getGoodsCart } from './../../serve/api/index'
import LoginSelect from './../login/LoginSelect'
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'Mine',
  data() {
    return {
      orders: [
        {
          text: '待支付',
          icon: 'cart-o'
        },
        {
          text: '待收货',
          icon: 'cart-circle-o'
        },
        {
          text: '待评价',
          icon: 'comment-o'
        },
        {
          text: '售后/退款',
          icon: 'service-o'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['initCart']),
    async reqCartData() {
      let res = await getGoodsCart(this.userInfo.token)
      console.log(res)
      if(res.success_code === 200) {
        this.initCart(res.data)
      }
    } 
  },
  created() {
    // this.reqCartData()
  },
  computed: {
    ...mapState(['userInfo'])
  },
  components: {
    LoginSelect
  }
}
</script>

<style lang='less' scoped>
#mine {
  .van-icon {
    color: #75a342;
  }
  width: 100%;
  height: 100%;
  .header {
    .van-nav-bar {
      background: #75a342;
      .van-nav-bar__title {
        color: #fff;
      }
    }
  }
  .user-info {
    .van-cell {
      background: #75a342;
      color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
      .img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
      }
      .des {
        display: flex;
        flex-direction: column;
        margin: 1rem;
        // align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>