import Vue from 'vue'
import {
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Loading,
  Toast,
  Dialog,
  NavBar,
  ContactEdit,
  AddressList,
  AddressEdit,
  CellGroup,
  SubmitBar,
  Popup,
  ContactCard,
  ContactList,
  Cell,
  Grid,
  GridItem,
  DatetimePicker,
  Card
} from 'vant'

// 底部Tabbar
Vue.use(Tabbar).use(TabbarItem)
// 首页轮播
Vue.use(Swipe).use(SwipeItem)
// loading..
Vue.use(Loading)
//  Toast
Vue.use(Toast)
// Dialog
Vue.use(Dialog)
// 导航栏
Vue.use(NavBar)
// 联系人
Vue.use(ContactCard).use(ContactList).use(ContactEdit)
// 地址列表
Vue.use(AddressList)
// 地址编辑
Vue.use(AddressEdit)
// 单元格
Vue.use(Cell).use(CellGroup)
// 提交订单栏
Vue.use(SubmitBar)
// 单元格
Vue.use(Grid).use(GridItem)
// 弹出层
Vue.use(Popup)
// 日期选择
Vue.use(DatetimePicker)
// 商品卡片
Vue.use(Card)
