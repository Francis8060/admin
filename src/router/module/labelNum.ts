import { RouteRecordRaw } from 'vue-router'
import { P } from '@/constants/permission'

export const labelNumRoutes: RouteRecordRaw[] = [
	{
		path: '/labelNumMgr',
		name: 'labelNumMgr',
		component: () => import('@/views/intellect/labelNum/LabelNumMgr.vue'),
		meta: {
			permission: P.LABELNUM.PAGE,
			title: '标签型号',
			icon: 'icon-DataManager',
			group: '智能标签',
			groupIcon: 'icon-sucaiguanli'
		}
	},
	{
		path: '/labelNumMgr/:id',
		name: 'labelNumDetail',
		component: () => import('@/views/intellect/labelNum/LabelNumDetail.vue'),
		meta: {
			permission: P.LABELNUM.PAGE,
			subTitle: '标签型号详情'
		}
	},
    {
        path: '/labelNumMgr/:id/edit',
		name: 'labelNumEdit',
		component: () => import('@/views/intellect/labelNum/LabelNumEdit.vue'),
		meta: {
			permission: P.LABELNUM.BTN.EDIT,
			subTitle: '标签型号编辑'
		}
    }
]
