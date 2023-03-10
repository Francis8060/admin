import { RouteRecordRaw } from 'vue-router'
import { K } from '@/constants/permission'

export const workspaceRoutes: RouteRecordRaw[] = [
	{
		path: '/workspace',
		name: 'workspace',
		component: () => import('@/views/workspace/Workspace.vue'),
		meta: {
			permission: K.MANNER.PAGE,
			title: '工作台',
			icon: 'icon-fenggeguanli'
		}
	}
]
