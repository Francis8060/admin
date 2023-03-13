import { type RouteRecordRaw } from 'vue-router'
import {
	workspaceRoutes,
	vehicleRoutes,
	vehicleNumRoutes,
	vehicleAbetRoutes,
	outletRoutes,
	labelRoutes,
	labelNumRoutes,
	otaRoutes,
	infoRoutes
} from './module'


export type RouteListType = RouteRecordRaw & {
	title: string
	icon: string
	permission: string
}

export const constRoutes: RouteRecordRaw[] = [
    {
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/Login.vue')
	},
	{
		path: '/',
		name: 'layout',
		component: () => import('@/views/Layout.vue'),
		children: []
	}
]

export const asyncRoutes = [
	...workspaceRoutes,
	...vehicleRoutes,
	...vehicleNumRoutes,
	...vehicleAbetRoutes,
	...outletRoutes,
	...labelRoutes,
	...labelNumRoutes,
	...otaRoutes,
	...infoRoutes
]