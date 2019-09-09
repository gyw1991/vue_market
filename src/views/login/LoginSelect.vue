<template>
  <div class="login-select">
    <p>选择登陆方式</p>
    <button @click="loginClick()">手机登陆</button>
  </div>
</template>

<script>
export default {
  name: 'LoginSelect',
  methods: {
    loginClick() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='less' scoped>
.login-select {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  p {
    margin-bottom: 2rem;
    font-size: 1.5rem;
  }
  button {
    width: 250px;
    height: 40px;
    background: #75a342;
    color: white;
    border-radius: 5px;
  }
}
</style>