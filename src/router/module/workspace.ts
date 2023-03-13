import { RouteRecordRaw } from 'vue-router'
import { P } from '@/constants/permission'

export const workspaceRoutes: RouteRecordRaw[] = [
	{
		path: '/workspace',
		name: 'workspace',
		component: () => import('@/views/workspace/Workspace.vue'),
		meta: {
			permission: P.WORKSPACE.PAGE,
			title: '工作台',
			icon: 'icon-workspace'
		}
	}
]