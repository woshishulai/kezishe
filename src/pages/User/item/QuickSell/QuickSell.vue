<script setup>
import { ref, computed, reactive, onMounted, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { SearchOutlined } from '@ant-design/icons-vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const query = ref('预展');
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
        dataIndex: 'num'
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
// const changeGuanZhu = (item) => {
//   const index = data.findIndex(d => d.key === item.key);
//   if (index !== -1) {
//     data[index].caozuo = data[index].caozuo === '取消关注' ? '关注' : '取消关注';
//     console.log(data[index].key, data);
//   }
// }
const showDetails = () => {
    router.push('/user/quick-sell/details');
    // router.push('/user/quick-sell/contract-details');
};
</script>

<template>
    <div class="my-following">
        <div class="card-box">
            <div class="title"> 一键转卖 </div>
            <show-modal>
                <template v-slot:active1>
                    <div class="search-cate">
                        <a-select
                            ref="select"
                            placeholder="所有分类"
                            v-model:value="value1"
                            style="width: 220px"
                            :options="options1"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="所有时间"
                            v-model:value="value1"
                            style="width: 220px"
                            :options="options1"
                            @change="handleChange"
                        ></a-select>
                        <a-input
                            v-model:value="value"
                            style="width: 316px"
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
                        :row-selection="{
                            selectedRowKeys: state.selectedRowKeys,
                            onChange: onSelectChange
                        }"
                        :columns="columns"
                        :data-source="data"
                    >
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'zhaopian'">
                                <div class="table-item-gooods-info">
                                    <img :src="getImageUrl(record.zhaopian)" alt="" />
                                </div>
                            </template>
                            <template v-if="column.key === 'caozuo'">
                                <div class="btns" @click="showDetails(record)"> 查看详情 </div>
                            </template>
                        </template>
                    </a-table>
                    <div class="add-array">
                        <a-button
                            type="primary"
                            :disabled="!hasSelected"
                            :loading="state.loading"
                            @click="start"
                        >
                            撤销所有已选
                        </a-button>
                        <a-button
                            type="primary"
                            :disabled="!hasSelected"
                            :loading="state.loading"
                            @click="start"
                        >
                            一键转卖
                        </a-button>
                        <span style="margin-left: 8px">
                            <template v-if="hasSelected">
                                {{
                                    `总计 ${data.length} 项 已选 ${state.selectedRowKeys.length} 项`
                                }}
                            </template>
                        </span>
                    </div>
                </template>
            </show-modal>
            <CatePage></CatePage>
        </div>
    </div>
</template>

<style scoped lang="less">
/* 在这里添加你的 Less 样式 */
.my-following {
    .card-box {
        padding: 0 20px 30px;
        .table-item-gooods-info {
            img {
                width: 50px;
            }
        }

        :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
            background-color: #eef3f8;
            font-size: 16px;
            font-weight: 400;
        }

        .btns {
            cursor: pointer;
            padding: 2px 0;
            color: #7dadef;
            border-bottom: 1px solid #7dadef;
        }

        .add-array {
            padding: 0px 16px 20px;
            .flex-row;
            gap: 30px;
            justify-content: flex-start;
        }
    }
}
</style>
