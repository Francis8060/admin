import { RouteRecordRaw } from 'vue-router'
import { P } from '@/constants/permission'

export const outletRoutes: RouteRecordRaw[] = [
	{
		path: '/outletMgr',
		name: 'outletMgr',
		component: () => import('@/views/outlet/OutletMgr.vue'),
		meta: {
			permission: P.OUTLET.PAGE,
			title: '网点管理',
			icon: 'icon-DataManager',
			group: '仓库网点',
			groupIcon: 'icon-sucaiguanli'
		}
	},
	{
		path: '/outletMgr/:id',
		name: 'outletDetail',
		component: () => import('@/views/outlet/OutletDetail.vue'),
		meta: {
			permission: P.OUTLET.PAGE,
			subTitle: '网点详情'
		}
	},
    {
        path: '/outletMgr/:id/edit',
		name: 'outletEdit',
		component: () => import('@/views/outlet/OutletEdit.vue'),
		meta: {
			permission: P.VEHICLENUM.BTN.EDIT,
			subTitle: '网点编辑'
		}
    }
]
