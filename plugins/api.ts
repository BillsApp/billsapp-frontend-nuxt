import axiosIns from '@/api/axios'
import { useUserStore } from '@/stores/user'

export default defineNuxtPlugin(nuxtApp => {
  const router = useRouter()

  axiosIns.interceptors.request.use(config => {
    const userStore = useUserStore()

    if (userStore.isLoggedIn) {
      config.headers.Authorization = userStore.authToken
    }

    return config
  }, error => {
    if (error.re)
      return Promise.reject(error)
  })

  axiosIns.interceptors.response.use(
    response => response,
    error => {
      const userStore = useUserStore()

      const { config, response } = error
      if (response && (response.status === 401)) {
        userStore.userLogout()
        router.push('/login')
      }

      return Promise.reject(error)
    },
  )
  // return {
  //   provide: {
  //     backend: axiosIns
  //   }
  // }
})
