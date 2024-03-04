<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const activeKey = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);
const state = reactive({
    value: ['竞买', '一口价', '预展'],
    value1: ['全选'],
    value2: [],
    value3: '结标时间',
    value4: ['竞买', '一口价', '周周转'],
    value5: '',
    value6: '',
    value7: '全部',
    value8: '0',
    value9: '多列大圈',
    value10: '',
    value11: '0'
});
const cateList = [
    {
        value: '竞买',
        label: '竞买'
    },
    {
        value: '一口价',
        label: '一口价'
    },
    {
        value: '预展',
        label: '预展'
    },
    {
        value: '预展中',
        label: '预展中'
    }
];
const catesList = [
    {
        value: '全选',
        label: '全选'
    },
    {
        value: '钱币类',
        label: '钱币类'
    },
    {
        value: '纪念系列--银 (118)',
        label: '纪念系列--银 (118)'
    },
    {
        value: '纪念系列--金 (11)',
        label: '纪念系列--金 (11)'
    },
    {
        value: '纪念系列--金 (11)',
        label: '纪念系列--金 (11)'
    }
];
const cate2List = [
    {
        value: '全选',
        label: '全选'
    },
    {
        value: '完全未使用品',
        label: '完全未使用品'
    },
    {
        value: '近未使用',
        label: '近未使用'
    },
    {
        value: '极美品',
        label: '极美品'
    },
    {
        value: '评级币',
        label: '评级币'
    }
];
const cate3List = [
    {
        value: '结标时间',
        label: '结标时间'
    },
    {
        value: '价格高的',
        label: '价格高的'
    },
    {
        value: '价格低的',
        label: '价格低的'
    },
    {
        value: '热门的',
        label: '热门的'
    }
];
const cate4List = [
    {
        value: '全部',
        label: '全部'
    },
    {
        value: '1小时',
        label: '1小时'
    },
    {
        value: '6小时',
        label: '6小时'
    },
    {
        value: '当天',
        label: '当天'
    }
];
const cate5List = [
    { value: '0', label: '0-不限' },
    { value: '1', label: '0-100' },
    { value: '2', label: '1-1000' },
    { value: '3', label: '1000-10000' },
    { value: '4', label: '10000-100000' }
];
const cate6List = [
    {
        value: '多列大圈',
        label: '多列大圈'
    },
    {
        value: '单列小圈',
        label: '单列小圈'
    }
];
const cate7List = [
    {
        value: 'PMG',
        label: 'PMG'
    },
    {
        value: 'PSG',
        label: 'PSG'
    },
    {
        value: 'PCGS',
        label: 'PCGS'
    },
    {
        value: 'ASG',
        label: 'ASG'
    },
    {
        value: '中郎',
        label: '中郎'
    },
    {
        value: '源泰',
        label: '源泰'
    },
    {
        value: '信泰',
        label: '信泰'
    }
];
const cate8List = [
    {
        value: '0',
        label: '0-不限'
    },
    {
        value: '1',
        label: '1-30'
    },
    {
        value: '2',
        label: '30-60'
    },
    {
        value: '3',
        label: '60-100'
    }
];
</script>

<template>
    <div class="left-menu">
        <div class="top-cate">
            <a-checkbox-group
                v-model:value="state.value"
                name="checkboxddddddgrosssfffup"
                :options="cateList"
            />
        </div>
        <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel key="1" header="分类">
                <a-checkbox-group
                    v-model:value="state.value1"
                    name="checkboxgrosssfffup"
                    :options="catesList"
                />
            </a-collapse-panel>
            <a-collapse-panel key="2" header="品级">
                <a-checkbox-group
                    v-model:value="state.value2"
                    name="checkboxgroufsfsssp"
                    :options="cate2List"
                />
            </a-collapse-panel>
            <a-collapse-panel key="3" header="排序">
                <a-radio-group v-model:value="state.value3" name="weism" :options="cate3List" />
            </a-collapse-panel>
            <a-collapse-panel key="5" header="时间">
                <div class="times">
                    <a-date-picker
                        value-format="YYYY-MM-DD"
                        placeholder="开始时间"
                        id="kaishi"
                        v-model:value="state.value5"
                        style="width: 100%"
                    />
                    <a-date-picker
                        value-format="YYYY-MM-DD"
                        placeholder="结束时间"
                        id="jieshu"
                        v-model:value="state.value6"
                        style="width: 100%"
                    />
                    <a-button type="primary">搜索</a-button>
                </div>
            </a-collapse-panel>
            <a-collapse-panel key="6" header="结标">
                <a-radio-group
                    v-model:value="state.value7"
                    name="zhinengxuanyige"
                    :options="cate4List"
                />
            </a-collapse-panel>
            <a-collapse-panel key="7" header="价格">
                <a-select
                    v-model:value="state.value8"
                    style="width: 100%"
                    :options="cate5List"
                ></a-select>
            </a-collapse-panel>
            <a-collapse-panel key="8" header="显示">
                <a-radio-group
                    v-model:value="state.value9"
                    name="zhinlmlmkmfmmfengxuanyige"
                    :options="cate6List"
                />
            </a-collapse-panel>
            <a-collapse-panel key="9" header="评级公司">
                <a-radio-group
                    v-model:value="state.value10"
                    name="zhinlmlmkmfmmfedllssgxuanyige"
                    :options="cate7List"
                />
            </a-collapse-panel>
            <a-collapse-panel key="7" header="分数">
                <a-select
                    v-model:value="state.value11"
                    style="width: 100%"
                    :options="cate8List"
                ></a-select>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>

<style scoped lang="less">
.left-menu {
    width: 260px;
    .top-cate {
        background-color: #f4f4f4;
        padding: 40px 20px;
        margin-bottom: 30px;
        .ant-checkbox-group {
            row-gap: 20px;
        }
    }
    :deep(.ant-radio-group) {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .times {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
}
</style>
