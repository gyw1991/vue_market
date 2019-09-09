import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Dashboard from './../views/dashboard/Dashboard.vue';

const Home = () => import('./../views/home/Home.vue');
const Cart = () => import('./../views/cart/Cart.vue');
const Category = () => import('./../views/category/Category.vue');
const Mine = () => import('./../views/mine/Mine.vue');
const Order = () => import('./../views/order/Order.vue');
const AddressList = () => import('./../views/order/components/AddressList.vue');
const EditAddress = () => import('./../views/order/components/subs/EditAddress.vue');
const Login = () => import('./../views/login/Login.vue');
const UserCenter = () => import('./../views/mine/components/UserCenter.vue');

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/dashboard'
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard,
			children: [
				{
					path: '/dashboard',
					redirect: '/dashboard/home'
				},
				{
					path: 'home',
					name: 'Home',
					component: Home,
					meta: { keepAlive: true }
				},
				{
					path: 'category',
					name: 'Category',
					component: Category,
					meta: { keepAlive: true }
				},
				{
					path: 'cart',
					name: 'Cart',
					component: Cart
				},
				{
					path: 'mine',
					name: 'Mine',
					component: Mine,
					children: [
						{
							path: 'usercenter',
							component: UserCenter,
							name: 'UserCenter'
						}
					]
				}
			]
		},
		{
			path: '/order',
			name: 'Order',
			component: Order,
			children: [
				{
					path: 'addressList',
					name: 'AddressList',
					component: AddressList,
					children: [
						{
							path: 'editAddress',
							component: EditAddress,
							name: 'EditAddress'
						}
					]
				}
			]
		},
		{
			path: '/login',
			component: Login,
			name: 'Login'
		}
	]
});
