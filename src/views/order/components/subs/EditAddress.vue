<template>
  <div class="edit-address">
    <div class="heade">
      <van-nav-bar title="新增地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :search-result="searchResult"
        @save="onSave"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import areaList from '@/config/area.js'
import { newAddress,editAddress } from '@/serve/api/index.js'
import { mapState } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'EditAddress',
  data() {
    return {
      areaList: areaList,
      searchResult: [],
      addressId: null
    }
  },
  mounted() {
    let addressId = this.$route.query.address_id
    console.log(addressId)
    this._reqCurAddress(addressId)

  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    async onSave(content) {
      // Toast('save')
      console.log(content)
      let params = {
        user_id: this.userInfo.token,
        address_name: content.name,
        address_phone: content.tel,
        address_area: content.province+content.county,
        address_area_detail: content.addressDetail,
        address_post_code: content.postalCode,
        address_tag: content.isDefault,
        province: content.province,
        city: content.city,
        county: content.county,
        areaCode: content.areaCode
      }

      let res = await newAddress(params)
      if (res.success_code === 200) {
        Toast({
          message: '添加成功',
          duration: 500
        })
        this.$router.go(-1)
      }
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }
        ]
      } else {
        this.searchResult = []
      }
    },
    async _reqCurAddress(id) {
      let res = await editAddress({user_id: this.userInfo.token, address_id: id})
      console.log(res)
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang='less' scoped>
.edit-address {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>