import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.min.css'

export default createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        themes: {
            dark: {
                dark: true,
                colors: {
                    background: "#1f2122",
                    surface: "#27292a",
                    primary: "#f5ac4a",
                }
            }
        }
    }
})