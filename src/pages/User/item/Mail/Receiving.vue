<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getMailApi, getMailDetailsApi } from '@/request/api';
import { getImageUrl } from '@/utils';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const list = ref([]);
const details = ref({});
const getMailList = async (page, pageSize) => {
    try {
        params.page = page;
        params.pageSize = pageSize;
        let res = await getMailApi(params);
        list.value = res.Data;
        params.total = res.Total;
    } catch (error) {
        info('error', error);
    }
};
const isShowDetails = ref(false);
const props = defineProps({
    params: {
        type: Object,
        default: {}
    }
});
const params = reactive({
    total: 1
});
watchEffect(() => {
    console.log(props.params.titleCate);
    props.params.titleCate == '收件' ? getMailList(1, 10) : '';
});
const emits = defineEmits(['changePage']);

const columns = [
    {
        title: '主题',
        dataIndex: 'Title',
        key: 'Title'
        // align: 'left'
    },
    {
        title: '时间',
        dataIndex: 'BaseCreateTime',
        key: 'BaseCreateTime',
        align: 'center'
    }
];
const showDetails = async (record) => {
    console.log('我是第一个执行； ');
    try {
        let res = await getMailDetailsApi({ id: record.Id, FormType: record.FormType });
        if (res.Tag == 1) {
            details.value = res.Data[0];
            isShowDetails.value = true;
        }
    } catch (error) {
        info('error', error);
    }
};

const showXin = () => {
    const query = {
        Types: '3',
        ReplayId: details.value.Id,
        MsgTab: '0',
        page: '写信',
        Contents: details.value.Contents
    };
    router.push({
        path: '/user/mail?',
        query: {
            tab: 'write'
        }
    });
    emits('changePage', query);
};
</script>

<template>
    <div class="receiving" v-if="!isShowDetails">
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
                        <!-- <img src="" alt=""> -->
                        {{ record.Title }}
                    </div>
                </template>
            </template>
        </a-table>
        <CatePage :paginations="params" @fetchList="getMailList"></CatePage>
    </div>
    <div class="receiving" v-else>
        <div class="change-status">
            <a-button
                style="background-color: #d9e1e7; color: #4a4a4a"
                @click="isShowDetails = false"
                >返回</a-button
            >
            <a-button style="background-color: #e2332a" @click="showXin">回复</a-button>
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
.receiving {
    padding-bottom: 40px;
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
</style>
