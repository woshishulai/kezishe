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
    // console.log(page.value, pageSize.value);
    // return;
    // if (page.value * pageSize.value >= props.paginations?.total) {
    //     info('error', '当前已是最后一页');
    //     return;
    // }
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
            v-model:current="page"
            :page-size-options="pageSizeOptions"
            :total="props.paginations.total || 1"
        />
    </div>
</template>
<style scoped lang="less">
.cate-page {
    .flex-row;
    padding: 25px 0;
    height: 102px;
    :deep(.ant-pagination) {
        .ant-pagination-item {
            min-width: auto;
            width: 38px;
            height: 35px;
            border-radius: 4px;
            a {
                height: 100%;
                line-height: 35px;
            }
        }
        .ant-pagination-next,
        .ant-pagination-prev {
            display: none;
        }
        .ant-pagination-options-quick-jumper input {
            width: 120px;
            text-align: center;
            background-color: #fff;
        }
        .ant-pagination-options {
            .ant-select {
                .ant-select-selector {
                    height: 34px;
                    border: 1px solid #dbdbdb;
                    border-radius: 3px;
                    .ant-select-selection-search-input {
                        height: 35px;
                        line-height: 35px;
                    }
                    .ant-select-selection-item {
                        line-height: 35px;
                    }
                }
            }
        }
    }
}
</style>
