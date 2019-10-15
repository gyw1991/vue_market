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
export default {
  name: 'EditAddress',
  data() {
    return {
      areaList: areaList,
      searchResult: []
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onSave() {
      Toast('save')
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
    }
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