<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { fetChZhuanChangAPi } from '@/request/chengjiao/api';
import { getImageUrl } from '@/utils';
//参数
const state = reactive({
    Years: [],
    Month: '0',
    CategoryIds: []
});
const fetchDataList = ref([]);
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const activeKey = ref(['1', '2', '3']);
const yearList = [
    {
        label: '2024',
        value: '2024'
    },
    {
        label: '2023',
        value: '2023'
    },
    {
        label: '2022',
        value: '2022'
    },
    {
        label: '2021',
        value: '2021'
    },
    {
        label: '2020',
        value: '2020'
    },
    {
        label: '2019',
        value: '2019'
    },
    {
        label: '2018',
        value: '2018'
    },
    {
        label: '2017',
        value: '2017'
    },
    {
        label: '2016',
        value: '2016'
    },
    {
        label: '2015',
        value: '2015'
    },
    {
        label: '2014',
        value: '2014'
    },
    {
        label: '2013',
        value: '2013'
    },
    {
        label: '2012',
        value: '2012'
    },
    {
        label: '2011',
        value: '2011'
    },
    {
        label: '2010',
        value: '2010'
    },
    {
        label: '2009',
        value: '2009'
    },
    {
        label: '2008年以前',
        value: '2008年以前'
    }
];
const monthList = ref([
    { value: '0', label: '所有月份' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' }
]);
const cateList1 = [
    {
        value: '邮品',
        label: '邮品'
    },
    {
        value: '钱币',
        label: '钱币'
    },
    {
        value: '文献',
        label: '文献'
    },
    {
        value: '自淘',
        label: '自淘'
    }
];
const fetchList = async (page = 1, pageSize = 10) => {
    let query = { ...state };
    query.PageIndex = page;
    query.PageSize = pageSize;
    query.CategoryIds = query.CategoryIds.join(',');
    query.Years = query.Years.join(',');
    try {
        let res = await fetChZhuanChangAPi(query);
        if (res.Tag == 1) {
            fetchDataList.value = res.Data;
        }
    } catch (error) {
        console.log(error);
    }
};
watch(
    () => state,
    () => {
        fetchList();
    },
    {
        immediate: true,
        deep: true
    }
);
</script>

<template>
    <div class="transaction-session">
        <div class="left-wrap">
            <a-collapse expandIconPosition="end" v-model:activeKey="activeKey">
                <template #expandIcon>
                    <img :src="getImageUrl('chengjiao/down.png')" alt="" />
                </template>
                <a-collapse-panel key="1" header="年份">
                    <a-checkbox-group
                        v-model:value="state.Years"
                        name="checkboxgrosssfffup"
                        :options="yearList"
                    />
                </a-collapse-panel>
                <a-collapse-panel key="2" header="月份">
                    <a-select
                        v-model:value="state.Month"
                        style="width: 100%"
                        :options="monthList"
                    ></a-select>
                </a-collapse-panel>
                <a-collapse-panel key="3" header="类别">
                    <a-checkbox-group
                        v-model:value="state.CategoryIds"
                        name="checkboxgsssroup"
                        :options="cateList1"
                    />
                </a-collapse-panel>
            </a-collapse>
        </div>
        <div class="right-wrap">
            <div class="cate-item" v-for="(item, index) in fetchDataList" :key="index">
                <img :src="item.Img" alt="" />
                <div class="label"> </div>
                <p class="label-text">{{ item.Title }}</p>
            </div>
            <CatePage></CatePage>
        </div>
    </div>
</template>

<style scoped lang="less">
.transaction-session {
    display: flex;
    gap: 11px;
    .left-wrap {
        width: 260px;

        :deep(.ant-collapse) {
            .ant-collapse-content {
                color: #f8f8f8;
                border-radius: 0 0 5px 5px;
            }
            .ant-collapse-item {
                margin-bottom: 13px;
                .ant-collapse-header {
                    border-radius: 5px 5px 0 0;
                    padding-left: 20px;
                }
                .ant-checkbox-wrapper {
                    .ant-checkbox-inner {
                        border-width: 1px;
                        border-color: rgb(217, 217, 217);
                        border-style: solid;
                        width: 16px;
                        height: 16px;
                        border-radius: 2px;
                        &::after {
                            width: 5px;
                            height: 8px;
                        }
                    }
                    .ant-checkbox + span {
                        line-height: auto;
                        font-size: 14px;
                        margin-left: 10px;
                    }
                }
                .ant-checkbox-group {
                    gap: 16px;
                }
                .ant-collapse-content-box {
                    background-color: #f8f8f8;
                    border-radius: 0 0 5px 5px;
                    padding: 20px;
                }
            }
            .ant-select-selector {
                border-width: 1px;
                border-color: rgb(212, 212, 212);
                border-style: solid;
                border-radius: 5px;
                height: 46px;
                font-size: 14px;
                .ant-select-selection-item {
                    line-height: 45px;
                }
            }
            .ant-select .ant-select-arrow svg {
                color: #b0b0b0;
            }
        }
    }
    .right-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 13px;
        .cate-item {
            position: relative;
            height: 319px;
            border-radius: 10px;
            cursor: pointer;
            &:hover {
                .label {
                    z-index: 1;
                }
                .label-text {
                    z-index: 3;
                }
            }
            img {
                width: 100%;
                height: 100%;
                border-radius: 6px;
            }
            .label {
                position: absolute;
                z-index: -1;
                bottom: 0;
                width: 100%;
                color: #fff;
                font-size: 18px;
                background-color: #96908c;
                border-radius: 0 0 6px 6px;
                opacity: 0.502;
                height: 53px;
            }
            .label-text {
                position: absolute;
                bottom: 20px;
                color: #fff;
                z-index: -1;
                padding: 0 50px;
            }
        }
    }
}
</style>
