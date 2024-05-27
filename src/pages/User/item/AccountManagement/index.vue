<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import UserInfoHeader from './item/UserInfoHeader.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="account">
        <UserInfoHeader></UserInfoHeader>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </div>
</template>

<style scoped lang="less">
:deep(.ant-btn-primary) {
    border-radius: 5px;
}
:deep(.ant-select-selector) {
    border-radius: 4px;
}
:deep(.ant-picker) {
    border-radius: 4px;
}
:deep(.ant-input) {
    border-radius: 4px;
}
:deep(.ant-input-affix-wrapper) {
    border-radius: 4px;
}
</style>
