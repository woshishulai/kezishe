<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import ChengJiaoBanner from './ChengJiaoBanner.vue';
import ChengJiaoNews from './ChengJiaoNew.vue';
import HotCate from './HotCate.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="cheng-jiao">
        <ChengJiaoBanner></ChengJiaoBanner>
        <ChengJiaoNews></ChengJiaoNews>
        <HotCate></HotCate>
    </div>
</template>

<style scoped lang="less"></style>
