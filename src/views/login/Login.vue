<template>
  <div class="login">
    <div class="login-header">
      <a href="javascript:;" :class="{active:loginMode}" @click.prevent="modeClick(true)">手机登陆</a>
      <a href="javascript:;" :class="{active:!loginMode}" @click.prevent="modeClick(false)">账号登陆</a>
    </div>
    <div class="login-content">
      <!-- 手机登陆 -->
      <div class="phone-login" v-if="loginMode">
        <div class="phone">
          <input type="number" placeholder="手机号码" v-model="phone" />
          <button
            @click.prevent="getCode"
            v-if="!countDown"
            :disabled="!phoneCheck"
            class="get-code"
            :class="{enable:phoneCheck}"
          >获取验证码</button>
          <button v-else class="count-down">已发送({{countDown}}s)</button>
        </div>
        <div class="password v-code">
          <input type="text" placeholder="验证码" v-model="vCode" />
        </div>
      </div>
      <!-- 账户登陆 -->
      <div class="count-login" v-else>
        <div class="count">
          <input type="number" placeholder="账号" />
        </div>
        <div class="password">
          <input type="password" placeholder="密码" autocomplete="off" v-if="true" />
          <input type="text" autocomplete="off" placeholder="密码" v-else />
          <div class="pic-switch">
            <img src="./images/show_pwd.png" v-if="true" />
            <img src="./images/hide_pwd.png" v-else />
          </div>
        </div>
        <div class="code">
          <input type="text" maxlength="4" placeholder="输入右侧图片上的验证码" />
          <img src="http://demo.itlike.com/web/xlmc/api/captcha" />
        </div>
      </div>
      <div class="btn">
        <button class="login-btn" @click.prevent="login">登录</button>
      </div>
      <div class="btn">
        <button class="back-btn" @click.prevent="back">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getVcode, codeLogin } from './../../serve/api/index'
import { Toast } from 'vant'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      loginMode: true,
      countDown: 0,
      phone: '',
      vCode: ''
    }
  },
  methods: {
    // 保存用户信息
    ...mapMutations(['saveUserInfo']),
    // 登录模式切换
    modeClick(flag) {
      this.loginMode = flag
    },
    // 获取验证码
    async getCode() {
      let res = await getVcode(this.phone)
      if (res.success_code === 200) {
        console.log(res.code)
        this.countDown = 5
        this.timer = window.setInterval(() => {
          this.countDown -= 1
          if (this.countDown === 0) {
            window.clearInterval(this.timer)
          }
        }, 1000)
      }
    },
    // 登录
    async login() {
      if (this.loginCheck) {
        let obj = {
          phone: this.phone,
          code: this.vCode
        }
        let res = await codeLogin(obj)
        console.log(res)
        if (res.success_code === 200) {
          Toast({
            message: '登录成功',
            duration: 1000
          })
          this.saveUserInfo(res.data)
          this.$router.push('/dashboard/mine')
        } else {
          Toast({
            message: '登录失败，手机或验证码不正确!',
            duration: 1000
          })
        }
      } else {
        Toast({
          message: '登录失败，请检查输入的信息',
          duration: 1000
        })
      }
    },
    // 返回
    back() {
      this.$router.go(-1)
    }
    
  },
  computed: {
    phoneCheck() {
      return /^1[3456789]\d{9}$/.test(this.phone)
    },
    loginCheck() {
      return this.phoneCheck && /^\d{6}$/.test(this.vCode)
    }
  }
}
</script>

<style lang='less' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .login-header {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-bottom: 2rem;
    a {
      color: #333;
      font-size: 1.2rem;
    }
    .active {
      color: #75a342;
      border-bottom: 1px solid #75a342;
    }
  }
  .login-content {
    width: 100%;
    input {
      border-radius: 5px;
      outline: none;
      border: none;
      box-sizing: border-box;
      padding-left: 0.5rem;
    }
    .btn {
      width: 100%;
      text-align: center;
      margin-top: 1rem;
      button {
        width: 20rem;
        height: 3rem;
        border-radius: 5px;
      }
      .login-btn {
        color: white;
        background: #75a342;
        margin-bottom: 1rem;
        color: white;
      }
      .back-btn {
        border: 1px solid #75a342;
        background: #fff;
      }
    }
    .phone-login {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow: hidden;
      .phone,
      .password {
        width: 20rem;
        height: 3rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        margin-bottom: 1rem;
        input {
          box-sizing: border-box;
          height: 100%;
          width: 14rem;
          padding-left: 0.5rem;
        }
      }
      .phone {
        position: relative;
        button {
          position: absolute;
          right: 0;
          top: 0;
          width: 5.5rem;
          height: 3rem;
          background: transparent;
          color: #75a342;
          text-align: center;
          font-size: 1rem;
          &.get-code {
            color: #ccc;
            &.enable {
              color: #75a342;
            }
          }
        }
      }
      .v-code {
        input {
          width: 100%;
        }
      }
    }
    .count-login {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      .count {
        width: 20rem;
        height: 3rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        margin-bottom: 1rem;
        input {
          width: 100%;
          height: 3rem;
        }
      }
      .password {
        width: 20rem;
        height: 3rem;
        position: relative;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        margin-bottom: 1rem;

        input {
          width: 17rem;
          height: 3rem;
          position: absolute;
          left: 0;
          top: 0;
        }
        .pic-switch {
          width: 3rem;
          height: 3rem;
          position: absolute;
          right: 0;
          top: 0;
          margin-bottom: 1rem;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .code {
        width: 20rem;
        height: 3rem;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        display: flex;
        input {
          width: 70%;
          height: 3rem;
        }
        img {
          width: 30%;
          height: 3rem;
        }
      }
    }
  }
}
</style>