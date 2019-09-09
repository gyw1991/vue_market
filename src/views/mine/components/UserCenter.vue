<template>
  <div class="user-center">
    <van-nav-bar title="个人中心" left-text="返回" left-arrow @click-left="$router.go(-1)" />
    <div class="login-out" @click="loginOut">退出登录</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getLoginOut } from './../../../serve/api/index'
import { Toast, Dialog } from 'vant'
export default {
  name: 'UserCenter',
  methods: {
    ...mapMutations(['removeUserData']),
    async loginOut() {
      let res = await getLoginOut()
      if (res.success_code === 200) {
        Toast({
          message: '退出成功',
          duration: 1500
        })
        // 清空本地数据
        this.removeUserData()
        window.setTimeout(() => {
          this.$router.replace('/dashboard/mine')
        }, 1500)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.user-center {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: #f5f5f5;
  .login-out {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    background: white;
    color: #333;
    margin-top: 2rem;
  }
}
</style>