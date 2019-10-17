<template>
  <div class="new-address">
    <div class="heade">
      <van-nav-bar title="新增地址" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-set-default
        @save="onSave"
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
  name: 'NewAddress',
  data() {
    return {
      areaList,
      searchResult: []
    }
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.go(-1)
    },
    // 保存地址
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
      // 发送请求
      let res = await newAddress(params)
      if (res.success_code === 200) {
        Toast({
          message: '添加成功',
          duration: 500
        })
        this.$router.go(-1)
      }
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