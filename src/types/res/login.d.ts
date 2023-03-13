declare namespace Res {
	interface Login {
		userId: string
		userName: string
		sessionId: string
		menus: string[]
		btns: string[]
	}

	type UserMenu = Pick<Login, 'menus' | 'btns'>
}
