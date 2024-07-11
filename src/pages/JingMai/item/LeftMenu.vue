<script setup>
import { ref, computed, reactive, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
    cateList,
    cateList1,
    cate2List,
    cate3List,
    cate4List,
    cate5List,
    cate8List
} from '../data';
const router = useRouter();
const route = useRoute();
const props = defineProps({
    RatingCompanyType: {
        type: Array,
        default: []
    },
    BidderType: {
        type: Array,
        default: []
    }
});
const requestNum = ref(0);
const state = reactive({
    Stype: null,
    KeyWd: '', //名称搜索
    Cate1: null, //区分专场、类别、搜索列表 1专场 2类别列表 3关键词搜索
    Cate2: 1, //0是 1否 ，默认列表列表左侧参数不参与计算，
    Lid: null, //传递当前请求专场或竞买类别ID 下称集合ID
    AuctionStatuses: '1,2', //藏品状态，1预展中、2竞买中，多个用逗号拼接
    AuctionBrands: '1,2', //藏品类型，1竞买、2一口价，多个用逗号拼接
    CategoryIds: '', //藏品集合ID，下级分类,多个用逗号拼接
    Grades: '1', //选中的 品级集合，多个用逗号拼接
    Sort: '1', //排序，1结标时间、2价格高的、3价格低的、4热门的
    DateStart: '', //开始时间
    DateEnd: '', //结束时间
    TimeRange: '0', //结标时间，0全部、1一小时、6六小时、24当天
    PriceRange: '0' //价格区间 0,N 0,122
});
const emits = defineEmits(['changeFormState']);
const changeParams = () => {
    let query = { ...state };
    let num = state.PriceRange;
    let str;
    if (num == 0) {
        str = '0,N';
    } else {
        const index = cate5List.find((item) => {
            return item.value == num;
        });
        let text = index.label;
        str = text.replace('-', ',');
    }
    query.PriceRange = str;
    emits('changeFormState', query);
};
watch(
    () => route.query,
    (newValue, oldValue) => {
        state.Lid = route.query.Id;
        state.Stype = route.query.SType;
        state.KeyWd = route.query.KeyWd;
        state.Cate1 = route.query.Cate1 || 1;
    },
    { immediate: true, deep: true }
);

onMounted(() => {
    // changeParams();
});
//展开的项
const activeKey = ref(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']);

//自定义字段
const fieldNames = {
    children: 'Children',
    title: 'Value',
    key: 'Key'
};
//选择的状态 经脉中 预展中
const statusList = ref(['1', '2']);
//发生变化
const showStatusList = (value) => {
    state.AuctionStatuses = value.join(',');
};
//选择的状态 经脉中 预展中
const priceList = ref(['1', '2']);
const showPriceList = (value) => {
    state.AuctionBrands = value.join(',');
};
//选中了树形勾选
const selectTree = ref([]);
//树形集合分类 树形勾选框
const showCheckedList = (value, options) => {
    console.log(options);
    if (options.checkedNodes.length < 1) {
        state.CategoryIds = '';
        //因为这个本身默认就是空的 我在获取到这个树后 将他们的每一项都添加到数组里 但是只有它有值我才传递
        //本身是空的 所有需要我手动触发
        changeParams();
    } else {
        let arr = options.checkedNodes.map((item) => {
            return item.Key;
        });
        state.CategoryIds = arr.join(',');
    }
};
//品级
const gradesList = ref(['1']);
const showPriceLists = (value) => {
    state.Grades = value.join(',');
};
//选择的时间
const startTime = ref('');
const endTime = ref('');
const changeStart = (value) => {
    state.DateStart = value;
};
const changeEnd = (value) => {
    state.DateEnd = value;
};
//数据变化发起请求
watch(
    state,
    () => {
        if (!state.Stype && !route.query.KeyWd) {
            return;
        }
        changeParams();
        //  selectTree.value && selectTree.value.length >= 1
        //         ? (state.CategoryIds = selectTree.value.join(','))
        //         : (state.CategoryIds = '');
    },
    { immediate: true, deep: true }
);
//监听传过来的数据 给tree都勾选上
watch(
    props,
    (newValue) => {
        // if (newValue.BidderType == props.BidderType) {
        //     console.log('一样的');
        //     return;
        // }
        if (selectTree.value.length) {
            return;
        }
        const cate = props.BidderType.map((item) => item.Key);
        const cateChildrenKeys = props.BidderType.flatMap((item) => {
            if (Array.isArray(item.Children)) {
                return item.Children.filter((child) => child && child.Key).map(
                    (child) => child.Key
                );
            }
            return [];
        });
        selectTree.value = cate.concat(cateChildrenKeys);
        // selectValue.value = selectTree.value.join(',');
    },
    { deep: true }
);
</script>

<template>
    <div class="left-menu">
        <div class="top-cate">
            <a-checkbox-group
                v-model:value="statusList"
                name="checkboxddddddgros234ssfffup"
                :options="cateList"
                @change="showStatusList"
            />
        </div>
        <div class="top-cate">
            <a-checkbox-group
                v-model:value="priceList"
                name="checkboxdd322323ddddgros234ssfffup"
                :options="cateList1"
                @change="showPriceList"
            />
        </div>
        <a-collapse v-model:activeKey="activeKey">
            <a-collapse-panel key="1" header="分类" v-if="props?.BidderType.length">
                <a-tree
                    v-if="props.BidderType.length"
                    checkable
                    defaultExpandAll
                    v-model:selectedKeys="selectTree"
                    v-model:checkedKeys="selectTree"
                    @check="showCheckedList"
                    :tree-data="props?.BidderType"
                    :field-names="fieldNames"
                >
                </a-tree>
            </a-collapse-panel>
            <a-collapse-panel key="2" header="品级">
                <a-checkbox-group
                    v-model:value="gradesList"
                    name="checkboxgroufsfsssp"
                    :options="cate2List"
                    @change="showPriceLists"
                />
            </a-collapse-panel>
            <a-collapse-panel key="3" header="排序">
                <a-radio-group v-model:value="state.Sort" name="weism" :options="cate3List" />
            </a-collapse-panel>
            <a-collapse-panel key="5" header="时间">
                <div class="times">
                    <a-date-picker
                        value-format="YYYY-MM-DD"
                        placeholder="开始时间"
                        id="kaishi"
                        @change="changeStart"
                        v-model:value="startTime"
                        style="width: 100%"
                    />
                    <a-date-picker
                        value-format="YYYY-MM-DD"
                        placeholder="结束时间"
                        id="jieshu"
                        @change="changeEnd"
                        v-model:value="endTime"
                        style="width: 100%"
                    />
                    <a-button type="primary">搜索</a-button>
                </div>
            </a-collapse-panel>
            <a-collapse-panel key="6" header="结标">
                <a-radio-group
                    v-model:value="state.TimeRange"
                    name="zhinengxuanyige"
                    :options="cate4List"
                />
            </a-collapse-panel>
            <a-collapse-panel key="7" header="价格">
                <a-select
                    v-model:value="state.PriceRange"
                    style="width: 100%"
                    :options="cate5List"
                ></a-select>
            </a-collapse-panel>
            <!-- <a-collapse-panel key="8" header="显示">
                <a-radio-group
                    v-model:value="state.value9"
                    name="zhinlmlmkmfmmfengxuanyige"
                    :options="cate6List"
                />
            </a-collapse-panel> -->
            <a-collapse-panel key="9" header="评级公司" v-if="props?.RatingCompanyType.length">
                <a-radio-group v-model:value="state.value10" name="radioGroup">
                    <a-radio
                        :value="item.Value"
                        v-for="(item, index) in props.RatingCompanyType"
                        :key="item.Key"
                    >
                        {{ item.Value }}
                    </a-radio>
                </a-radio-group>
            </a-collapse-panel>
            <!-- <a-collapse-panel key="7" header="分数">
                <a-select
                    v-model:value="state.value11"
                    style="width: 100%"
                    :options="cate8List"
                ></a-select>
            </a-collapse-panel> -->
        </a-collapse>
    </div>
</template>

<style scoped lang="less">
.left-menu {
    width: 260px;
    .top-cate {
        background-color: #f4f4f4;
        padding: 20px;
        margin-bottom: 30px;
        .ant-checkbox-group {
            row-gap: 20px;
        }
    }
    :deep(.ant-checkbox-group) {
        width: 100%;
        justify-content: space-between;
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
