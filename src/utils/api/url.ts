const baseUrl = location.origin
const getApi = (url: string) => {
	const prefix = import.meta.env.VITE_APP_API_ENDPOINT_PREFIX
	const secondDir = import.meta.env.VITE_SECOND_DIR || ''
	return `${baseUrl}${prefix}${secondDir}/test/${url}`
}

// 登录
export const USER_LOGIN = getApi('api/v1/login')

// 权限
export const USER_MENU = getApi('api/v1/user/menu')