<template>
    <v-container fluid>
        <v-row justify="space-between" align="center">
            <v-col cols="9" sm="6" md="4" class="pb-0 pr-0">
                <v-text-field @update:modelValue="debounceSearch" placeholder="Поиск" append-inner-icon="mdi-magnify"
                    hide-details flat density="compact" variant="outlined" color="primary"></v-text-field>
            </v-col>
            <v-col cols="3" sm="4" md="2" class="pb-0 d-flex justify-end">
                <v-btn @click="dialog=true" flat color="primary" size="43" width="100%">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="12">
                <v-card flat border>
                    <v-card-title class="px-4 pt-3">Пользователи</v-card-title>
                    <v-card-text class="px-0">
                        <div class="responsive-datatable">
                            <v-data-table-server
                                v-model:items-per-page="perpage"
                                :search="search"
                                :items-length="totalCount"
                                :loading="loading"
                                no-data-text="Пусто"
                                loading-text="Загрузка"
                                @update:options="loadItems"
                                :items="items"
                                item-value="_id"
                                :headers="headers"
                                density="comfortable">
                                <template #bottom></template>
                                <template #item.actions="{ item, index }">
                                    <td data-label="Управлять" class="d-flex justify-space-between align-center">
                                        <span></span>
                                        <div class="d-flex ga-2">
                                            <v-btn color="primary" size="35">
                                                <v-icon size="25">mdi-cancel</v-icon>
                                            </v-btn>
                                            <v-btn @click="editItem(item)" color="primary" size="35">
                                                <v-icon size="25">mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn @click="deleteItem(index, item._id)" color="primary" size="35">
                                                <v-icon size="25">mdi-delete</v-icon>
                                            </v-btn>
                                        </div>
                                    </td>
                                </template>
                                <template #item.name="{ item, column }">
                                    <td :data-label="column.title">
                                        {{ item.name }}
                                    </td>
                                </template>
                                <template #item.age="{ item, column }">
                                    <td :data-label="column.title">
                                        {{ item.age }}
                                    </td>
                                </template>
                                <template #item.gender="{ item, column }">
                                    <td :data-label="column.title">
                                        {{ item.gender }}
                                    </td>
                                </template>
                                <template #item.email="{ item, column }">
                                    <td :data-label="column.title">
                                        {{ item.email }}
                                    </td>
                                </template>
                            </v-data-table-server>
                        </div>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="4" class="pt-0 pb-1 d-flex align-center">
                <v-select v-model="perpage" transition="fade-transition" hide-details flat density="compact" variant="outlined"
                    :items="[10,20,50,100]" color="primary"></v-select>
                <v-text-field class="ml-3" hide-details flat density="compact" variant="outlined" :model-value="perpagetext"
                    readonly color="primary"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4" md="4" class="pt-0 pl-0 pb-1 pr-2 d-flex justify-end align-center">
                <v-pagination v-model="page" :length="Math.ceil(totalCount / perpage)" @update:modelValue="loadItems"
                    active-color="primary" size="40" total-visible="3" variant="flat"></v-pagination>
            </v-col>
        </v-row>
        <v-dialog v-model="dialog" width="500" transition="fade-transition">
            <v-card elevation="1">
                <v-card-title class="px-4 pt-4 d-flex justify-space-between align-center">
                    <span>Данные пользователья</span>
                    <v-btn flat @click="dialog = false" size="32" color="primary">
                        <v-icon size="small">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="pa-4">
                    <v-form class="w-100" ref="form">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="item.name" hide-details variant="outlined" color="primary" label="Имя Фамилия"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="item.age" type="number" hide-details variant="outlined" color="primary" label="Возраст"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-select v-model="item.gender" hide-details variant="outlined" color="primary" label="Пол" :items="['Мужик','Женшена']"></v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="item.email" hide-details variant="outlined" color="primary" label="Электронная почта"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field v-model="item.password" hide-details variant="outlined" color="primary" label="Пароль"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-btn height="40" class="mt-1 font-weight-normal" color="primary" block flat @click="validate">Сохранить</v-btn>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
  
<script setup lang="ts">
import { debounce } from 'lodash'
import { ref, reactive, nextTick, watch, computed } from 'vue'
import { create_user, delete_user, get_all_user, update_user } from '@/api/users'

const headers = [
    { title: 'Имя Фамилия', key: 'name', sortable: true },
    { title: 'Возраст', key: 'age', sortable: true },
    { title: 'Пол', key: 'gender', sortable: false },
    { title: 'EXP', key: 'exp', sortable: false },
    { title: 'Электронная почта', key: 'email', sortable: false },
    { title: 'Управлять', key: 'actions', sortable: false, align: 'end' },
]

const dialog = ref(false)
const form = ref<any>(null)
const items = ref<any[]>([])

const itemid = ref<string | null>(null)
const item = reactive<any>({
    name: "",
    age: "",
    gender: "",
    email: "",
})

const page = ref(1)
const search = ref("")
const perpage = ref(20)
const totalCount = ref(0)
const loading = ref(false)

const qs = computed(() => {
    const qry: any = {}

    if(search.value.trim()) qry.search = search.value
    if(page.value) qry.page = page.value
    if(perpage.value) qry.limit = perpage.value

    return qry
})

const perpagetext = computed(() => {
    const page_1 = (page.value - 1) * perpage.value;
    return `${page_1 + 1}-${page_1 + items.value.length} / ${totalCount.value}`
})

const debounceSearch = debounce((e: string) => {
    search.value = e
    page.value = 1
}, 500)

const validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
}

const loadItems = async () => {
    loading.value = true
    const { data }: any = await get_all_user(qs.value)
    totalCount.value = data.count
    items.value = data.result
    loading.value = false
}

const save = async () => {
    if (itemid.value) {
        const index = items.value.findIndex(i => i._id === itemid.value)
        const { data } = await update_user(itemid.value, item)
        Object.assign(items.value[index], data)
    } else {
        const { data } = await create_user(item)
        items.value.push(data)
    }

    close()
}

const editItem = (el: any) => {
    itemid.value = el._id;
    Object.assign(item, el);
    dialog.value = true;
}

const deleteItem = async (i: number, id: string) => {
    if (!confirm("Ushbu malumotni o'chirmoqchimisiz?")) return
    await delete_user(id)
    items.value.splice(i, 1);
}

const close = () => {
    dialog.value = false;
    nextTick(() => {
        Object.assign(item, {
            first_name: "",
            last_name: "",
            age: "",
            gender: "",
            email: "",
        });
        itemid.value = null;
        form.value?.reset()
    });
}

watch(dialog, (v) => v || close())
</script>