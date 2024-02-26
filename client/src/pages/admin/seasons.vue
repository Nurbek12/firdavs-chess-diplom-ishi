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
                    <v-card-title class="px-4 pt-3">Турниры</v-card-title>
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
                                        <div class="d-flex align-center ga-2">
                                            <v-btn :disabled="item.status === 'process'" @click="handleStart(item._id, index)" color="primary" size="35" flat>
                                                <v-icon>mdi-check</v-icon>
                                            </v-btn>
                                            <v-btn @click="editItem(item)" color="primary" size="35" flat>
                                                <v-icon>mdi-pencil</v-icon>
                                            </v-btn>
                                            <v-btn @click="deleteItem(index, item._id)" color="primary" size="35" flat>
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </div>
                                    </td>
                                </template>
                                <template #item.name="{ item, column }">
                                    <td :data-label="column.title">
                                        {{ item.title }}
                                    </td>
                                </template>
                                <template #item.date="{ item, column }">
                                    <td :data-label="column.title">
                                        {{ new Date(item.date).toLocaleDateString() }}
                                    </td>
                                </template>
                                <template #item.description="{ item, column }">
                                    <td :data-label="column.title">
                                        <span class="d-inline-block text-truncate" style="max-width: 150px;">{{ item.description }}</span>
                                    </td>
                                </template>
                                <template #item.users="{ item, column }">
                                    <td :data-label="column.title">
                                        {{ item.users.length }}
                                    </td>
                                </template>
                                <template #item.matchs="{ item, column }">
                                    <td :data-label="column.title">
                                        0/{{ item.max_users-1 }}
                                    </td>
                                </template>
                                <template #item.winner="{ item, column }">
                                    <td :data-label="column.title">
                                        {{ item.winner || 'Not' }}
                                    </td>
                                </template>
                                <template #item.reward="{ item, column }">
                                    <td :data-label="column.title">
                                        {{ item.reward }} $
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
                    <span>Турнир</span>
                    <v-btn flat @click="dialog = false" size="32" color="primary">
                        <v-icon size="small">mdi-close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="pa-4">
                    <v-form class="w-100" ref="form">
                        <v-row>
                            <v-col cols="12">
                                <v-sheet height="180" rounded>
                                    <v-img cover v-if="image" class="rounded" :src="currentImage"></v-img>
                                    <v-btn v-else @click="clickFile" class="h-100 w-100" color="primary" variant="outlined">
                                        <v-icon size="80">mdi-image</v-icon>
                                    </v-btn>
                                    <input @change="changeFile" type="file" hidden id="file">
                                </v-sheet>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field placeholder="Называние" v-model="item.title" class="mt-1" hide-details
                                    density="comfortable" color="primary" flat variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field type="date" placeholder="Дата" v-model="item.date" class="mt-1" hide-details
                                    density="comfortable" color="primary" flat variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field type="number" placeholder="Награда" v-model="item.reward" class="mt-1" hide-details
                                    density="comfortable" color="primary" flat variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-textarea placeholder="Награда" v-model="item.description" class="mt-1" hide-details
                                    density="comfortable" color="primary" flat variant="outlined" />
                            </v-col>
                            <v-col cols="12">
                                <v-btn height="40" class="mt-1" color="primary" block flat @click="validate">Сохранить</v-btn>
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
import { create, get_all, start } from '@/api/tournament'

const headers = [
    { title: 'Называние', key: 'name', sortable: false },
    { title: 'Дата', key: 'date', sortable: true },
    { title: 'Описание', key: 'description', sortable: false },
    { title: 'Награда', key: 'reward', sortable: true },
    { title: 'Пользователи', key: 'users', sortable: false },
    { title: 'Мачты', key: 'matchs', sortable: false },
    { title: 'Победитель', key: 'winner', sortable: false },
    { title: 'Управлять', key: 'actions', sortable: false, align: 'end' },
]

const dialog = ref(false)
const form = ref<any>(null)
const items = ref<any[]>([])

const itemid = ref<string | null>(null)
const item = reactive({
    title: "",
    date: "",
    description: "",
    reward: "",
    max_users: 32,
    type: 'season'
} as any)

const loading = ref(false)
const image = ref<File|null>(null)
const page = ref(1)
const perpage = ref(25)
const totalCount = ref(0)
const search = ref("")

const currentImage = computed(() => image.value?URL.createObjectURL(image.value as any):'/images/nophoto.jpg')
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

const clickFile = () => {
    document.getElementById('file')?.click()
}

const changeFile = (e: any) => {
    if(!e.target.files[0]) return
    image.value = e.target.files[0]
}

const handleStart = async (id: any, index: number) => {
    await start(id)
    items.value[index].status = 'process'
    // console.log(data)
}

const validate = async () => {
    const { valid } = await form.value.validate();
    if (valid) save()
}

const loadItems = async () => {
    loading.value = true
    
    const { data } = await get_all(qs.value)
    items.value = data.result
    totalCount.value = data.count
    
    loading.value = false
}

const save = async () => {
    const formdata = new FormData()
    Object.keys(item).map((key) => {
        formdata.append(key, item[key as keyof typeof item])
    })
    if(image.value) formdata.append('file', image.value)
    if (itemid.value) {
        
    } else {
        const { data } = await create(formdata)
        items.value.push(data)
    }

    close()
}

const editItem = (item: any) => {
    itemid.value = item._id;
    item.value = Object.assign({}, item);
    dialog.value = true;
}

const deleteItem = async (i: number, id: string) => {
    if (!confirm("Ushbu malumotni o'chirmoqchimisiz?")) return
    console.log('Deleted', id);
    items.value.splice(i, 1);
}

const close = () => {
    dialog.value = false;
    nextTick(() => {
        Object.assign(item, {
            title: "",
            date: "",
            description: "",
            reward: "",
            max_users: 32,
        });
        itemid.value = null;
        image.value = null
        form.value?.reset()
    });
}

watch(dialog, (v) => v || close())
</script>