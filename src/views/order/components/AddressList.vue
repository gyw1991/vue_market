<template>
  <div class="address-list">
    <div v-if="this.$route.path === '/order/addressList'">
      <div class="header">
        <van-nav-bar title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />
      </div>
      <div class="content">
        <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit" />
      </div>
    </div>
  
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  name: 'AddressList',
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.replace('/order')
    },
    onAdd() {
      Toast('新增地址')
      this.$router.push('/order/addressList/editAddress')
    },
    onEdit(item, index) {
      Toast('编辑地址:' + index)
    }
  },
  created() {
    console.log(this.$route.path)
  }
}
</script>

<style lang="less" scoped>
.address-list {
  height: 100%;
  width: 100%;
}
</style>