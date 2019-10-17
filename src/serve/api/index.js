import ajax from './ajax'
import axios from 'axios'
let baseUrl = 'http://demo.itlike.com/web/xlmc'
// http://demo.itlike.com/web/xlmc/api/homeApi/categories

// 1 数据请求
// 1.1 请求首页数据
export const getHomeData = function () {
  return ajax(baseUrl + '/api/homeApi')
}
// 1.2 请求分类列表
export const getCategoriesData = function () {
  return ajax(baseUrl + '/api/homeApi/categories')
}
// 1.3 请求分类页面商品信息
export const getCategoriesdetail = function (param) {
  return ajax(baseUrl + '/api/homeApi/categoriesdetail/' + param)
}
// 2 登陆请求
// 2.1 获取验证码
export const getVcode = function (phone) {
  return ajax(baseUrl + '/api/send_code', { phone })
}
// 2.2验证码登陆
export const codeLogin = function (params) {
  return ajax(baseUrl + '/api/login_code', params, 'POST')
}
// 2.3退出登陆
export const getLoginOut = function () {
  return ajax(baseUrl + '/api/logout')
}
// 2.4自动登录
export const getAutoLogin = function () {
  return ajax(baseUrl + '/api/userinfo')
}

// 3 购物车
// 3.1 添加到购物车
export const postToCart = function ({ user_id, goods_id, goods_name, goods_price, small_image }) {
  return ajax(
    baseUrl + '/api/cart/add',
    {
      user_id,
      goods_id,
      goods_name,
      goods_price,
      small_image
    },
    'POST'
  )
}
// 3.2 获取购物车数据
export const getCartInfo = function (id) {
  console.log(`user_token:${id}`)
  return ajax(baseUrl + '/api/cart/search/' + id)
}

// 3.3 修改购物车商品数量
/*
user_id,
goods_id,
type:{add, reduce}
*/
export const cartNumChange = function (params) {
  console.log(params)
  return ajax(baseUrl + '/api/cart/num', params, 'POST')
}

// 3.4 清空购物车
export const clearCart = function (userId) {
  console.log(userId)
  return axios.get(baseUrl + '/api/cart/clear/' + userId)
}

// 4.收获地址管理
// 4.1 获取收获地址列表
export const getAddressList = (userId) => {
  console.log(baseUrl + '/api/address/search/' + userId)
  return ajax(baseUrl + '/api/address/search/' + userId)
}

/// 4.2 添加收获地址
/**
 *
 * @param ：{user_id, address_name, address_phone, address_area, address_area_detail,
address_post_code, address_tag, province, city, county, areaCode}
 */
export const newAddress = (params) => {
  console.log(params)
  return ajax(baseUrl + '/api/address/add', params, 'POST')
}

// 4.3 获取修改要修改的地址
export const editAddress = function (params) {
  console.log(params)
  return ajax(baseUrl + '/api/address/one', params, 'POST')
}

// 4.4 提交修改后的地址
export const updateAddress = function (params) {
  console.log(params)
  return ajax(baseUrl + '/api/address/edit', params, 'POST')
}
// 4.5删除地址
export const deleteAddress = function(addressId) {
  console.log(addressId)
  return ajax(baseUrl + '/api/address/del/' + addressId)
}
