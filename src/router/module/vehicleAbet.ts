import { RouteRecordRaw } from 'vue-router'
import { P } from '@/constants/permission'

export const vehicleAbetRoutes: RouteRecordRaw[] = [
	{
		path: '/vehicleAbetMgr',
		name: 'vehicleAbetMgr',
		component: () => import('@/views/vehicle/vehicleAbet/VehicleAbetMgr.vue'),
		meta: {
			permission: P.VEHICLEABET.PAGE,
			title: '载具调拨',
			icon: 'icon-DataManager',
			group: '物流载具',
			groupIcon: 'icon-sucaiguanli'
		}
	},
	{
		path: '/vehicleAbetMgr/:id',
		name: 'vehicleAbetDetail',
		component: () => import('@/views/vehicle/vehicleAbet/VehicleAbetDetail.vue'),
		meta: {
			permission: P.VEHICLEABET.PAGE,
			subTitle: '调拨详情'
		}
	}
]
