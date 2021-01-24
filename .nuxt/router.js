import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _42d3e0ee = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _4f1394fe = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _d8d159ac = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _3793fdac = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _33ca34c2 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _5a719468 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _69ff7712 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _42d3e0ee,
    children: [{
      path: "",
      component: _4f1394fe,
      name: "home"
    }, {
      path: "/login",
      component: _d8d159ac,
      name: "login"
    }, {
      path: "/register",
      component: _d8d159ac,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _3793fdac,
      name: "profile"
    }, {
      path: "/profile/:username/:favorited",
      component: _3793fdac,
      name: "profilef"
    }, {
      path: "/settings",
      component: _33ca34c2,
      name: "settings"
    }, {
      path: "/editor",
      component: _5a719468,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _69ff7712,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
