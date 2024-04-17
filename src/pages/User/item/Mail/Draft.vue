<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getCaoGaoApi } from '@/request/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const loading = ref(false);
const props = defineProps({
    params: {
        type: Object,
        default: {}
    }
});
const list = ref([]);
const removeList = ref([]);

const params = reactive({
    total: 1
});
const getMailList = async (page, pageSize) => {
    try {
        params.PageIndex = page;
        params.PageSize = pageSize;
        let res = await getCaoGaoApi(params);
        list.value = res.Data;
        params.total = res.Total;
        console.log(res);
    } catch (error) {
        info('error', error);
    }
};
watchEffect(() => {
    props.params.titleCate == '草稿' ? getMailList(1, 10) : '';
});
const columns = [
    {
        title: '主题',
        dataIndex: 'Title',
        key: 'Title'
    },
    {
        title: '时间',
        dataIndex: 'BaseCreateTime',
        key: 'BaseCreateTime',
        align: 'center',
        width: 328
    }
];
const checkList = ref({
    Types: '2',
    DelList: []
});
const showCheck = (e) => {
    if (getChecked(e.Id)) {
        checkList.value.DelList = checkList.value.DelList.filter((item) => item.Id !== e.Id);
    } else {
        let query = {
            Id: e.Id,
            FormType: e.FormType
        };
        checkList.value.DelList.push(query);
    }
    console.log(checkList.value);
};

function getChecked(id) {
    const item = checkList.value.DelList.find((item) => item.Id === id);
    return item !== undefined;
}
const all = ref(false);
const getAll = () => {
    if (all) {
        checkList.value = list.value.map((item) => {
            let query = {
                Id: item.Id,
                FormType: item.FormType
            };
            return query;
        });
    } else {
        checkList.value.DelList = [];
    }
};
</script>

<template>
    <div class="draft">
        <a-table :pagination="false" :columns="columns" :data-source="list">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Title'">
                    <div class="title-item">
                        <a-checkbox
                            @change="showCheck(record)"
                            style="margin-right: 15px"
                            :checked="getChecked(record.Id)"
                        ></a-checkbox>
                        {{ record.Title }}
                    </div>
                </template>
            </template>
        </a-table>
        <div class="div">
            <a-checkbox @change="getAll()" style="margin-right: 15px" :checked="all"></a-checkbox>
        </div>
        <CatePage :paginations="params" @fetchList="getCaoGaoApi"></CatePage>
    </div>
</template>

<style scoped lang="less">
.draft {
}
:deep(.ant-table-row) {
    cursor: pointer;
}
// :deep(.ant-table-thead) {
//     display: none;
// }
/* 在这里添加你的 Less 样式 */
</style>
