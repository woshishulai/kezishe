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
        cate: '预展',
        num: '7'
    },
    {
        cate: '竞买'
    },
    {
        cate: '成交',
        num: '1294'
    },
    {
        cate: '下架',
        num: '4'
    },
    {
        cate: '未成交',
        num: '8'
    },
    {
        cate: '购物',
        num: ''
    }
];
const query = ref('预展');
const handClick = (item) => {
    query.value = item.cate;
};
const columns = [
    {
        title: '藏品编号',
        dataIndex: 'code',
        key: 'code',
        align: 'center'
    },
    {
        title: '藏品名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
    },
    {
        title: '藏品图片',
        dataIndex: 'zhaopian',
        key: 'zhaopian',
        align: 'center'
    },
    {
        title: '商家',
        dataIndex: 'laoban',
        key: 'laoban',
        align: 'center'
    },
    {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        align: 'center'
    },
    {
        title: '价格',
        dataIndex: 'price',
        align: 'center',
        key: 'price'
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
        name: '清朝瓷器',
        laoban: '壳子社',
        time: '2023.10.02',
        price: '1.00',
        zhaopian: 'register/logo.png',
        caozuo: i % 2 == 0 ? '取消关注' : '关注'
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
// const changeGuanZhu = (item) => {
//   const index = data.findIndex(d => d.key === item.key);
//   if (index !== -1) {
//     data[index].caozuo = data[index].caozuo === '取消关注' ? '关注' : '取消关注';
//     console.log(data[index].key, data);
//   }
// }
</script>

<template>
    <div class="my-following">
        <div class="card-box">
            <div class="title"> 我的关注 </div>
            <show-modal :titleList="list">
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
                                <div class="btns" @click="changeGuanZhu(record)">
                                    {{ record.caozuo == '取消关注' ? '取消关注' : '关注' }}
                                </div>
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
                            选择
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
        .table-item-gooods-info {
            img {
                width: 50px;
            }
        }

        .btns {
            cursor: pointer;
            padding: 10px 0;
            border-radius: 6px;
            background-color: #eef3f8;
        }
    }
}
</style>
