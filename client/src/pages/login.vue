<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                <h1 class="text-center text-h4 text-primary">Войти в аккаунт</h1>
            </v-col>
            <!-- <v-col cols="12" sm="6" md="4"> -->
                <v-card height="100%" min-width="500">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="logindata.email" hide-details variant="outlined" color="primary" label="Электронная почта"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="logindata.password" hide-details variant="outlined" color="primary" label="Пароль"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text>
                        <v-btn @click="handleLogin" color="primary" block height="50" class="font-weight-bold">Вход</v-btn>
                    </v-card-text>
                    <v-card-text class="text-center pt-2 text-body-1">
                        <p>Нет аккаунта <router-link to="/register" class="text-primary">Создать</router-link></p>
                    </v-card-text>
                </v-card>
            <!-- </v-col> -->
        </v-row>
    </v-container>
</template>
    
<script setup lang="ts">
import { reactive } from 'vue'
import useStore from '../store'
import { login } from '../api/auth'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const logindata = reactive({ email: '', password: '' })
const handleLogin = async () => {
    try {
        if(!logindata.email?.trim() || !logindata.password?.trim()) return alert('Barcha maydonlarni to\'ldiring!')
        const { data } = await login(logindata)
        store.set_token(data.token)
        store.set_user(data.user)
        if(data.user.role === 'admin') router.push('/admin')
        else if(data.user.role === 'user') router.push('/profile')        
    } catch (error: any) {
        console.log(error);
        
        alert('Xatolik')
    }
}
</script>