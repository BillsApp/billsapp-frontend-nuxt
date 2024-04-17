<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore()

const goToHomePage = async () => {
  await router.push('/')
}

const logout = async () => {
  userStore.userLogout()
  await router.push('/login')
}

const goToLoginPage = async () => {
  await router.push('/login')
}

const goToProfilePage = async () => {
  await router.push('/profile')
}
</script>

<template>
  <div class="md:container md:mx-auto flex justify-between">
    <!-- Brand logo-->
    <div
      class="brand-logo flex items-center"
      @click="goToHomePage"
    >
      <img
        class="brand-logo__img mr-[20px]"
        src="@/assets/images/logo.svg"
        alt="Logo"
      >
      <h1 class="brand-logo__title">
        Vision
      </h1>
    </div>
    <div class="flex items-center">
      <div
        v-if="!userStore.isLoggedIn"
      >
        <UButton
          @click="goToLoginPage"
        >
          <UIcon name="i-heroicons-arrow-right-end-on-rectangle" />
          Log In
        </UButton>
      </div>
      <div
        v-else
      >
        <UButton
          @click="goToProfilePage"
        >
          Profile
          <UIcon name="i-heroicons-user" />
        </UButton>
        <span class="mx-[5px]"></span>
        <UButton
          @click="logout"
        >
          Log Out
          <UIcon name="i-heroicons-arrow-right-on-rectangle" />
        </UButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.brand-logo {
  cursor: pointer;
  .brand-logo__img {
    max-height: 70px;
  }
  .brand-logo__title {
    font-size: 40px;
    font-family: "Luminari", sans-serif;
  }
}
</style>
