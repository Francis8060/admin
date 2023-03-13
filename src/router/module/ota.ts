import { RouteRecordRaw } from 'vue-router'
import { P } from '@/constants/permission'

export const otaRoutes: RouteRecordRaw[] = [
	{
		path: '/otaMgr',
		name: 'otaMgr',
		component: () => import('@/views/intellect/ota/OtaMgr.vue'),
		meta: {
			permission: P.OTA.PAGE,
			title: 'ota升级',
			icon: 'icon-DataManager',
			group: '智能标签',
			groupIcon: 'icon-sucaiguanli'
		}
	}
]
