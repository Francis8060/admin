import { get, post } from './request'
import * as C from './url'

export default {
    // 登录
	login: (params: Req.Login) =>
        post(C.USER_LOGIN, params) as Promise<Res.Login>,

    getUserMenu: () =>
		get(C.USER_MENU) as Promise<Res.UserMenu>
}