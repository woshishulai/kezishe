<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import ComDetails from '@/components/common/ComDetails.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const query = {
    addPrice: true
};
</script>

<template>
    <ComDetails :query="query"></ComDetails>
</template>

<style scoped lang="less"></style>
