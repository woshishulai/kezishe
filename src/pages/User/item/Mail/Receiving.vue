<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getMailApi, getMailDetailsApi } from '@/request/api';
import { getImageUrl } from '@/utils';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const list = ref([]);
const details = ref({});
const isShowDetails = ref(false);
const params = reactive({
    total: 1
});
onMounted(() => {
    getMailList(1, 10);
});
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
const showDetails = async (id) => {
    try {
        let query = {
            id: id
        };
        let res = await getMailDetailsApi(query);
        if (res.Tag == 1) {
            details.value = res.Data[0];
        }
    } catch (error) {
        info('error', error);
    }
    isShowDetails.value = true;
};
</script>

<template>
    <div class="receiving" v-if="!isShowDetails">
        <div class="titles">
            <div class="label max-width">主题</div>
            <div class="time">时间</div>
        </div>
        <div class="mail-list">
            <div
                class="mail-item"
                v-for="item in list"
                :key="item.id"
                @click="showDetails(item.Id)"
            >
                <div class="label">
                    <span v-if="item.IsRead == 0">news</span>
                    {{ item.Title }}</div
                >
                <div class="time">{{ item.BaseCreateTime }}</div>
            </div>
        </div>
        <CatePage :paginations="params" @fetchList="getMailList"></CatePage>
    </div>
    <div class="receiving" v-else>
        <div class="change-status">
            <a-button @click="isShowDetails = false">返回</a-button>
            <a-button>回复</a-button>
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
    .label {
        flex: 1;
    }
    .time {
        text-align: left;
        width: 150px;
    }
    .titles {
        .flex-row;
        text-align: center;
        justify-content: space-between;
        padding: 20px 16px;
        border-bottom: 1px solid #e8e8e8;
        .max-width {
            max-width: 600px;
        }
        .time {
            text-align: center;
        }
    }
    .mail-list {
        .mail-item {
            .flex-row;
            justify-content: space-between;
            padding: 20px 16px;
            cursor: pointer;
            border-bottom: 1px solid #e8e8e8;
            &:hover {
                background-color: #f4f4f4;
            }
        }
    }
    .change-status {
        display: flex;
        justify-content: flex-end;
        gap: 20px;
        margin-top: 30px;
    }
    .cen-text-wrap {
        margin-top: 50px;
        padding-left: 100px;
        h5 {
            font-size: 20px;
            margin-bottom: 20px;
        }
        .form,
        .times {
            color: #666;
            font-size: 16px;
            line-height: 24px;
        }
        .details {
            margin-top: 20px;
            :deep(p) {
                font-size: 16px !important;
                color: #666 !important;
                background-color: #fff !important;
                line-height: 30px !important;
                text-align: left !important;
            }
            :deep(span) {
                font-size: 16px !important;
                color: #666 !important;
                background-color: #fff !important;
                line-height: 30px !important;
                text-align: left !important;
            }
        }
    }
}
</style>
