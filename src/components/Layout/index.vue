<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
</script>

<template>
    <Header></Header>
    <RouterView></RouterView>
    <Footer></Footer>
</template>
<style scoped lang="less"></style>
