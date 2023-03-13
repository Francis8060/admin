import axios, { type AxiosRequestConfig, type AxiosRequestHeaders, type AxiosProgressEvent } from 'axios'
import { showMessage } from '@/utils'
import { CODE_STATUS_OK, CODE_NO_DATA, CODE_SESSION_TIME_OUT, CODE_BAD_GATEWAY, CODE_BAD_INTERNAL_ERROR } from './code'
import md5 from 'blueimp-md5'
import { userStore } from '@/store/module/user'

export type FunctionType = (progressEvent: AxiosProgressEvent) => void

const CancelToken = axios.CancelToken
export const cancelMap = new Map()

const enum Methods {
	GET = 'get',
	POST = 'post',
	PUT = 'put',
	DELETE = 'delete'
}

axios.interceptors.request.use(config => {
	const user = userStore()
	const timestamp = `${+new Date()}`
	const sessionId = user.userInfo.sessionId
	if (!sessionId) return config

	const signature = md5(`${sessionId}${timestamp}mwznzj`)
	const headInfo = config.headers as AxiosRequestHeaders
	headInfo.timestamp = timestamp
	headInfo.sessionId = sessionId
	headInfo.signature = signature
	return config
})

axios.interceptors.response.use(
	response => {
		return new Promise((resolve, reject) => {
			const user = userStore()
			const { data: resp } = response
			if (resp instanceof Blob) {
				resolve(response)
			} else {
				const { code, data, message } = resp
				if (!code) {
					const errMsg = message || '后台接口数据结构不对，请检查后重试'
					showMessage(errMsg)
					reject(errMsg)
				} else {
					if (code === `${CODE_STATUS_OK}` || code === `${CODE_NO_DATA}`) {
						resolve(data)
					} else if (code === `${CODE_SESSION_TIME_OUT}`) {
						user.setUserInfo()
						window.location.reload()
						reject()
					} else {
						message && showMessage(message)
						reject(resp || '服务端返回空数据')
					}
				}
			}
		})
	},
	error => {
		const { response } = error
		if (response) {
			const { status } = response
			if (status === CODE_BAD_GATEWAY || status === CODE_BAD_INTERNAL_ERROR) {
				showMessage('服务器维护中，请稍后再试')
			}
		}
		return Promise.reject(error)
	}
)

export const get = (
	url: string,
	params = {},
	headers = {},
	method = Methods.GET,
	onUploadProgress?: FunctionType
) => {
	const options: AxiosRequestConfig = {
		url,
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			...headers
		},
		cancelToken: new CancelToken(cancel => {
			cancelMap.set(url, cancel)
		})
	}

	if (method === Methods.POST) {
		options.data = params
		onUploadProgress && (options.onUploadProgress = onUploadProgress)
		options.method = 'post'
	} else if (method === Methods.GET || method === Methods.DELETE) {
		options.params = params
		options.method = 'get'
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return axios(options) as Promise<any>
}

export const post = (url: string, params = {}, headers = {}, onUploadProgress?: FunctionType) =>
	get(url, params, headers, Methods.POST, onUploadProgress)

export const getBlob = (url: string) =>
	axios({
		responseType: 'blob',
		method: 'GET',
		url
	})
