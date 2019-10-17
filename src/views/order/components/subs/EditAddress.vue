<template>
  <div class="edit-address">
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-postal
      show-delete
      show-set-default
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>
<script>
import areaList from '@/config/area.js'
import { editAddress, updateAddress, deleteAddress } from '@/serve/api/index.js'
import { mapState } from 'vuex'
import { Toast } from 'vant'
export default {
  name: 'EditAddress',
  data() {
    return {
      areaList,
      addressInfo: {}
    }
  },
  mounted() {
    let addressId = this.$route.query.address_id
    this._reqCurAddress(addressId)
  },
  methods: {
    async onSave(content) {
      // Toast('save')
      console.log(content)
      let params = {
        address_id: content.id,
        user_id: this.userInfo.token,
        address_name: content.name,
        address_phone: content.tel,
        address_area: content.province + content.county,
        address_area_detail: content.addressDetail,
        address_post_code: content.postalCode,
        address_tag: content.isDefault,
        province: content.province,
        city: content.city,
        county: content.county,
        areaCode: content.areaCode
      }
      let res = await updateAddress(params)
      if (res.success_code === 200) {
        Toast({
          message: '修改成功',
          duration: 800
        })
        window.setTimeout(() => {
          this.$router.go(-1)
        }, 800)
      }
    },
    async onDelete() {
      let res = await deleteAddress(this.addressInfo.id)
      console.log(res)
      this.$router.go(-1)
    },
    async _reqCurAddress(id) {
      let res = await editAddress({
        user_id: this.userInfo.token,
        address_id: id
      })
      console.log(res)
      if (res.success_code === 200) {
        let data = res.data
        let addressInfo = {
          id: data._id,
          name: data.address_name,
          tel: data.address_phone,
          province: data.province,
          city: data.city,
          county: data.county,
          addressDetail: data.address_area_detail,
          areaCode: data.areaCode,
          postalCode: data.address_post_code,
          isDefaule: false
        }
        this.addressInfo = addressInfo
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style lang="less">
</style>