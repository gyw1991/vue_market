import ajax from './ajax'
let baseUrl = 'http://demo.itlike.com/web/xlmc'
// http://demo.itlike.com/web/xlmc/api/homeApi/categories

// 1.数据请求
// 1.1请求首页数据
export const getHomeData = function () {
  return ajax(baseUrl + '/api/homeApi')
}
// 1.2请求分类列表
export const getCategoriesData = function () {
  return ajax(baseUrl + '/api/homeApi/categories')
}
// 1.3请求分类页面商品信息
export const getCategoriesdetail = function (param) {
  return ajax(baseUrl + '/api/homeApi/categoriesdetail/' + param)
}
// 2.登陆请求
// 2.1获取验证码
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

// 3.购物车
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
// 3.2获取购物车数据
export const getCartInfo = function (id) {
  console.log(`user_token:${id}`)
  return ajax(baseUrl + '/api/cart/search/' + id)
}
