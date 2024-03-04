<script setup>
import { ref, computed, reactive, onMounted, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { SearchOutlined } from '@ant-design/icons-vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const list = [
    {
        cate: '竞买中'
    },
    {
        cate: '已得标'
    },
    {
        cate: '未得标'
    },
    {
        cate: '未支付'
    },
    {
        cate: '不支付'
    },
    {
        cate: '未发货'
    },
    {
        cate: '已发货'
    }
];
const columns = [
    {
        title: '商品编号',
        dataIndex: 'goodscode',
        key: 'goodscode',
        align: 'center'
    },
    {
        title: '类型',
        dataIndex: 'goodscate',
        key: 'goodscate',
        align: 'center'
    },
    {
        title: '商品名称',
        dataIndex: 'goodsname',
        key: 'goodsname',
        align: 'center'
    },
    {
        title: '平台',
        dataIndex: 'order',
        key: 'order',
        align: 'center'
    },
    {
        title: '当前价',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
    },
    {
        title: '状态',
        dataIndex: 'sub',
        key: 'sub',
        align: 'center'
    },
    {
        title: '结标时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center'
    }
];
const dataSource = [
    {
        goodscode: '630527010',
        goodscate: '竞买',
        goodsname: '好东西很不错',
        order: '壳子社',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '出局'
    },
    {
        goodscode: '630527010',
        goodscate: '竞买',
        goodsname: '好东西很不错',
        order: '壳子社',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '出局'
    },
    {
        goodscode: '630527010',
        goodscate: '竞买',

        goodsname: '好东西很不错',
        order: '壳子社',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '出局'
    },

    {
        goodscode: '630527010',
        goodscate: '竞买',

        goodsname: '好东西很不错',
        order: '壳子社',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '出局'
    }
];

const onSelectChange = (selectedRowKeys) => {
    state.selectedRowKeys = selectedRowKeys;
};
const options1 = ref([
    {
        value: 'cate1',
        label: '所有分类'
    },
    {
        value: 'lucy',
        label: 'Lucy'
    },
    {
        value: 'yiminghe',
        label: 'Yiminghe'
    }
]);
const state = reactive({
    selectedRowKeys: [],
    // Check here to configure the default column
    loading: false
});
const hasSelected = computed(() => state.selectedRowKeys.length > 0);
const start = () => {
    state.loading = true;
    // ajax request after empty completing
    setTimeout(() => {
        state.loading = false;
        state.selectedRowKeys = [];
    }, 1000);
};
const loading = ref(false);
const value = ref('');
const value1 = ref();
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const getGoodsList = () => {
    loading.value = true;
};
</script>

<template>
    <div class="my-bidding">
        <div class="card-box">
            <div class="title"> 我的竞买 </div>
            <show-modal :titleList="list">
                <template v-slot:active2>
                    <div class="search-cate">
                        <a-select
                            ref="select"
                            placeholder="所有时间"
                            class="item"
                            v-model:value="value1"
                            :options="options1"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="全部状态"
                            class="item"
                            v-model:value="value1"
                            :options="options1"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="全部平台"
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
                </template>
                <template v-slot:active3>
                    <a-table :pagination="false" :columns="columns" :dataSource="dataSource">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'goodsname'">
                                <div class="table-item-gooods-info">
                                    <img :src="getImageUrl('register/logo.png')" alt="" />
                                    <span>{{ record.goodsname }}</span>
                                </div>
                            </template>
                        </template>
                    </a-table>
                </template>
            </show-modal>
            <a-button style="width: 120px; border-radius: 6px; margin-left: 42px" type="primary">
                抢购
            </a-button>
            <CatePage></CatePage>
        </div>
    </div>
</template>

<style scoped lang="less">
.my-bidding {
    .card-box {
        .table-item-gooods-info {
            .flex-row;
            gap: 10px;

            img {
                width: 50px;
            }
        }

        :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
            background-color: #fff;
            font-size: 16px;
            font-weight: 400;
        }
    }
}
</style>
