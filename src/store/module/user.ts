import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import { asyncRoutes } from '@/router/routes'

export const userStore = defineStore(
	'user',
	() => {
		const userInfo = reactive({
            // 菜单权限
			menus: [] as string[],
            // 按钮权限
			btns: [] as string[],
			userName: '',
			sessionId: '',
			userId: ''
		})

        const permissions = computed(() => [...userInfo.menus, ...userInfo.btns])

		const routesHasRights = computed(() =>
			asyncRoutes.filter(
				item =>
					!item?.meta?.permission ||
					permissions.value.includes(item.meta?.permission as string)
			)
		)

		const genRoutes = computed(() => {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const list: any[] = []
			const menuMapping: { [key: string]: number } = {}
			routesHasRights.value.forEach(menu => {
				const meta = menu.meta
				if (!meta?.group) {
					meta?.title && list.push(menu)
				} else {
					const groupName = meta.group as string
					if (!menuMapping[groupName]) {
						list.push({
							group: groupName,
							groupIcon: meta.groupIcon,
							children: [menu]
						})
						menuMapping[groupName] = list.length
					} else {
						const index = menuMapping[groupName] - 1
						list[index].children.push(menu)
					}
				}
			})
			return list
		})

		/** @type {string} 第一个有权限的路径 */
		const hasOneRouterPath = computed(() => routesHasRights.value[0]?.path || '/')


		function setUserInfo(res?: Res.Login) {
            userInfo.sessionId = res?.sessionId || ''
			userInfo.userId = res?.userId || ''
			userInfo.userName = res?.userName || ''
			userInfo.btns = res?.btns || []
            userInfo.menus = res?.menus || []
		}


		return {
			userInfo,
			routesHasRights,
			genRoutes,
			hasOneRouterPath,
			setUserInfo
		}
	},
	{
		persist: {
			enabled: true,
			strategies: [
				{
					storage: localStorage,
					paths: ['userInfo']
				}
			]
		}
	}
)
