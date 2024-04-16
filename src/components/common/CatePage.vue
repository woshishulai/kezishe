<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { info } from '@/hooks/antd/message';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    paginations: {
        type: Object,
        default: {}
    },
    pageSizeOptions: {
        type: Array,
        default: ['10', '15', '20', '30']
    }
});
const emits = defineEmits(['fetchList']);
onMounted(() => {});
const page = ref(1);
const pageSize = ref(10);
const onChange = () => {
    if (page.value * pageSize.value >= props.paginations?.total) {
        info('error', '当前已是最后一页');
        return;
    }
    emits('fetchList', page.value, pageSize.value);
};
</script>
<!-- :hideOnSinglePage="true" -->
<template>
    <div class="cate-page">
        <a-pagination
            @change="onChange"
            :showSizeChanger="true"
            v-model:pageSize="pageSize"
            :hideOnSinglePage="true"
            v-model:current="page"
            :page-size-options="pageSizeOptions"
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
