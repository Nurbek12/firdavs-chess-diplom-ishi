<template>
    <v-container fluid>
        <v-row justify="space-between" align="center">
            <v-col cols="9" sm="6" md="4" class="pb-0 pr-0">
                <v-text-field @update:modelValue="debounceSearch" placeholder="Поиск" append-inner-icon="mdi-magnify"
                    hide-details flat density="compact" variant="outlined" color="primary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-card flat border>
                    <v-card-title class="px-4 pt-3">Мачты</v-card-title>
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
                                <template #item.name="{ item }">
                                    <td data-label>
                                        {{ item.name }}
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
    </v-container>
</template>
  
<script setup lang="ts">
import { debounce } from 'lodash'
import { ref, computed } from 'vue'

const headers = [
    { title: 'Игроки', key: 'users', sortable: true },
    { title: 'Победитель', key: 'winner', sortable: false },
    { title: 'Дата', key: 'date', sortable: true },
    { title: 'Турнир', key: 'tournament', sortable: false },
    { title: 'Управлять', key: 'actions', sortable: false, align: 'end' },
]

const page = ref(1)
const search = ref("")
const perpage = ref(25)
const totalCount = ref(0)
const loading = ref(false)
const items = ref<any[]>([])

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


const loadItems = async () => {
    loading.value = true
   
    console.log(qs.value)

    loading.value = false
}
</script>