import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage, removeStorage } from './../config/untils'
import { getAutoLogin, getCartInfo } from './../serve/api/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: {},
    userInfo: {}
  },
  mutations: {
    // 1.添加到购物车
    addToCart (state, { goods_id, goods_name, small_image, goods_price }) {
      let cart = state.cart
      // 判断购物车中是否已经存在该商品
      if (cart[goods_id]) {
        // 存在，数量 +1
        cart[goods_id]['num'] += 1
      } else {
        // 不存在
        cart[goods_id] = {
          num: 1,
          goods_id,
          goods_name,
          small_image,
          goods_price,
          checked: true
        }
      }
      // 产生新对象添加到state中
      state.cart = { ...cart }
      // 存到本地
      // setStorage('cart', state.cart)
    },
    // 2.获取购物车数据
    initCart (state, data) {
      let cartObj = {}
      data.forEach(item => {
        cartObj[item.goods_id] = {
          num: item.num,
          goods_id: item.goods_id,
          goods_name: item.goods_name,
          goods_price: item.goods_price,
          small_image: item.small_image,
          checked: item.checkedcart
        }
      })
      state.cart = cartObj
    },
    // 3.删除商品
    removeGoods (state, { id }) {
      let cart = state.cart
      console.log(cart)
      let goods = cart[id]
      console.log(goods)
      if (goods['count'] > 0) {
        goods['count'] -= 1
        // 如果到了0，则从购物车中删除商品
        if (goods['count'] === 0) {
          delete cart[id]
        }
        // 同步数据
        state.cart = { ...cart }
        setStorage('cart', state.cart)
      }
    },
    // 4.商品选中/取消选中
    goodsSelect (state, id) {
      let cart = state.cart
      // console.log(cart[id].checked)
      cart[id].checked = !cart[id].checked
      // console.log(cart[id].checked)
      state.cart = { ...cart }
      setStorage('cart', cart)
    },
    // 5.全选

    selectAll (state, flag) {
      let cart = state.cart
      Object.values(cart).forEach(item => {
        item.checked = !flag
      })
    },
    // 6.保存用户信息
    saveUserInfo (state, data) {
      console.log(data)
      setStorage('userInfo', data)
      state.userInfo = data
    },
    // 7.获取用户信息

    initUserInfo (state) {
      let userInfo = getStorage('userInfo')
      console.log('自动获取用户信息成功')
      if (userInfo) {
        state.userInfo = JSON.parse(userInfo)
      } else {
        console.log('请登录')
      }
    },
    // 8.退出登录，清除数据
    removeUserData (state) {
      state.userInfo = {}
      removeStorage('userInfo')
    }
  }
})
