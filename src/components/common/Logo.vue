<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="header-logo" @click="router.push('/')">
        <img class="logo" src="@/assets/img/common/logo.png" alt="" />
        <div class="text-wrap">
            <h5>您好，欢迎来到壳子社</h5>
            <h5>免费咨询热线：4000-888-0888</h5>
        </div>
    </div>
</template>

<style lang="less">
.header-logo {
    .flex-row;
    justify-content: flex-start;
    gap: 20px;
    padding: 25px 0;
    width: 1300px;
    margin: 0 auto;

    .logo {
        width: 246px;
    }

    .text-wrap {
        .flex-col;
        gap: 10px;
        align-items: flex-start;
        font-weight: 600;
    }
}
</style>
