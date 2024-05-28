<script setup>
import { ref, computed, reactive, onMounted, h, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getCartList } from '@/request/user/api';
import { savaGoodsApi } from '@/request/jingmai';
import { SearchOutlined } from '@ant-design/icons-vue';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const tableList = ref([]);
const showModals = ref(null);
const options1 = ref([]);
const list = ref([]);
const query = reactive({
    Cid: '',
    Kw: '',
    Status: '',
    PageSize: '',
    PageIndex: '',
    total: 1
});
const getTableList = async (page = 1, pageSize = 10) => {
    query.PageIndex = page;
    query.PageSize = pageSize;
    try {
        let res = await getCartList(query);
        if (res.Tag == 1) {
            tableList.value = res.Data.GoodsList;
            options1.value = res.Data.BidderType;
            options1.value.unshift({
                Value: '全部',
                Key: ''
            });
            let arr = res.Data.GoodsStatusList;
            let newArr = arr.map((item) => {
                let query = {
                    num: item.Count,
                    cate: item.Value,
                    id: item.Key
                };
                return query;
            });
            if (JSON.stringify(list.value) !== JSON.stringify(newArr)) {
                list.value = newArr;
            }
            query.total = res.Total;
        }
    } catch (error) {}
};
onMounted(async () => {
    getTableList();
});

watch(
    () => showModals.value?.params?.titleCate,
    () => {
        const items = list.value.find((item) => item.cate == showModals.value?.params?.titleCate);
        if (items.id) {
            query.Status = items.id;
            query.total = 1;
            tableList.value = [];
            getTableList(1, 10);
        }
    }
);

const columns = [
    {
        title: '藏品编号',
        dataIndex: 'Bn',
        key: 'Bn',
        align: 'center',
        width: 200
    },
    {
        title: '藏品名称',
        dataIndex: 'Title',
        key: 'Title',
        align: 'center',
        width: 300,
        ellipsis: true
    },
    {
        title: '时间',
        dataIndex: 'OnTime',
        key: 'OnTime',
        width: 250,
        align: 'center'
    },
    {
        title: '价格',
        dataIndex: 'MPrice',
        align: 'center',
        key: 'MPrice'
    },
    {
        title: '未知状态',
        dataIndex: 'Status',
        align: 'center',
        key: 'Status'
    },
    {
        title: '操作',
        dataIndex: 'caozuo',
        align: 'center',
        key: 'caozuo',
        width: 120
    }
];

const showGoodsDetails = (i) => {
    router.push({
        path: '/jingmai/goods-details',
        query: {
            id: i.Gid
        }
    });
};
const checkList = ref({
    DelList: []
});
//勾选框
const showCheck = (e) => {
    if (getChecked(e.Bn)) {
        checkList.value.DelList = checkList.value.DelList.filter((item) => item.Bn !== e.Bn);
    } else {
        let query = {
            Bn: e.Bn
        };
        if (showModals.value?.params?.titleCate == '未支付') {
            checkList.value.DelList.push(e);
        } else {
            checkList.value.DelList.push(query);
        }
    }
    if (checkList.value.DelList.length == tableList.value.length) {
        all.value = true;
    } else {
        all.value = false;
    }
};
function getChecked(Bn) {
    const item = checkList.value.DelList.find((item) => item.Bn === Bn);
    return item !== undefined;
}
const changeGuanZhu = async (Gid) => {
    const query = {
        Types: 1,
        Gid: Gid
    };
    try {
        let res = await savaGoodsApi(query);
        console.log(res);
        if (res.Tag == 1) {
            let index = tableList.value.findIndex((item) => item.Gid == Gid);
            tableList.value.splice(index, 1);
            info('success', res.Message);
        }
        console.log(res);
    } catch (error) {}
};
//全选
const all = ref(false);
const getAll = () => {
    if (!all.value) {
        checkList.value.DelList = tableList.value.map((item) => {
            let query = {
                Bn: item.Bn
            };
            if (showModals.value?.params?.titleCate == '未支付') {
                return item;
            } else {
                return query;
            }
        });
        all.value = true;
        return;
    } else {
        checkList.value.DelList = [];
        all.value = false;
        return;
    }
};
</script>

<template>
    <div class="my-following">
        <div class="card-box">
            <div class="title"> 我的关注 </div>
            <show-modal :title-list="list" ref="showModals">
                <template v-slot:active1>
                    <div class="search-cate">
                        <a-select
                            ref="select"
                            placeholder="所有分类"
                            v-model:value="query.Cid"
                            style="width: 220px"
                            :field-names="{ label: 'Value', value: 'Key', options: 'children' }"
                            :options="options1"
                        ></a-select>
                        <a-input
                            v-model:value="query.Kw"
                            style="width: 316px"
                            placeholder="名称和藏品"
                        />
                        <a-button @click="getTableList()" :icon="h(SearchOutlined)">搜索</a-button>
                    </div>
                </template>
                <template v-slot:active3>
                    <a-table :pagination="false" :columns="columns" :data-source="tableList">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key == 'Bn'">
                                <div class="title-item">
                                    <a-checkbox
                                        @change.stop="showCheck(record.Bn)"
                                        style="margin-right: 15px"
                                        :checked="getChecked(record.Bn)"
                                    ></a-checkbox>
                                    <p> {{ record.Bn }}</p>
                                </div>
                            </template>
                            <template v-if="column.key === 'Title'">
                                <div class="goods-info" @click="showGoodsDetails(record)">
                                    <img :src="record.CoverImg" alt="" />
                                    <a-tooltip>
                                        <template #title> {{ record.Title }} </template>
                                        <span style="width: 100px">
                                            {{ record.Title }}
                                        </span>
                                    </a-tooltip>
                                </div>
                            </template>
                            <template v-if="column.key === 'caozuo'">
                                <div class="btns" @click="changeGuanZhu(record.Gid)">
                                    取消关注
                                </div>
                            </template>
                        </template>
                    </a-table>
                    <div class="footer" v-show="tableList.length != 999">
                        <a-checkbox @change="getAll()" style="margin-right: 15px" :checked="all">
                            &nbsp; 全选 &nbsp;
                        </a-checkbox>
                        <span class="all hover">取消关注</span>
                        <span class="all">总计{{ tableList.length }} 项</span>
                        <span class="all">已选{{ checkList.DelList.length }}项</span>
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
    .footer {
        padding: 20px 20px;
        border-bottom: 1px solid #f0f0f0;
        font-size: 16px;
        .hover:hover {
            cursor: pointer;
            color: #9a0000;
        }
        .all {
            margin-right: 30px;
        }
    }
    :deep(.ant-checkbox .ant-checkbox-inner) {
        background-color: #eef3f8;
        border-radius: 4px;
    }
    :deep(.ant-checkbox-checked .ant-checkbox-inner) {
        background-color: #949ca6;
        border: none;
    }
    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        background-color: #fff;
    }
    :deep(.ant-table-wrapper .ant-table .ant-table-tbody > tr > td) {
        border-bottom: 1px dashed #d5dce4;
        border-top: none;
    }
    .title-item {
        display: flex;
    }
    .goods-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        gap: 3px;
        width: 100%;
        &:hover {
            color: #9a0000;
            cursor: pointer;
        }
        img {
            height: 40px;
        }
        span {
            flex: 1;
        }
    }
    .card-box {
        .table-item-gooods-info {
            img {
                width: 50px;
            }
        }

        .btns {
            width: 90px;
            height: 34px;
            font-size: 14px;
            border-radius: 6px;
            line-height: 34px;
            background-color: #eef3f8;
            cursor: pointer;
            border: 1px solid #d9e1e7;
            &:hover {
                color: #9a0000;
            }
        }
    }
}
</style>
