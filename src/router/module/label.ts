import { RouteRecordRaw } from 'vue-router'
import { P } from '@/constants/permission'

export const labelRoutes: RouteRecordRaw[] = [
	{
		path: '/labelMgr',
		name: 'labelMgr',
		component: () => import('@/views/intellect/label/LabelMgr.vue'),
		meta: {
			permission: P.LABEL.PAGE,
			title: '标签管理',
			icon: 'icon-DataManager',
			group: '智能标签',
			groupIcon: 'icon-sucaiguanli'
		}
	},
	{
		path: '/labelMgr/:id',
		name: 'labelDetail',
		component: () => import('@/views/intellect/label/LabelDetail.vue'),
		meta: {
			permission: P.LABEL.PAGE,
			subTitle: '标签详情'
		}
	}
]
