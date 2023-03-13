import { RouteRecordRaw } from 'vue-router'
import { P } from '@/constants/permission'

export const infoRoutes: RouteRecordRaw[] = [
	{
		path: '/infoMgr',
		name: 'infoMgr',
		component: () => import('@/views/info/InfoMgr.vue'),
		meta: {
			permission: P.INFO.PAGE,
			title: '消息记录',
			icon: 'icon-DataManager',
			group: '消息通知',
			groupIcon: 'icon-sucaiguanli'
		}
	}
]
