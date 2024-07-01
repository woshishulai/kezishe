<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getFaSongApi, removeMail, getMailDetailsApi } from '@/request/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    params: {
        type: Object,
        default: {}
    }
});
const details = ref({});
const isShowDetails = ref(false);

const list = ref([]);
const params = reactive({
    total: 1
});
const getMailList = async (page, pageSize) => {
    try {
        params.PageIndex = page;
        params.PageSize = pageSize;
        let res = await getFaSongApi(params);
        list.value = res.Data;
        params.total = res.Total;
        console.log(res);
    } catch (error) {
        info('error', error);
    }
};
watchEffect(() => {
    props.params?.titleCate == '发件' ? getMailList(1, 10) : '';
});
const emits = defineEmits(['changePage']);
const columns = [
    {
        title: '主题',
        dataIndex: 'Title',
        key: 'Title',
        align: 'left',
        width: 780
    },
    {
        title: '时间',
        dataIndex: 'BaseCreateTime',
        key: 'BaseCreateTime',
        align: 'left'
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
const getDetailsInfo = async (query) => {
    let res = await getMailDetailsApi(query);
    details.value = res.Data[0];
    isShowDetails.value = true;
};
const showDetails = async (record) => {
    const query = {
        id: record.Id,
        FormType: record.FormType
    };
    getDetailsInfo(query);
};
</script>

<template>
    <div class="send-element" v-if="!isShowDetails">
        <a-table :pagination="false" :columns="columns" :data-source="list">
            <template #headerCell="{ column, record }">
                <template v-if="column.key === 'Title'">
                    <div style="padding-left: 100px; font-size: 15px">
                        {{ column.title }}
                    </div>
                </template>
                <template v-if="column.key === 'BaseCreateTime'">
                    <div style="padding-left: 14px; font-size: 15px">
                        {{ column.title }}
                    </div>
                </template>
            </template>
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Title'">
                    <div class="title-item">
                        <span class="news" :class="record.IsRead == 1 ? 'active' : ''">News</span>
                        <a-checkbox
                            @change.stop="showCheck(record)"
                            style="margin-right: 15px"
                            :checked="getChecked(record.Id)"
                        ></a-checkbox>
                        <p @click="showDetails(record)"> {{ record.Title }}</p>
                    </div>
                </template>
                <template v-if="column.key === 'BaseCreateTime'">
                    <p @click="showDetails(record)"> {{ record.BaseCreateTime }}</p>
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
        <CatePage :paginations="params" @fetchList="getFaSongApi"></CatePage>
    </div>
    <div class="receiving" v-else>
        <div class="change-status">
            <a-button
                style="background-color: #d9e1e7; color: #4a4a4a"
                @click="isShowDetails = false"
                >返回</a-button
            >
            <!-- <a-button style="background-color: #e2332a" @click="showXin">回复</a-button> -->
        </div>
        <div class="cen-text-wrap">
            <h5>{{ details.Title }}</h5>
            <p class="form">发件：{{ details.FromName }}</p>
            <p class="times">时间：{{ details.BaseCreateTime }}</p>
            <div class="details" v-html="details.Contents"> </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.send-element {
}
:deep(.ant-table-row) {
    cursor: pointer;
}
.receiving {
    // padding-bottom: 40px;
    min-height: 600px;

    .change-status {
        display: flex;
        justify-content: flex-end;
        gap: 20px;
        margin-top: 30px;
    }
    .cen-text-wrap {
        margin-top: 30px;
        padding-left: 60px;
        h5 {
            font-size: 18px;
            margin-bottom: 20px;
            color: #101010;
        }
        .form,
        .times {
            color: #303030;
            font-size: 16px;
            line-height: 24px;
        }
        .details {
            margin-top: 20px;
            :deep(p) {
                font-size: 16px !important;
                color: #303030 !important;
                background-color: #fff !important;
                line-height: 30px !important;
                text-align: left !important;
            }
            :deep(span) {
                font-size: 16px !important;
                color: #303030 !important;
                background-color: #fff !important;
                line-height: 30px !important;
                text-align: left !important;
            }
        }
    }
}
:deep(.ant-table-wrapper) {
    .ant-table-thead {
        .ant-table-cell {
            font-weight: 400;
            font-size: 16px;
        }
    }
}
.footer {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px 25px;
    font-size: 14px;
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
