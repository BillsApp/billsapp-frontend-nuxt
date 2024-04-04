<script setup lang="ts">
const router = useRouter()

const goToProfilePage = async () => {
  await router.push('/profile')
}
</script>

<template>
  <div>
    <div class="home-page-hero grid grid-cols-12">
      <div class="col-span-6 my-auto px-[160px]">
        <h4>I'm Juliana Silva</h4>
        <h2>Transform your life and unleash full potential.</h2>
        <h5>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod vitae non diam ipsum, augue amet amet.
          At nisl amet consecte.
        </h5>
        <UButton
          class="mt-[10px]"
          size="xl"
          @click="goToProfilePage"
        >
          Start Now!
        </UButton>
      </div>
      <div class="col-span-6">
        <img src="@/assets/images/home/coach-hero-home.png" alt="img">
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.home-page-hero {
  background-image: url(@/assets/images/home/bg-hero-home-v3.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  h4 {
    font-size: 24px;
    color: rgb(36, 47, 101);
    font-weight: 600;
    font-family: Fraunces, sans-serif;
  }
  h2 {
    font-size: 67px;
    color: rgb(36, 47, 101);
    font-weight: 600;
    font-family: Fraunces, sans-serif;
  }
  h5 {
    font-size: 18px;
    font-family: Mulish, sans-serif;
    font-weight: 400;
  }
}
</style>
