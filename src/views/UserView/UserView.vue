<template>
    <HeadNav>
        <template #title>个人中心</template>
    </HeadNav>
    <main class="h-screen w-screen bg-sh-gray pt-12 pb-16 px-4">
        <div class="bg-gradient mt-4 rounded-md shadow-md">
            <section class="flex items-center px-4 py-2"
                v-if="isLogin">
                <van-image class="border-2"
                    round
                    width="3rem"
                    height="3rem"
                    :src="userInfo.avatar_url"></van-image>
                <div class="flex-1 py-4 ml-4 text-sm text-white flex flex-col justify-around">
                    <p>昵称：{{ userInfo.name }}</p>
                    <p>邮箱：{{ userInfo.email }}</p>
                </div>
            </section>
            <section class="text-white text-xl flex justify-center py-8"
                v-else>
                <RouterLink to="/register">注册</RouterLink>
                <span class="text-2xl mx-2">/</span>
                <RouterLink to="/login">登录</RouterLink>
            </section>
        </div>
        <van-cell-group class="rounded-md overflow-hidden shadow-md my-4">
            <van-cell v-for="(link, index) in funcLinkList"
                :key="index"
                :title="link.title"
                :to="link.path"
                is-link />
        </van-cell-group>
        <button class="text-white bg-red-500 w-full py-3 rounded-md shadow-md active:opacity-90"
            type="button"
            v-if="isLogin"
            @click="toLogout">
            <span class="tracking-widest">登出</span>
        </button>
    </main>
</template>

<script setup>
import HeadNav from '@/components/GlobalParts/HeadNav.vue'

import { logout, getUserInfo } from '../../api/UserView'
import { showLoading } from '../../utils'

import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const userInfo = ref({})
const isLogin = computed(() => store.getters.isLogin)
const funcLinkList = ref([
    {
        title: '地址管理',
        path: '/address'
    },
    {
        title: '我的订单',
        path: '/order'
    }
])

onMounted(() => {
    if (isLogin.value) {
        getUserInfo().then(res => {
            userInfo.value = res
        }).catch(err => {
            console.log(err.message)
        })
    }
})

function toLogout() {
    showLoading('登出中...', toast => {
        logout().then(() => {
            localStorage.removeItem('token')
            store.commit('logout')
            toast.message = '登出成功，跳转中...'
            setTimeout(() => {
                toast.close()
                userInfo.value = {}
                router.push('/user')
            }, 400)
        })
    })
}
</script>

<style scoped>
.bg-gradient {
    background-image: linear-gradient(90deg,
            hsl(161deg 94% 30%) 0%,
            hsl(161deg 91% 32%) 20%,
            hsl(161deg 90% 34%) 29%,
            hsl(161deg 88% 36%) 36%,
            hsl(160deg 86% 37%) 43%,
            hsl(160deg 84% 39%) 50%,
            hsl(160deg 80% 42%) 57%,
            hsl(159deg 76% 44%) 64%,
            hsl(159deg 72% 47%) 71%,
            hsl(159deg 68% 49%) 80%,
            hsl(158deg 64% 52%) 100%);
}
</style>