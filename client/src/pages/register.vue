<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                <h1 class="text-center text-h4 text-primary">Создать аккаунт</h1>
            </v-col>
            <!-- <v-col cols="12" sm="6" md="4"> -->
                <v-card height="100%" min-width="500">
                    <v-card-text>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="register_data.name" hide-details variant="outlined" color="primary" label="Имя Фамилия"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="register_data.age" hide-details variant="outlined" color="primary" label="Возраст"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select v-model="register_data.gender" hide-details variant="outlined" color="primary" label="Пол" :items="['Мужик','Женшена']"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="register_data.email" hide-details variant="outlined" color="primary" label="Электронная почта"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="register_data.password" hide-details variant="outlined" color="primary" label="Пароль"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-text>
                        <v-btn @click="handleRegister" color="primary" block height="50" class="font-weight-bold">Регистратция</v-btn>
                    </v-card-text>
                    <v-card-text class="text-center pt-2 text-body-1">
                        <p>Уже есть аккаунт <router-link to="/login" class="text-primary">Вход</router-link></p>
                    </v-card-text>
                </v-card>
            <!-- </v-col> -->
        </v-row>
    </v-container>
</template>
    
<script setup lang="ts">
import { reactive } from 'vue'
import { register } from '@/api/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const register_data = reactive({
    name: '',
    age: '',
    gender: null,
    email: '',
    password: ''
})

const handleRegister = async () => {
    try {
        await register(register_data)
        alert('Successfully registered')
        router.push('/login')
    } catch (error: any) {
        console.log(error)
        alert(error?.response?.data?.error)
    }
}
</script>