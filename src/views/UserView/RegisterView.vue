<template>
    <HeadNav>
        <template #title>创建账户</template>
    </HeadNav>
    <main class="h-screen pt-12 bg-sh-gray">
        <header class="bg-white rounded-lg mx-4 p-4 mt-8 shadow-sm">
            <h4 class="w-full text-center text-2xl font-bold tracking-wide">创建你的 eBook ID</h4>
            <p class="text-base text-justify px-4 mt-2">
                只需一个
                <strong>eBook</strong>
                ID，即可访问
                <strong>eBook</strong>
                的所有内容。已有账户？
                <RouterLink to="/login">
                    <span class="text-blue-600">在此登录</span>
                </RouterLink>
            </p>
        </header>
        <van-form class="pt-6 mx-4"
            @submit="onRegSubmit">
            <div class="shadow-sm rounded-lg overflow-hidden">
                <van-cell-group>
                    <van-field v-model="userInfo.username"
                        name="用户名"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[
                                { required: true, message: nameMsg.null },
                                { pattern: nameRegExp, message: nameMsg.vld }
                            ]" />
                    <van-field v-model="userInfo.password"
                        type="password"
                        name="密码"
                        label="密码"
                        placeholder="密码"
                        :rules="[
                                { required: true, message: pwdMsg.null },
                                { pattern: pwdRegExp, message: pwdMsg.vld }
                            ]" />
                    <van-field v-model="userInfo.comfirmPwd"
                        type="password"
                        name="确认密码"
                        label="确认密码"
                        placeholder="确认密码"
                        :rules="[
                                { required: true, message: rePwdMsg.null },
                                { validator: rePwdVld, message: rePwdMsg.vld }
                            ]" />
                    <van-field v-model="userInfo.email"
                        type="email"
                        name="邮箱"
                        label="邮箱"
                        placeholder="邮箱"
                        :rules="[
                                { required: true, message: emailMsg.null },
                                { pattern: emailRegExp, message: emailMsg.vld }
                            ]" />
                </van-cell-group>
            </div>
            <div class="mt-8">
                <button type="submit"
                    class="text-white w-full py-3 rounded-md bg-gradient shadow-md active:opacity-90">
                    <span class="tracking-widest text-base">注册</span>
                </button>
            </div>
        </van-form>
    </main>
</template>

<script setup>
import HeadNav from '@/components/GlobalParts/HeadNav.vue'

import { register } from '../../api/UserView'
import { showLoading } from '../../utils'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const userInfo = ref({
    username: '',
    password: '',
    comfirmPwd: '',
    email: ''
})

const nameMsg = ref({
    null: '请填写用户名',
    vld: '4-16位字母、数字、下划线、短横线'
})
const pwdMsg = ref({
    null: '请填写密码',
    vld: '8-16位包含小写和大写字母以及数字'
})
const rePwdMsg = ref({
    null: '请再次填写密码',
    vld: '两次密码不一致'
})
const emailMsg = ref({
    null: '请填写邮箱',
    vld: '邮箱格式不正确'
})

const nameRegExp = /^[a-zA-Z0-9_-]{4,16}$/
const pwdRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,16}$/
const rePwdVld = (val) => val === userInfo.value.password
const emailRegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/

function onRegSubmit() {
    showLoading('注册中...', toast => {
        register(userInfo.value).then(res => {
            if (res === '') {
                toast.message = '注册成功，跳转中...'
                setTimeout(() => {
                    toast.close()
                    router.push('/login')
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
