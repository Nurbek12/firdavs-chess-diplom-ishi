import { defineStore } from 'pinia'
import cookie from 'js-cookie'

export default defineStore('app', {
    state: () => ({
        token: cookie.get('token')||null,
        user: JSON.parse(localStorage.getItem('user')||"null") as any,
    }),
    getters: {
        isLogged: state => !!state.token,
        get_token: state => state.token,
        get_user: state => state.user,
        isAdmin: state => state.user?.role === 'admin',
    },
    actions: {
        set_token(token: string | null){
            if(token)
                cookie.set('token', token, { expires: new Date(new Date().getTime() + 2 * 60 * 60 * 1000) })
            else
                cookie.remove('token')
            
            this.$patch({ token })
        },
        set_user(user: any | null){
            if(user)
                localStorage.setItem('user', JSON.stringify(user))
            else
                localStorage.removeItem('user')
            
            this.$patch({ user })
        },
        logout() {
            this.set_token(null)
            this.set_user(null)
            location.href = '/login'
        }
    }
})