import { RouteRecordRaw } from 'vue-router'
import { P } from '@/constants/permission'

export const vehicleRoutes: RouteRecordRaw[] = [
	{
		path: '/vehicleMgr',
		name: 'vehicleMgr',
		component: () => import('@/views/vehicle/vehicleMgr/VehicleMgr.vue'),
		meta: {
			permission: P.VEHICLE.PAGE,
			title: '载具管理',
			icon: 'icon-DataManager',
			group: '物流载具',
			groupIcon: 'icon-sucaiguanli'
		}
	},
	{
		path: '/vehicleMgr/:id',
		name: 'vehicleDetail',
		component: () => import('@/views/vehicle/vehicleMgr/VehicleDetail.vue'),
		meta: {
			permission: P.VEHICLE.PAGE,
			subTitle: '载具详情'
		}
	}
]
