<template>
  <div class="order">
    <div v-if="this.$route.path === '/order'">
      <div class="header">
        <van-nav-bar title="订单中心" left-text="返回" left-arrow @click-left="onClickLeft" />
      </div>
      <div class="content">
        <van-contact-card
          :type="this.address.type"
          @click="showList"
          add-text="添加收货地址"
          :name="address.name"
          :tel="address.tel"
        ></van-contact-card>
        <div class="order-info">
          <van-cell-group>
            <van-cell title="送到时间" :value="sendDate" is-link @click="handleDatePicker" />
            <van-cell :value="`共${checkedGoods.length}件`" is-link center @click="checkOrderList">
              <template slot="title">
                <img width="50px" v-for="goods in checkedGoods" :key="goods.goods_id" :src="goods.small_image" />
              </template>
            </van-cell>
          </van-cell-group>
          <!-- 支付方式选择 -->
          <van-cell-group style="marginTop:10px">
            <van-cell title="支付方式" value="微信支付" />
          </van-cell-group>
          <!-- 备注 -->
          <van-cell-group style="marginTop:10px">
            <van-cell title="备注" value="输入您的备注信息" />
          </van-cell-group>
          <van-cell-group style="marginTop:10px">
            <van-cell title="订单金额" :value="`￥${totalPrice}`" />
            <van-cell title="运送费用" value="包邮" />
          </van-cell-group>
        </div>

        <van-popup v-model="datePickShow" closeable position="bottom" :style="{ height: '30%' }">
          <van-datetime-picker
            type="datetime"
            :min-date="minDate"
            :max-date="maxDate"
            @confirm="onConfirm"
            @cancel="onCancel"
          />
        </van-popup>

        <div class="bottom-submit">
          <van-submit-bar :price="totalPrice*100" button-text="提交订单" @submit="onSubmit" />
        </div>
      </div>
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'Order',
  data() {
    return {
      type: 'add',
      datePickShow: false,
      minDate: new Date(),
      maxDate: new Date(2020, 10, 1),
      sendDate: ''
    }
  },
  methods: {
    // 返回上一页
    onClickLeft() {
      this.$router.push('/dashboard/cart')
    },
    // 选择地址
    showList() {
      this.$router.push('/order/addressList')
    },
    // 提交订单
    onSubmit() {
      alert('提交订单')
    },
    // 选择送达十日
    handleDatePicker() {
      this.datePickShow = true
    },
    // 日期选择确定
    onConfirm(value) {
      console.log(value)
      this.sendDate = moment(value).format('L')
      this.datePickShow = false
    },
    // 日期选择确定
    onCancel() {
      this.datePickShow = false
    },
    // 查看清单详情
    checkOrderList() {
      this.$router.push('/order/orderList')
    }
  },
  computed: {
    ...mapState(['address', 'cart']),
    checkedGoods() {
      let list = []
      Object.values(this.cart).forEach((item, index) => {
        if (item.checked) {
          list.push(item)
        }
      })
      return list.slice(0,3)
    },
    totalPrice() {
      let price = 0
      Object.values(this.cart).forEach((item)=> {
        if (item.checked) {
          price += parseFloat(item.goods_price * item.num)
        }
      })
      return price
    }
  }
}
</script>

<style lang='less' scoped>
.order {
  height: 100%;
  width: 100%;
  position: relative;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
  }
  .content {
    position: absolute;
    top: 50px;
    left: 0;
    bottom: 0;
    right: 0;
    .order-info {
      margin-top: 1rem;
    }
  }
}
</style>