import { RouteRecordRaw } from 'vue-router'
import { P } from '@/constants/permission'

export const vehicleNumRoutes: RouteRecordRaw[] = [
	{
		path: '/vehicleNumMgr',
		name: 'vehicleNumMgr',
		component: () => import('@/views/vehicle/vehicleNum/VehicleNumMgr.vue'),
		meta: {
			permission: P.VEHICLENUM.PAGE,
			title: '载具型号',
			icon: 'icon-DataManager',
			group: '物流载具',
			groupIcon: 'icon-sucaiguanli'
		}
	},
	{
		path: '/vehicleNumMgr/:id',
		name: 'vehicleNumDetail',
		component: () => import('@/views/vehicle/vehicleNum/VehicleNumDetail.vue'),
		meta: {
			permission: P.VEHICLENUM.PAGE,
			subTitle: '载具型号详情'
		}
	},
    {
        path: '/vehicleNumMgr/:id/edit',
		name: 'vehicleNumEdit',
		component: () => import('@/views/vehicle/vehicleNum/VehicleNumEdit.vue'),
		meta: {
			permission: P.VEHICLENUM.BTN.EDIT,
			subTitle: '载具型号编辑'
		}
    }
]
