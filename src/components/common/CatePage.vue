<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    paginations: {
        type: Object,
        default: {}
    }
});
onMounted(() => {});
const current = ref(1);
</script>

<template>
    <div class="cate-page">
        <a-pagination
            :showSizeChanger="false"
            :hideOnSinglePage="true"
            v-model:current="current"
            :pageSize="props.paginations.pageSize"
            :total="props.paginations.total"
        />
    </div>
</template>
<style scoped lang="less">
.cate-page {
    .flex-row;
    padding: 20px 0;
    :deep(.ant-pagination .ant-pagination-options-quick-jumper input) {
        width: 120px;
        text-align: center;
        background-color: #fff;
    }
}
</style>
