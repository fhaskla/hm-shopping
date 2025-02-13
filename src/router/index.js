import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/views/Layout/Layout.vue";
import Home from "@/views/Layout/Home.vue";
import My from "@/views/Layout/My.vue";
import Cart from "@/views/Layout/Cart.vue";
import Category from "@/views/Layout/Category.vue";
import store from "@/store";
import {Dialog} from "vant";

Vue.use(VueRouter)

// 重写了push方法，会捕获到push抛出的异常
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function (location) {
  return originalPush.call(this, location).catch(err => console.log(err));
}

// 重写了replace方法，会捕获到replace抛出的异常
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location) {
  return originalReplace.call(this, location).catch(err => console.log(err));
}

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {path: 'home', component: Home},
      {path: 'category', component: Category},
      {path: 'cart', component: Cart},
      {path: 'my', component: My},
    ]
  },
  {path: '/login', component: () => import('@/views/Login/Login.vue')},
  {path: '/search', component: () => import("@/views/Search/Search.vue")},
  {path: '/searchList', component: () => import ("@/views/SearchList/SearchList.vue")},
  {path: '/product/:id', component: () => import ("@/views/Product/Product.vue")},
  // 这几个页面共用的是 vuex 中的数据，所以加了缓存，vuex 中已经有数据了，不要老是重复请求
  {
    path: '/checkout',
    component: () => import ("@/views/Checkout/Checkout.vue"),
    meta: {
      keepAlive: true // 只标记这几个相关页面
    }
  },
  {
    path: '/address',
    component: () => import ("@/views/Address/Address.vue"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/addressEdit',
    component: () => import ("@/views/AddressEdit/AddressEdit.vue"),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/addAddress',
    component: () => import ("@/views/AddAddress/AddAddress.vue"),
    meta: {
      keepAlive: true
    }
  },
  {path: '/orders', component: () => import ("@/views/Orders/Orders.vue")},
  {path: '/orderDetail', component: () => import ("@/views/OrderDetail/OrderDetail.vue")},
]

const router = new VueRouter({
  routes
})

const authUrls = ['/checkout', '/orders', '/cart', '/checkout', '/address', '/addressEdit',
  '/addAddress', '/orders', '/orderDetail', '/my']

router.beforeEach((to, from, next) => {

  // console.log(to, '@@@',from)
  if (!authUrls.includes(to.path)) return next() // 非权限页面直接放行

  // 权限页面判断token
  const token = store.getters.token

  if (token) next()
  else {
    Dialog.confirm({
      title: '温馨提示',
      message: '此时需要先登录才能继续操作哦',
      confirmButtonText: '去登录',
      cancelButtonText: '再逛逛'
    })
      .then(() => {
        // 确认按钮
        next({
          // 如果是外部访问权限页面，会往页面历史记录里加入权限页面，你得想办法把这个权限页面从页面历史记录干掉
          // 此时from.matched.length会是0，此时replace就是true，会把权限页面从页面历史记录干掉
          // 如果是内部访问权限页面，权限页面不会加入页面历史记录，因为路由给他拦住了
          // 此时from.matched.length不会是0，此时replace就是false，不会把权限页面从页面历史记录干掉
          replace: !from.matched.length,
          path: '/login',
          query: {
            // 为什么是undefined，
            // 内部访问，举个例子，home ->× cart =》 home -> login
            // 那这样 from 应该是 home，为什么是 undefined 呢？login 的返回按钮其实就两种状态，要么返回 from 要么返回上一级
            // 你这里给了 from 为 home ，如果点击了 login 的返回按钮，就会出现 home -> home，所以这里选择不给 from
            // 不登录的结果就是 home -> login，登录成功的结果就是 home -> cart，完美
            // 外部访问 cart，那 from 自然就是undefined
            fromUrl: undefined,
            toUrl: to.fullPath // 登录成功跳转的地址
          }
        })
      })
      .catch(() => {
        // 取消按钮
        // 因为从网页外部访问'/home'，from.fullPath 默认是'/'，from.matched 默认是空数组，to.fullPath 是'/home'
        // 所以从网页外部访问权限页面，会往页面历史记录里加入权限页面
        // 点击了取消按钮，就next返回首页，并且得把权限页面从页面历史记录中干掉
        // 如果是在网页内部访问了权限页面，权限页面不会加入页面历史记录，因为路由给他拦住了
        // 点击了取消按钮，那就啥也不做，不执行next，对应的权限页面过不去，就停留在当前页面
        if (!from.matched.length) {
          next({
            path: '/',
            replace: true
          })
        }
      })
  }
})

export default router
