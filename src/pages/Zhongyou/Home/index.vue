<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import Banner from './Banner.vue';
import NewMake from './NewMake.vue';
import HotGoods from './HotGoods.vue';
import Sale from './Sale.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="wrap">
        <Banner></Banner>
        <NewMake></NewMake>
        <HotGoods></HotGoods>
        <Sale></Sale>
    </div>
</template>

<style scoped lang="less">
.wrap {
    padding-bottom: 30px;
}
</style>
