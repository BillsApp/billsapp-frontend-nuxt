import { defineStore } from 'pinia'
import type { User } from '@/types/store/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User,
    authToken: '' as string,
  }),
  getters: {
    userId: state => state.user.id,
    isLoggedIn: state => state.authToken !== '',
  },
  actions: {
    saveUser(user: User) {
      this.user = user
    },

    saveToken(token: string) {
      this.authToken = token
    },

    userLogout() {
      this.authToken = ''
      this.user = {} as User
    },
  },
  persist: {
    // You need to implement your own persistedState object for localStorage
    storage: persistedState.localStorage,
  },
})
