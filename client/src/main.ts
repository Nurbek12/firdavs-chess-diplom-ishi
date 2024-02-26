import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify'

createApp(App)
    .use(createPinia())
    .use(router)
    .use(vuetify)
    .mount('#app')






// import apolloClient from './apollo'
// import '@mdi/font/css/materialdesignicons.min.css'
// import { DefaultApolloClient } from '@vue/apollo-composable'

// const app = createApp({
//     setup(){
//         provide(DefaultApolloClient, apolloClient)
//     },
//     render: () => h(App)
// })