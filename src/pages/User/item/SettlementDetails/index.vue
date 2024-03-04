<script setup>
import { ref, computed, reactive, onMounted, h, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import CatePage from '@/components/common/CatePage.vue';
import SettleMentDetails from './SettlementDetails.vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import {
    options1,
    list,
    tableList,
    setColumns,
    dataSource,
    gouWuTitleColumns,
    gouWuDataSource
} from './data';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const showModals = ref(null);
const params = ref({});
const showDetails = ref(true);
onMounted(() => {
    params.value = showModals.value?.params;
});
watchEffect(() => {});
const loading = ref(false);
const value = ref('');
const value1 = ref();
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const getGoodsList = () => {
    loading.value = true;
};
const changeShowDetails = () => {
    showDetails.value = false;
};
</script>

<template>
    <div class="my-set-details" v-if="showDetails">
        <div class="card-box">
            <div class="title"> 结算明细 </div>
            <show-modal ref="showModals" :titleList="list">
                <template v-slot:active2>
                    <div class="search-cate" v-if="params.titleCate == list[0].cate">
                        <a-select
                            ref="select"
                            placeholder="按合同查看"
                            class="item"
                            v-model:value="value1"
                            :options="options1"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="所有时间"
                            class="item"
                            v-model:value="value1"
                            :options="options1"
                            @change="handleChange"
                        ></a-select>
                        <a-input
                            v-model:value="value"
                            class="item-input"
                            placeholder="名称和藏品"
                        />
                        <a-button
                            type="primary"
                            :loading="loading"
                            @click="getGoodsList"
                            :icon="h(SearchOutlined)"
                            >搜索</a-button
                        >
                    </div>
                    <div class="search-cate" v-else>
                        <a-input
                            v-model:value="value"
                            style="width: 330px"
                            placeholder="结算单号"
                        />
                        <a-button
                            type="primary"
                            :loading="loading"
                            @click="getGoodsList"
                            :icon="h(SearchOutlined)"
                            >搜索</a-button
                        >
                    </div>
                </template>
                <template v-slot:active3>
                    <div class="table-list" v-if="params.titleCate == list[0].cate">
                        <div class="title">
                            <span v-for="item in tableList" :key="item">{{ item.cate }}</span>
                        </div>
                        <div class="table-wrap">
                            <a-table
                                :pagination="false"
                                :columns="setColumns"
                                :dataSource="dataSource"
                            >
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === `time`">
                                        <div>{{ record.time }}</div>
                                    </template>
                                    <template v-if="column.key === `details`">
                                        <span @click="changeShowDetails" class="details">{{
                                            record.details
                                        }}</span>
                                    </template>
                                </template>
                            </a-table>
                            <a-table
                                :pagination="false"
                                :columns="setColumns"
                                :dataSource="dataSource"
                            >
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === `time`">
                                        <div>{{ record.time }}</div>
                                    </template>
                                    <template v-if="column.key === `details`">
                                        <span @click="changeShowDetails" class="details">{{
                                            record.details
                                        }}</span>
                                    </template>
                                </template>
                            </a-table>
                            <a-table
                                :pagination="false"
                                :columns="setColumns"
                                :dataSource="dataSource"
                            >
                                <template #bodyCell="{ column, record }">
                                    <template v-if="column.key === `time`">
                                        <div>{{ record.time }}</div>
                                    </template>
                                    <template v-if="column.key === `details`">
                                        <span @click="changeShowDetails" class="details">{{
                                            record.details
                                        }}</span>
                                    </template>
                                </template>
                            </a-table>
                        </div>
                    </div>
                    <div class="table-wrap" v-else>
                        <a-table
                            :pagination="false"
                            :columns="gouWuTitleColumns"
                            :dataSource="gouWuDataSource"
                        ></a-table>
                        <CatePage></CatePage>
                    </div>
                </template>
            </show-modal>
        </div>
    </div>
    <SettleMentDetails v-else></SettleMentDetails>
</template>

<style scoped lang="less">
.my-set-details {
    .table-list {
        .title {
            .flex-row;
            font-weight: 400;
            background-color: #eef3f8;

            span {
                flex: 1;
                text-align: center;
            }
        }

        .ant-table-wrapper {
            margin: 30px 0;
        }

        :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
            background-color: #eef3f8;
            font-weight: 400;
        }

        .details {
            padding: 8px 10px;
            border: 1px solid #ebebeb;
            cursor: pointer;
        }
    }
}
</style>
