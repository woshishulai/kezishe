<script setup>
import { ref, computed, reactive, onMounted, h } from 'vue';
import { SearchOutlined } from '@ant-design/icons-vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import ShowModal from '@/components/common/user/ShowModal.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const columns = [
    {
        title: '藏品编号',
        dataIndex: 'code',
        key: 'code',
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
        title: '类型',
        dataIndex: 'cate',
        key: 'cate',
        align: 'center'
    },
    {
        title: '成交日期',
        dataIndex: 'time',
        key: 'time',
        align: 'center'
    },
    {
        title: '成交价/价值',
        dataIndex: 'chengjiao',
        key: 'chengjiao',
        align: 'center'
    },
    {
        title: '仓储期',
        dataIndex: 'cangchuqi',
        key: 'cangchuqi',
        align: 'center'
    },
    {
        title: '仓储费',
        dataIndex: 'price',
        align: 'center',
        key: 'price'
    },
    {
        title: '收藏证书',
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
        name: '清朝瓷器',
        cate: '竞买',
        chengjiao: '3,960.00元',
        cangchuqi: '剩余114天(免费)',
        laoban: '壳子社',
        time: '2023.10.02',
        price: '1.00',
        zhaopian: 'register/logo.png',
        caozuo: '无'
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
const value1 = ref('cate1');
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
    <div class="my-logistics">
        <div class="card-box">
            <div class="title">未发货</div>
            <show-modal>
                <template v-slot:active1>
                    <div class="search-cate">
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
                        </template>
                    </a-table>
                    <div class="add-array">
                        <div>
                            <span>
                                <template v-if="hasSelected">
                                    {{
                                        `总计 ${data.length} 项 已选 ${state.selectedRowKeys.length} 项`
                                    }}
                                </template>
                            </span>
                        </div>
                        <span>
                            <template v-if="hasSelected">
                                {{
                                    `未发货总数 ${data.length} 项 已选 ${state.selectedRowKeys.length} 项`
                                }}
                            </template>
                        </span>
                    </div>
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
                            已选发货
                        </a-button>
                        <a-button
                            type="primary"
                            :disabled="!hasSelected"
                            :loading="state.loading"
                            @click="start"
                        >
                            一键专卖
                        </a-button>
                    </div>
                    <p class="label"
                        >藏品暂不开放支付后退货退款流程。如有退货，请收货后联系客服021-23099900</p
                    >
                    <p class="label"
                        >收藏证书不可委托，包含收藏证书的藏品一键转卖后，证书费用将退还您的账户的余额中</p
                    >
                </template>
            </show-modal>
        </div>
    </div>
</template>

<style scoped lang="less">
.my-logistics {
    .card-box {
        padding-bottom: 30px;

        .table-item-gooods-info {
            .flex-row;
            gap: 10px;

            img {
                width: 50px;
            }
        }

        .add-array {
            padding: 20px 40px 0 0;
            .flex-row;
            gap: 30px;
            justify-content: flex-start;
        }

        .label {
            font-weight: 500;
            margin: 20px 0 0;
            color: #9a0000;
        }
    }
}
</style>
