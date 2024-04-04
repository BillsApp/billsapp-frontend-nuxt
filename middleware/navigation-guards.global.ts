export default defineNuxtRouteMiddleware((to, from) => {
  // skip middleware on server
  if (import.meta.server) return

  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn

  if (to.path === '/login') {
    if (isLoggedIn) {
      return navigateTo('/profile')
    } else {
      return
    }
  }

  if (to.meta.resource === 'auth') {
    if (isLoggedIn) {
      return
    } else {
      return navigateTo('/login')
    }
  }
  return
})
