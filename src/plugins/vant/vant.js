import Vue from 'vue';
// 底部Tabbar
import { Tabbar, TabbarItem } from 'vant';
Vue.use(Tabbar).use(TabbarItem);
// 首页轮播
import { Swipe, SwipeItem } from 'vant';
Vue.use(Swipe).use(SwipeItem);
// loading..
import { Loading } from 'vant';
Vue.use(Loading);
//  Toast
import { Toast } from 'vant';
Vue.use(Toast);
// Dialog
import { Dialog } from 'vant';
Vue.use(Dialog);
// 导航栏
import { NavBar } from 'vant';
Vue.use(NavBar);
// 联系人
import { ContactCard, ContactList, ContactEdit } from 'vant';
Vue.use(ContactCard).use(ContactList).use(ContactEdit);
// 地址列表
import { AddressList } from 'vant';
Vue.use(AddressList);
// 地址编辑
import { AddressEdit } from 'vant';
Vue.use(AddressEdit);
// 单元格
import { Cell, CellGroup } from 'vant';
Vue.use(Cell).use(CellGroup);
// 提交订单栏
import { SubmitBar } from 'vant';
Vue.use(SubmitBar);
// grid
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);
