<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { $getToken, $getMe } from '@/api/auth'
import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

interface AuthPayload {
  email: string,
  password: string
}

const userStore = useUserStore()
// const snackbarStore = useSnackbarStore()

const router = useRouter()
const isLoading = ref<boolean>(false)

const schema = z.object({
  email: z.string().email('Invalid email').refine(value => !!value, { message: 'Email is required' }),
  password: z.string().refine(value => !!value, { message: 'Password is required' }),
})

type Schema = z.output<typeof schema>

const state = reactive<AuthPayload>({
  email: '',
  password: ''
})

const toast = useToast()

const goToHomePage = async () => {
  await router.push('/')
}

const login = async () => {
  isLoading.value = true
  try {
    const res = await $getToken(state)

    userStore.saveToken(`Token ${res.data.auth_token}`)

    const loggedIn = userStore.isLoggedIn

    if (loggedIn) {
      const user = await $getMe()

      userStore.saveUser(user.data)

      await router.push('/profile')

      toast.add({
        title: 'Success',
        description: 'You have successfully logged in!',
        icon: 'i-heroicons-check-circle',
        timeout: 1500,
        color: 'green',
      })
    }
  } catch (e: any) {
    const message = e?.response?.data[Object.keys(e?.response?.data)[0]]
    toast.add({
      title: 'Error',
      description: message,
      icon: 'i-heroicons-check-circle',
      timeout: 1500,
      color: 'red',
    })
  } finally {
    isLoading.value = false
  }
}

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  // Do something with data
  console.log(event.data)
  console.log(event)
  await login()
}

definePageMeta({
  layout: 'blank'
})
</script>

<template>
  <div class="auth-wrapper auth-v2">
    <div class="auth-wrapper__container md:container md:mx-auto grid grid-flow-row-dense">
      <!-- Top bar -->
      <div class="col-span-12">
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
        <!-- /Brand logo-->
      </div>
      <!-- /Top bar -->

      <!-- Left Text-->
      <div
        class="col-span-8 row-span-10 hidden lg:flex items-center justify-center p-5"
      >
        <img
          src="@/assets/images/login/login-v2.svg"
          alt="login welcome image"
        />
      </div>
      <!-- /Left Text-->

      <!-- Login-->
      <div
        class="col-span-12 lg:col-span-4 row-span-10 flex items-center auth-login-bg"
      >
        <div
          class="mx-auto my-auto w-full"
        >
          <UCard>
            <template #header>
              <p>
                Welcome!
              </p>
              <span class="text-sm">
              Login to start using the system

              </span>
            </template>
            <template #default>
              <!-- form -->
              <UForm
                :schema="schema"
                :state="state"
                class="auth-login-form mt-2 pa-5"
                @submit="onSubmit"
              >
                <!-- email -->
                <UFormGroup
                  label="Email"
                  name="email"
                  class="mb-[10px]"
                >
                  <UInput
                    v-model="state.email"
                    autocomplete="username"
                    placeholder="Email"
                  />
                </UFormGroup>

                <!-- password -->
                <UFormGroup
                  label="Password"
                  name="password"
                  class="mb-[10px]"
                >
                  <UInput
                    v-model="state.password"
                    autocomplete="current-password"
                    type="password"
                    placeholder="············"
                  />
                </UFormGroup>

                <!-- submit buttons -->
                <UButton
                  type="submit"
                  :loading="isLoading"
                >
                  Log In
                </UButton>
              </UForm>
            </template>
          </UCard>
        </div>
      </div>
      <!-- /Login-->
    </div>
  </div>
</template>

<style lang="scss">
.auth-wrapper {
  height: 100vh;
  width: 100%;
  .auth-wrapper__container {
    height: 100%;
  }
}

.auth-wrapper .auth-login-bg {
  background-color: #FFFFFF;
  @media (max-width: 1024px) {
    background-image: url(@/assets/images/login/login-v2.svg);
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
