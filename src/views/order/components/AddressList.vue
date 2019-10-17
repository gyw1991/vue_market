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
import { getAddressList } from '@/serve/api/index.js'
import { mapState } from 'vuex'
export default {
  name: 'AddressList',
  data() {
    return {
      chosenAddressId: '1',
      list: [
        // {
        //   id: '1',
        //   name: '张三',
        //   tel: '13000000000',
        //   address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        // },
        // {
        //   id: '2',
        //   name: '李四',
        //   tel: '1310000000',
        //   address: '浙江省杭州市拱墅区莫干山路 50 号'
        // }
      ]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.replace('/order')
    },
    onAdd() {
      // Toast('新增地址')
      this.$router.push('/order/addressList/newAddress')
    },
    onEdit(item, index) {
      // Toast('编辑地址:' + index)
      console.log(item, index)
      this.$router.push('/order/addressList/editAddress?address_id=' + item.addressId)
    },
    // 获取用户收获地址
    async _initAddressList() {
      let res = await getAddressList(this.userInfo.token)
      console.log(res)
      if (res.success_code === 200) {
        this.list = []
        let addressArr = res.data
        console.log(res.data)
        addressArr.forEach((item, index) => {
          let obj = {
            id: String(index + 1),
            name: item.address_name,
            tel: item.address_phone,
            address: item.address_area + item.address_area_detail,
            addressId: item._id
          }
          this.list.push(obj)
        });
        console.log(this.list)
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    console.log(this.$route.path)
  },
  mounted() {
    if (this.userInfo.token) {
      this._initAddressList() 
    } else {
      Toast({
        message: '登录已过期，请重新登录',
        duration: 800
      })
      window.setTimeout(()=>{
        this.$router.push('/dashboard/cart')
      },800)
    }
  }
}
</script>

<style lang="less" scoped>
.address-list {
  height: 100%;
  width: 100%;
}
</style>