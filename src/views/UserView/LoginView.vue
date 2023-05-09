<template>
    <HeadNav>
        <template #title>登录</template>
    </HeadNav>
    <main class="h-screen pt-12 bg-sh-gray">
        <header class="bg-white rounded-lg mx-4 p-4 mt-8 shadow-sm">
            <h4 class="w-full text-center text-2xl font-bold tracking-wide">eBook ID</h4>
            <p class="text-base text-justify px-4 mt-2">
                管理你的
                <strong>eBook</strong>
                账户。
                没有账户？
                <RouterLink to="/register">
                    <span class="text-blue-600">创建你的 eBook ID</span>
                </RouterLink>
            </p>
        </header>
        <van-form class="pt-6 mx-4"
            @submit="onLogSubmit">
            <div class="shadow-sm rounded-lg overflow-hidden">
                <van-cell-group>
                    <van-field v-model="userInfo.email"
                        type="email"
                        name="邮箱"
                        label="邮箱"
                        placeholder="邮箱"
                        :rules="[{ required: true, message: emailMsg }]" />
                    <van-field v-model="userInfo.password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: pwdMsg }]" />
                </van-cell-group>
            </div>
            <div class="mt-8">
                <button type="submit"
                    class="text-white w-full py-3 rounded-md bg-gradient shadow-md active:opacity-90">
                    <span class="tracking-widest text-base">登录</span>
                </button>
            </div>
        </van-form>
    </main>
</template>

<script setup>
import HeadNav from '@/components/GlobalParts/HeadNav.vue'

import { login } from '../../api/UserView'
import { showLoading } from '../../utils'

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const route = useRoute()
const store = useStore()

const userInfo = ref({
    email: '',
    password: ''
})

const emailMsg = ref('请填写邮箱')
const pwdMsg = ref('请填写密码')

function onLogSubmit() {
    showLoading('登录中...', toast => {
        login(userInfo.value).then(res => {
            if (res) {
                localStorage.setItem('token', res.access_token)
                store.commit('login', true)
                toast.message='登录成功，跳转中...'
                setTimeout(() => {
                    toast.close()
                    let path = route.query.redirect
                    router.replace({
                        path: path === '/' || path === undefined ? '/user' : path
                    })
                }, 400)
            }
        }).catch(_ => {
        })
    })
}

</script>

<style scoped>
.bg-gradient {
    background-image: linear-gradient(90deg,
            hsl(158deg 64% 52%) 0%,
            hsl(169deg 100% 41%) 27%,
            hsl(174deg 100% 40%) 37%,
            hsl(180deg 100% 39%) 45%,
            hsl(186deg 100% 42%) 51%,
            hsl(191deg 100% 45%) 56%,
            hsl(195deg 100% 47%) 61%,
            hsl(199deg 100% 49%) 66%,
            hsl(202deg 100% 50%) 71%,
            hsl(204deg 100% 50%) 77%,
            hsl(206deg 100% 50%) 83%,
            hsl(217deg 91% 60%) 100%);
}
</style>
