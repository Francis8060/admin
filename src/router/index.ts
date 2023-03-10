import { createRouter, createWebHashHistory } from 'vue-router'
import { constRoutes } from './routes'

const router = createRouter({
	history: createWebHashHistory(),
	routes: constRoutes,
	strict: true,
	scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router