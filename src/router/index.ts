import { createRouter, createWebHashHistory } from 'vue-router'
import { constRoutes } from './routes'
import { userStore } from '@/store/module/user'
import Api from '@/utils/api'

const router = createRouter({
	history: createWebHashHistory(),
	routes: constRoutes,
	strict: true,
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export const removeRouteFn: ReturnType<typeof router.addRoute>[] = []

export const changeRemoveRouteFn = (item: ReturnType<typeof router.addRoute>) => {
	removeRouteFn.push(item)
}

export const resetRouter = () => {
	removeRouteFn.forEach(remove => {
		remove()
	})
}

let routeReady = false
router.beforeEach(async (to, from) => {
	const store = userStore()
	const storeToken = store.userInfo.sessionId
	const toPath = to.path
	const toFullPath = to.fullPath
	const isLoginPage = from.path === '/login'

	if (storeToken) {
		if (!routeReady) {
			routeReady = true
			if (isLoginPage) {
				// 登录
				removeRouteFn.splice(0, removeRouteFn.length)
				store.routesHasRights.forEach(item => {
					removeRouteFn.push(router.addRoute('layout', item))
				})
				return {
					path: store.hasOneRouterPath,
					replace: true
				}
			} else {
				// 刷新
				try {
					// const res = await Api.getUserMenu({})
					// if (!res || !res.length) {
					// 	store.setUserInfo()
					// 	routeReady = false
					// 	return '/login'
					// }
					// store.setUserInfo(res)
					// removeRouteFn.splice(0, removeRouteFn.length)
					store.routesHasRights.forEach(item => {
						removeRouteFn.push(router.addRoute('layout', item))
					})
					return toFullPath
				} catch {
					store.setUserInfo()
					routeReady = false
					return '/login'
				}
			}
		}
		// 正常跳转
		if (toPath === '/login' || toPath === '/') {
			return store.hasOneRouterPath
		}
		// 没匹配到路由，停止跳转
		if (!to.matched.length) return false
		return true
	} else {
		// 退出登录
		if (routeReady) {
			resetRouter()
			routeReady = false
		}
		return toPath === '/login' ? true : '/login'
	}
})

export default router