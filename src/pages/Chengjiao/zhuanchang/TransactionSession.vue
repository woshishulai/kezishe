<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';

const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const activeKey = ref(['1', '2', '3', '4']);
const yearList = [
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
const cateList2 = [
    {
        value: '竞买',
        label: '竞买'
    },
    {
        value: '一口价',
        label: '一口价'
    },
    {
        value: '周周转',
        label: '周周转'
    }
];
const state = reactive({
    value1: ['2023', '2021'],
    value2: '0',
    value3: ['邮品'],
    value4: ['竞买', '一口价', '周周转']
});
watchEffect(() => {
    console.log(state.value1);
    console.log(state.value2);
    console.log(state.value3);
    console.log(state.value4);
});
</script>

<template>
    <div class="transaction-session">
        <div class="left-wrap">
            <a-collapse v-model:activeKey="activeKey">
                <a-collapse-panel key="1" header="年份">
                    <a-checkbox-group
                        v-model:value="state.value1"
                        name="checkboxgrosssfffup"
                        :options="yearList"
                    />
                </a-collapse-panel>
                <a-collapse-panel key="2" header="月份">
                    <a-select
                        v-model:value="state.value2"
                        style="width: 100%"
                        :options="monthList"
                    ></a-select>
                </a-collapse-panel>
                <a-collapse-panel key="3" header="类别">
                    <a-checkbox-group
                        v-model:value="state.value3"
                        name="checkboxgsssroup"
                        :options="cateList1"
                    />
                </a-collapse-panel>
                <a-collapse-panel key="4" header="类别">
                    <a-checkbox-group
                        v-model:value="state.value4"
                        name="checkboxgrousssp"
                        :options="cateList2"
                    />
                </a-collapse-panel>
            </a-collapse>
        </div>
        <div class="right-wrap">
            <div class="cate-item" v-for="(item, index) in 6" :key="index">
                <img src="@/assets/img/chengjiao/list5.png" alt="" />
                <div class="label">
                    <p>9月现代金银币精品专场（一）</p>
                </div>
            </div>
            <CatePage></CatePage>
        </div>
    </div>
</template>

<style scoped lang="less">
.transaction-session {
    display: flex;
    gap: 15px;
    .left-wrap {
        width: 260px;
    }
    .right-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        .cate-item {
            position: relative;
            height: 280px;
            border-radius: 10px;
            cursor: pointer;
            &:hover {
                .label {
                    z-index: 1;
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
                padding: 20px 50px;
                color: #fff;
                font-size: 18px;
                background-color: #96908c;
                border-radius: 0 0 6px 6px;
            }
        }
    }
}
</style>
