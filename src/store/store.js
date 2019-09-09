import Vue from 'vue';
import Vuex from 'vuex';
import { getStorage, setStorage, removeStorage } from './../config/untils';
import { getAutoLogin } from './../serve/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		cart: {},
		userInfo: {}
	},
	mutations: {
		// 1.添加到购物车
		addToCart(state, { id, name, small_image, price }) {
			let cart = state.cart;
			// 判断购物车中是否已经存在该商品
			if (cart[id]) {
				// 存在，数量 +1
				cart[id]['count'] += 1;
			} else {
				// 不存在
				cart[id] = {
					count: 1,
					id,
					name,
					small_image,
					price,
					checked: true
				};
			}
			// 产生新对象添加到state中
			state.cart = { ...cart };
			// 存到本地
			setStorage('cart', state.cart);
		},
		// 2.获取购物车数据
		initCart(state, data) {
			// let cart = getStorage('cart');
			// if (cart) {
			// 	state.cart = JSON.parse(cart);
			// }
			console.log(data);
			state.cart = data;
		},
		// 3.删除商品
		removeGoods(state, { id }) {
			let cart = state.cart;
			console.log(cart);
			let goods = cart[id];
			console.log(goods);
			if (goods['count'] > 0) {
				goods['count'] -= 1;
				// 如果到了0，则从购物车中删除商品
				if (goods['count'] === 0) {
					delete cart[id];
				}
				// 同步数据
				state.cart = { ...cart };
				setStorage('cart', state.cart);
			}
		},
		// 4.商品选中/取消选中
		goodsSelect(state, id) {
			let cart = state.cart;
			// console.log(cart[id].checked)
			cart[id].checked = !cart[id].checked;
			// console.log(cart[id].checked)
			state.cart = { ...cart };
			setStorage('cart', cart);
		},
		// 5.全选
		selectAll(state, flag) {
			let cart = state.cart;
			Object.values(cart).forEach((item) => {
				item.checked = !flag;
			});
		},
		// 6.保存用户信息
		saveUserInfo(state, data) {
			console.log(data);
			setStorage('userInfo', data);
			state.userInfo = data;
		},
		// 7.获取用户信息
		initUserInfo(state) {
			let userInfo = getStorage('userInfo');
			if (userInfo) {
				state.userInfo = JSON.parse(userInfo);
			} else {
        console.log('请登录')
      }
		},
		// 8.退出登录，清除数据
		removeUserData(state) {
			state.userInfo = {};
			removeStorage('userInfo');
		}
	},
	actions: {
		// 自动登录
		async reqAutoLogin({ commit }) {
			// let userInfo = JSON.parse(getStorage('userInfo'));

			// 网络请求
			let res = await getAutoLogin();
			console.log(res);
			if (res.success_code === 200) {
				// commit(saveUserInfo,res.data)
				console.log(res);
			}
		}
	}
});
