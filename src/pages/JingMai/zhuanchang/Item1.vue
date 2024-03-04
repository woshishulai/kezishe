<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import Title from '../item/Title.vue';
import LeftMenu from '../item/LeftMenu.vue';
import RightList from '../item/RightList.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="wrap">
        <Title></Title>
        <div class="con-wrap">
            <LeftMenu></LeftMenu>
            <RightList></RightList>
        </div>
    </div>
</template>

<style scoped lang="less">
.wrap {
    padding-bottom: 40px;
    .con-wrap {
        display: flex;
        flex-direction: row;
        gap: 15px;
        margin-top: 20px;
    }
}
</style>
