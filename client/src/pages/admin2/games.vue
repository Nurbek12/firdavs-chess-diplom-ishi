<template>
    <div class="w-full p-2">
        <div class="p-2 flex rounded bg-white border justify-between items-center gap-2">
            <div class="border w-full rounded overflow-hidden max-w-[300px]">
                <input @input="searchItems" type="text" class="px-3 py-2 w-full text-sm outline-none" placeholder="Поиск">
            </div>
            <button @click="dialog=true" class="bg-purple-600 hover:bg-purple-500 text-white rounded text-xs px-3 py-2">Добавить</button>
        </div>
        <div class="border rounded overflow-hidden w-full mt-2">
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Заголовок
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Дата
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Описание
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Пользователи
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Мачты
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Победитель
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Добавлен
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Управлять
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item,i in items" :key="i" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.title }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.date }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs text-balance">{{ item.description }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.users?.length }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.matchs?.length }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.winner || 'Нет' }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.createdAt }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="flex gap-1">
                                    <button class="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-2 rounded">Остановить</button>
                                    <button @click="editItem(item, i)" class="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-2 rounded">Изменить</button>
                                    <button @click="deleteItem(item._id!, i)" class="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-2 rounded">Удалить</button>
                                </div>
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="py-2 flex items-center justify-between">
            <div class="border rounded overflow-hidden w-full max-w-[100px]">
                <select v-model="limit" @change="getItems()" class="px-3 py-2 w-full bg-white text-sm outline-none" placeholder="Поиск">
                    <option :value="20" selected>20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                </select>
            </div>
            <div class="border rounded flex items-center justify-between gap-4 bg-white p-2">
                <span class="text-sm">{{ limit*(page-1)+1 }}-{{ limit*(page-1)+items.length }} / {{ count }}</span>
                <div class="flex items-center gap-2">
                    <button :disabled="page===1" @click="page--,getItems()" class="disabled:bg-purple-300 bg-purple-600 hover:bg-purple-500 text-white text-xs p-3 rounded-full">
                        <AkChevronLeft />
                    </button>
                    <button :disabled="page >= Math.ceil(count / limit)" @click="page++,getItems()" class="disabled:bg-purple-300 bg-purple-600 hover:bg-purple-500 text-white text-xs p-3 rounded-full">
                        <AkChevronRight />
                    </button>
                </div>
            </div>
        </div>
    </div>
    <app-dialog :title="itemIndex==null?'Добавить пользователь':'Изменить данные пользователья'" :open="dialog" @close-dialog="close">
        <form @submit.prevent="save" class="mt-4 flex flex-col gap-4">
            <div class="w-full border rounded overflow-hidden">
                <input required v-model="user.title" class="text-sm py-2 px-3 w-full outline-none" type="text" placeholder="Заголовок">
            </div>
            <div class="w-full border rounded overflow-hidden">
                <input required v-model="user.date" class="text-sm py-2 px-3 w-full outline-none" type="date" placeholder="Дата">
            </div>
            <div class="w-full border rounded overflow-hidden">
                <textarea required v-model="user.description" class="text-sm py-2 px-3 w-full outline-none resize-none" rows="4" type="text" placeholder="Описание" />
            </div>
            <button :disabled="createLoading" type="submit" class="disabled:bg-purple-400 bg-purple-600 hover:bg-purple-500  rounded text-white text-sm px-3 py-2">
                {{ createLoading?'Загружается':'Сохранить' }}
            </button>
        </form>
    </app-dialog>
</template>

<script setup lang="ts">
import { debounce } from 'lodash'
import { ITournament } from '../../types'
import { ref, reactive, computed } from 'vue'
import AppDialog from '../../components/app-dialog.vue'
import { AkChevronRight, AkChevronLeft } from '@kalimahapps/vue-icons'

const search = ref('')
const dialog = ref(false)
const page = ref<number>(1)
const count = ref<number>(0)
const limit = ref<number>(20)
const items = ref<ITournament[]>([])
const itemIndex = ref<number|null>(null)
const createLoading = ref<boolean>(false)
const user = reactive<ITournament>({
    date: "",
    title: "",
    description: "",
    users: [],
    matchs: [],
    winner: null,
})

const qs = computed(() => {
    const params = new URLSearchParams();

    if (page.value) 
        params.append('page', String(page.value))

    if (limit.value) 
        params.append('perpage', String(limit.value))

    if (search.value.trim())
        params.append('search', search.value)

    return params.toString()
})

const searchItems = debounce((e: any) => {
    search.value = e.target.value
    page.value = 1
    getItems()
}, 500)

const getItems = async () => {
    console.log(qs.value)
    // try {
    //     const data = await $fetch(`/api/doctors?${qs.value}`)
    //     items.value = data.result as any
    //     count.value = data.count
    // } catch (error) {
    //     console.log(error)
    // }
}

const editItem = (item: ITournament, index: number) => {
    Object.assign(user, item)
    itemIndex.value = index
    dialog.value = true
}

const deleteItem = async (id: string, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    // await $fetch(`/api/doctors/delete/${id}`, {
    //     method: 'delete'
    // })
    console.log(id);
    items.value.splice(index, 1)
}

const create = async (body: any) => {
    // const data = await $fetch('/api/doctors', {
    //     method: 'POST',
    //     body: JSON.stringify(body)
    // })
    // items.value.push(data as any)
    items.value.push({
        _id: Date.now().toString(),
        ...body,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
    })
}

const update = async (index: number, body: any) => {
    // const data = await $fetch(`/api/doctors/update/${body.id}`, {
    //     method: 'put',
    //     body: JSON.stringify(body)
    // })
    // Object.assign(items.value[index], data)
    Object.assign(items.value[index], body)
}

const save = async () => {
    createLoading.value = true

    if(itemIndex.value !== null)
        update(itemIndex.value, user)
    else
        create(user)

    close()
}

const close = () => {
    createLoading.value = false
    Object.assign(user, {
        date: "",
        title: "",
        description: "",
        users: [],
        matchs: [],
        winner: null,
    })
    dialog.value = false
    itemIndex.value = null
}

getItems()
</script>