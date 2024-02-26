import { createI18n } from 'vue-i18n'

export default createI18n({
    locale: localStorage.getItem('site-language') || 'ru',
    legacy: false,
    globalInjection: true,
    messages: {
        uz: {

        },
        ru: {

        }
    },
})