<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getCaoGaoApi } from '@/request/api';
import { info } from '@/hooks/antd/message';
import { removeMail } from '@/request/api';
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
    } catch (error) {
        info('error', error);
    }
};
watchEffect(() => {
    props.params.titleCate == '草稿' ? getMailList(1, 10) : '';
});
const emits = defineEmits(['changePage']);
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
    if (!all.value) {
        checkList.value.DelList = list.value.map((item) => {
            let query = {
                Id: item.Id,
                FormType: item.FormType
            };
            return query;
        });
        all.value = true;
        return;
    } else {
        checkList.value.DelList = [];
        all.value = false;
        return;
    }
};
const removeMailsList = async () => {
    if (!checkList.value.DelList.length) {
        return;
    }
    try {
        let res = await removeMail(checkList.value);
        list.value = list.value.filter((item) => {
            return !checkList.value.DelList.some((delItem) => delItem.Id === item.Id);
        });
        checkList.value.DelList = [];
    } catch (error) {
        info('error', error);
    }
};
const showDetails = async (record) => {
    console.log(record);
    const query = {
        Types: '2',
        Id: record.Id,
        Title: record.Title,
        ReplayId: 0,
        MsgTab: '0',
        Contents: record.Contents,
        page: '写信'
    };
    emits('changePage', query);
    router.push({
        path: '/user/mail?',
        query: {
            tab: 'write'
        }
    });
};
</script>

<template>
    <div class="draft">
        <a-table
            :pagination="false"
            :columns="columns"
            :data-source="list"
            :custom-row="
                (record) => {
                    return {
                        onClick: (event) => {
                            showDetails(record);
                        }
                    };
                }
            "
        >
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
        <div class="footer">
            <div>
                <a-checkbox
                    @change="getAll()"
                    style="margin-right: 15px"
                    :checked="all"
                ></a-checkbox>
                <span class="all">全选</span>
            </div>
            <span class="remove" @click="removeMailsList">删除</span>
            <span>总计{{ list.length }}项 已选{{ checkList.DelList.length }}项</span>
        </div>
        <CatePage :paginations="params" @fetchList="getMailList"></CatePage>
    </div>
</template>

<style scoped lang="less">
.draft {
}
:deep(.ant-table-row) {
    cursor: pointer;
}
.footer {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px 16px;
    font-size: 16px;
    color: #333333;
    .all {
    }
    .remove {
        cursor: pointer;
    }
}

// :deep(.ant-table-thead) {
//     display: none;
// }
/* 在这里添加你的 Less 样式 */
</style>
