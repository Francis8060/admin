<template>
    <div class="w-full h-full flex flex-row login">
        <div class="left h-full"></div>
        <div class="right h-full flex justify-center flex-col">
            <div>
                <h1 class="mb-4 text-2xl">智能载物管理系统登录</h1>
                <el-form :model="formData" ref="formRef" :rules="rules">
                    <el-form-item class="w-full" prop="userName">
						<div class="text-sm mb-2">账 号</div>
						<el-input
							@keyup.enter="onSubmit"
							placeholder="请输入账号"
							v-model="formData.userName"
							maxlength="50"
                            clearable
						>
							<template #prefix>
								<el-icon>
                                    <User />
                                </el-icon>
							</template>
						</el-input>
					</el-form-item>
					<el-form-item class="w-full" prop="password">
						<div class="text-sm mb-2">密 码</div>
						<el-input
							@keyup.enter="onSubmit"
							autocomplete="on"
							placeholder="请输入密码"
							v-model.trim="formData.password"
							:type="passwordType"
							maxlength="16"
                            clearable
						>
							<template #prefix>
                                <el-icon @click="changePasswordType">
                                    <Lock v-if="passwordType === 'password'" />
                                    <Unlock v-else /> 
                                </el-icon>
							</template>
						</el-input>
					</el-form-item>
                    <el-form-item class="mt-8 w-full">
						<el-button class="w-full" :loading="loading" @click="onSubmit" type="primary">
							登 录
						</el-button>
					</el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { type ElformType } from '@/constants/enum'
import { useState, rsaEncrypt, showMessage } from '@/utils'
import Api from '@/utils/api'
import { userStore } from '@/store/module/user'
import { useRouter } from 'vue-router'
import { User, Lock, Unlock } from '@element-plus/icons-vue'

const [user, router] = [userStore(), useRouter()]

const formData = reactive<Req.Login>({
    userName: '',
    password: ''
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallbackFunction<T = any> = (args?: T) => void
function checkRequired  (message: string) {
	return (rule: object, value: string, callback: CallbackFunction) => {
		if (value.trim() === '') {
			return callback(new Error(message))
		} else {
			callback()
		}
	}
}
const rules = reactive({
	userName: [{ validator: checkRequired('账号不可为空'), trigger: 'blur' }],
	password: [{ validator: checkRequired('密码不可为空'), trigger: 'blur' }]
})

const formRef = ref<ElformType>()
const [loading, setLoading] = useState(false)
/** 登录 */
function onSubmit() {
	formRef.value &&
		formRef.value.validate(isValid => {
			if (isValid) {
				!loading.value &&
					Api.login({
						...formData,
						password: rsaEncrypt(formData.password)
					})
						.then(res => {
                            res = {
                                userId: '11',
                                menus: ['100', '200', '300', '400', '500'],
                                btns: [],
                                userName: 'zs',
                                sessionId: '11sdd'
                            }
                            if (res && res.menus.length) {
                                user.setUserInfo(res)
                                router.replace(user.hasOneRouterPath)
                            } else {
                                showMessage('您暂时还没有任何权限，请联系管理员')
                            }
							
						})
						.catch(() => {
							user.setUserInfo()
						})
						.finally(() => {
							setLoading(false)
						})
				setLoading(true)
			}
		})
}


const passwordType = ref<'password' | 'text'>('password')
function changePasswordType () {
	passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}
</script>

<style lang="scss" scoped>
.login {
    .left {
        width: 60%;
        background: url('../../assets/imgs/loginBg.png') no-repeat left center;
    }
    .right {
        width: 20%;
        margin-left: 4%;
    }
}
</style>