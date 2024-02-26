<template>
    <div class="w-full p-2">
        <div class="p-2 flex rounded bg-white border justify-between items-center gap-2">
            <div class="border w-full rounded overflow-hidden max-w-[300px]">
                <input @input="searchItems" type="text" class="px-3 py-2 w-full text-sm outline-none" placeholder="Поиск">
            </div>
        </div>
        <div class="border rounded overflow-hidden w-full mt-2">
            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Пользователи
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Победитель
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Продолжительность
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Время началы
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Управлять
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item,i in items" :key="i" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.users?.filter(e => e.name)?.join(', ') }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.date }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.winner || 'Нет' }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.time }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <span class="text-xs">{{ item.updatedAt }}</span>
                            </th>
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div class="flex gap-1">
                                    <button class="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-2 rounded">Детали игры</button>
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
</template>

<script setup lang="ts">
import { debounce } from 'lodash'
import { IMatch } from '../../types'
import { ref, computed } from 'vue'
import { AkChevronRight, AkChevronLeft } from '@kalimahapps/vue-icons'

const search = ref('')
const page = ref<number>(1)
const count = ref<number>(0)
const limit = ref<number>(20)
const items = ref<IMatch[]>([])

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

const deleteItem = async (id: string, index: number) => {
    if(!confirm('Вы хотите удалить это?')) return
    // await $fetch(`/api/doctors/delete/${id}`, {
    //     method: 'delete'
    // })
    console.log(id);
    items.value.splice(index, 1)
}

getItems()
</script>