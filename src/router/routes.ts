import { type RouteRecordRaw } from 'vue-router'

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