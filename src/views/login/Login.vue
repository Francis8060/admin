<template>
    <div @click="handleLogin">登录页面</div>
</template>

<script lang="ts" setup>
import { userStore } from '@/store/module/user'
import { useRouter } from 'vue-router'

const user = userStore()
const router = useRouter()
const res = {
    userId: '11',
    menus: ['100', '200', '300', '400', '500'],
    btns: [],
    userName: 'zs',
    sessionId: '11sdd'
}
function handleLogin () {
    user.setUserInfo(res)
    router.push(user.hasOneRouterPath)
    
}
</script>

<style lang="scss" scoped>
</style>