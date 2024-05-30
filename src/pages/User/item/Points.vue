<script setup>
import { ref, computed, reactive, onMounted, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SearchOutlined } from '@ant-design/icons-vue';
import { jifenParams, getjiFenInfo } from '@/request/user/api';
import CatePage from '@/components/common/CatePage.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const params = ref([]);
const tableList = ref([]);
const timeStartOptionss = [
    {
        value: '0',
        label: '全部'
    },
    {
        value: '1',
        label: '近一年'
    },
    {
        value: '2',
        label: '近三年'
    },
    {
        value: '3',
        label: '近三月'
    },
    {
        value: '4',
        label: '近一月'
    },
    {
        value: '5',
        label: '近一周'
    }
];
const query = reactive({
    TimeRange: '0',
    PointFunType: '0',
    PointMold: '0',
    total: 1
});
const getParams = async () => {
    let res = await jifenParams();
    console.log(res);
    params.value = res.Data;
    params.value.PointFunType.forEach((item) => {
        item.value = item.Key;
        item.label = item.Value;
    });
    params.value.PointMold.forEach((item) => {
        item.value = item.Key;
        item.label = item.Value;
    });
};
const fetchTableList = async (page = 1, pageSize = 10) => {
    query.PageIndex = page;
    query.PageSize = pageSize;
    let res = await getjiFenInfo(query);
    console.log(res);
    tableList.value = res.Data;
    query.total = res.Total;
};
onMounted(() => {
    Promise.all([getParams(), fetchTableList()]);
});
const list = [
    {
        cate: '积分明细'
    },
    {
        cate: '积分规则'
    }
];
const columns = [
    {
        title: '类型',
        dataIndex: 'MoldDes',
        key: 'MoldDes',
        align: 'center'
    },
    {
        title: '全部事件',
        dataIndex: 'FunTypeDes',
        key: 'FunTypeDes',
        align: 'center'
    },
    {
        title: '积分',
        dataIndex: 'Point',
        key: 'Point',
        align: 'center'
    },
    {
        title: '时间',
        dataIndex: 'Time',
        key: 'Time',
        align: 'center'
    },
    {
        title: '说明',
        dataIndex: 'Remark',
        key: 'Remark',
        align: 'center'
    }
];
</script>

<template>
    <div class="points">
        <div class="card-box">
            <div class="title"> 积分 </div>
            <div class="con-wrap">
                <!-- <div class="jifen-wrap">
                    <h5>{{}}</h5>
                </div> -->
                <show-modal :titleList="list">
                    <template v-slot:active2>
                        <div class="search-cate">
                            <a-select
                                ref="select"
                                placeholder="全部类型"
                                v-model:value="query.PointMold"
                                style="width: 220px"
                                :options="params.PointMold"
                            ></a-select>
                            <a-select
                                ref="select"
                                placeholder="全部事件"
                                v-model:value="query.PointFunType"
                                style="width: 220px"
                                :options="params.PointFunType"
                            ></a-select>
                            <a-select
                                ref="select"
                                placeholder="近一年"
                                v-model:value="query.TimeRange"
                                style="width: 220px"
                                :options="timeStartOptionss"
                            ></a-select>
                            <a-button @click="fetchTableList()" :icon="h(SearchOutlined)"
                                >搜索</a-button
                            >
                        </div>
                    </template>
                    <template v-slot:active3>
                        <a-table
                            :pagination="false"
                            :columns="columns"
                            :dataSource="tableList"
                        ></a-table>
                    </template>
                </show-modal>
                <CatePage :paginations="query" @fetchList="fetchTableList"></CatePage>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.points {
    width: 100%;

    .con-wrap {
        padding: 20px 12px;

        // .jifen-wrap {
        //     padding: 55px 0 100px 120px;
        //     margin-bottom: 20px;
        //     background: url('@/assets/img/user/jifen/jifen-bg.png');
        //     background-size: 100% 100%;

        //     h5 {
        //         color: #fff;
        //         font-size: 40px;
        //         height: 40px;
        //     }
        // }
    }
}
</style>
