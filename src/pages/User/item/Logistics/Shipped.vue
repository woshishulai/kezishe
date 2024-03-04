<script setup>
import { ref, computed, reactive, onMounted, h, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SearchOutlined } from '@ant-design/icons-vue';
import { getImageUrl } from '@/utils';
import CatePage from '@/components/common/CatePage.vue';
import { dataSource } from '../SettlementDetails/data';
import ShippedDetails from './ShippedDetails.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const showModals = ref();
const params = ref();
watchEffect(() => {
    params.value = showModals.value?.params;
    console.log(params.value?.titleCate);
});
const list = [
    {
        cate: '已发货'
    },
    {
        cate: '仓储费'
    }
];
const columns = [
    {
        title: '藏品编号',
        dataIndex: 'code',
        key: 'code',
        align: 'center'
    },
    {
        title: '类型',
        key: 'cate',
        dataIndex: 'cate',
        align: 'center'
    },
    {
        title: '藏品图片',
        dataIndex: 'zhaopian',
        key: 'zhaopian',
        align: 'center'
    },
    {
        title: '藏品名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
    },
    {
        title: '数量',
        key: 'num',
        dataIndex: 'num',
        align: 'center'
    },
    {
        title: '商家',
        dataIndex: 'laoban',
        key: 'laoban',
        align: 'center'
    },
    {
        title: '成交价',
        dataIndex: 'chengjiao',
        key: 'chengjiao',
        align: 'center'
    },
    {
        title: '结标时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center'
    },
    {
        title: '发货期限',
        dataIndex: 'qixian',
        key: 'qixian',
        align: 'center'
    },
    {
        title: '包含收藏证书',
        dataIndex: 'zhengshu',
        key: 'zhengshu',
        align: 'center'
    },
    {
        title: '操作',
        dataIndex: 'caozuo',
        align: 'center',
        key: 'caozuo'
    }
];
const data = reactive([]);
for (let i = 0; i < 10; i++) {
    data.push({
        key: i,
        code: '63932729',
        cate: '竞买',
        num: '1',
        name: '清朝瓷器',
        chengjiao: '112.00元',
        laoban: '壳子社',
        time: '2023.10.02',
        zhaopian: 'register/logo.png',
        qixian: '',
        zhengshu: '否',
        caozuo: '查看详情'
    });
}
const cangChuColumns = [
    {
        title: '藏品编号',
        key: 'goodsCode',
        dataIndex: 'goodsCode',
        align: 'center'
    },
    {
        title: '藏品图片',
        dataIndex: 'zhaopian',
        key: 'zhaopian',
        align: 'center'
    },
    {
        title: '名称',
        key: 'name',
        dataIndex: 'name',
        align: 'center'
    },
    {
        title: '结标时间',
        key: 'time',
        dataIndex: 'time',
        align: 'center'
    },
    {
        title: '收费仓储期',
        key: 'details',
        dataIndex: 'details',
        align: 'center'
    },
    {
        title: '仓储费率',
        key: 'feilv',
        dataIndex: 'feilv',
        align: 'center'
    },
    {
        title: '已收仓储费',
        key: 'yishou',
        dataIndex: 'yishou',
        align: 'center'
    },
    {
        title: '待收仓储费',
        key: 'daishou',
        dataIndex: 'daishou',
        align: 'center'
    },
    {
        title: '仓储费总额',
        key: 'zonge',
        dataIndex: 'zonge',
        align: 'center'
    }
];
const cangChuDataSource = [
    {
        goodsCode: '4873883',
        name: '文2公报带直角边新',
        time: '2023-09-23 20:30:40',
        details: '5天',
        feilv: '0.2元/天',
        yishou: '1.00',
        daishou: '0.00',
        zonge: '1.00',
        zhaopian: 'register/logo.png'
    }
];
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
const loading = ref(false);
const value = ref('');
const value1 = ref();
const showDetails = ref(true);
const changeShowDeatails = () => {
    showDetails.value = false;
};
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const getGoodsList = () => {
    loading.value = true;
};
const changeGuanZhu = (item) => {
    console.log(item.key);
    data[item.key].caozuo = data[item.key].caozuo == '取消关注' ? '关注' : '取消关注';
    console.log(data[item.key], data);
};
</script>
<template>
    <div class="my-bidding">
        <div class="card-box" v-if="showDetails">
            <div class="title"> 已发货 </div>
            <show-modal ref="showModals" :titleList="list">
                <template v-slot:active2>
                    <div class="search-cate" v-if="params?.titleCate == list[0].cate">
                        <a-select
                            ref="select"
                            placeholder="所有分类"
                            v-model:value="value1"
                            class="item"
                            :options="options1"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="所有时间"
                            v-model:value="value1"
                            class="item"
                            :options="options1"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="所有类别"
                            v-model:value="value1"
                            class="item"
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
                    <a-table
                        :pagination="false"
                        :columns="params?.titleCate == list[0].cate ? columns : cangChuColumns"
                        :data-source="params?.titleCate == list[0].cate ? data : cangChuDataSource"
                    >
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'zhaopian'">
                                <div class="table-item-gooods-info">
                                    <img :src="getImageUrl(record.zhaopian)" alt="" />
                                </div>
                            </template>
                            <template v-if="column.key === 'caozuo'">
                                <div class="btns" @click="changeShowDeatails"> 查看详情 </div>
                            </template>
                        </template>
                    </a-table>
                    <div class="leng-details">
                        <span></span>
                        <span>总计： {{ 256 }}项</span>
                    </div>
                </template>
            </show-modal>
            <CatePage></CatePage>
        </div>
        <ShippedDetails v-else></ShippedDetails>
    </div>
</template>

<style scoped lang="less">
.my-bidding {
    .table-item-gooods-info {
        img {
            width: 50px;
        }
    }

    .btns {
        color: #7dadef;
    }

    .leng-details {
        .flex-row;
        justify-content: space-between;
        padding: 20px;
    }
}
</style>
