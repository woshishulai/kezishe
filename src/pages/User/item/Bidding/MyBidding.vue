<script setup>
import { ref, computed, reactive, onMounted, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { SearchOutlined } from '@ant-design/icons-vue';
import { timeOptions, statusOptions, jingMaiColumns, pingTai } from '../../data.js';
import {
    getJingMaiApi,
    getYiDeBiaoApi,
    getWeiDeBiaoApi,
    getWeiZhiFuApi,
    getBuZhiFuApi,
    sumbitOrder
} from '@/request/jingmai';
import QuJian from './QuJian.vue';
import Item from './Item.vue';
import Item2 from './Item2.vue';
import Item3 from './Item3.vue';
import Item4 from './Item4.vue';
import { info } from '@/hooks/antd/message';
import { watch } from 'vue';
const route = useRoute();
const jingMaiList = ref([
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
        cate: '未支付',
        num: ''
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
]);
const router = useRouter();
const showModals = ref(null);
const props = defineProps({});
const showPaegs = localStorage.getItem('showPaegs');
const showComponent = ref(1);
showPaegs ? (showComponent.value = showPaegs) : (showComponent.value = 1);
const AllTotal = ref(0);
const changeShowPage = async (index, query) => {
    if (query) {
        try {
            let res = await sumbitOrder(query);
            if (res.Tag && !res.Tag == 1) {
                return;
            } else {
                localStorage.setItem('orderId', res.Data.OrderNo);
                AllTotal.value = res.Data.AllTotal;
                localStorage.removeItem('checkedStatus');
                localStorage.removeItem('kuaidis');
                localStorage.removeItem('zhifus');
                localStorage.removeItem('baojias');
                localStorage.removeItem('iptValues');
                localStorage.removeItem('goodsList');
                localStorage.removeItem('quans');
                localStorage.removeItem('quanLists');
                localStorage.removeItem('DelLists');
                showComponent.value = index;
                if (showModals.value?.params?.titleCate) {
                    Object.keys(params.value).forEach((item) => {
                        params.value[item] = '';
                    });
                    params.value.total = 1;
                    fetchData.value = [];
                    checkList.value.DelList = [];
                    getFetchData(1, 10);
                }
            }
        } catch (error) {
            info('error', '请求错误');
        }
        return;
    }
    showComponent.value = index;
    localStorage.setItem('showPaegs', index);
};
const params = ref({
    Title: '',
    Status: '',
    Times: '',
    PageIndex: '',
    PageSize: '',
    total: 1
});
const apiList = {
    竞买中: getJingMaiApi,
    已得标: getYiDeBiaoApi,
    未得标: getWeiDeBiaoApi,
    未支付: getWeiZhiFuApi,
    不支付: getBuZhiFuApi
};
const fetchData = ref(null);
const getFetchData = async (page = 1, pageSize = 10) => {
    params.value.PageIndex = page;
    params.value.PageSize = pageSize;
    try {
        let res = await apiList[showModals.value?.params?.titleCate](params.value); // 调用函数来获取数据
        if (res.Tag != 1) {
            return;
        }
        params.total = res.Total;
        let index = jingMaiList.value.findIndex((item) => {
            return item.cate == showModals.value?.params?.titleCate;
        });
        jingMaiList.value.forEach((item) => {
            item.num = '';
        });
        jingMaiList.value[index].num = res.Data.length;
        if (index == 3) {
            jingMaiList.value[index].showText = '预约';
        }
        fetchData.value = res.Data;
    } catch (error) {
        info('error', error);
    }
};

watch(
    () => showModals.value?.params?.titleCate,
    () => {
        if (showModals.value?.params?.titleCate == '未发货') {
            router.push('/user/logistics/');
        } else if (showModals.value?.params?.titleCate == '已发货') {
            router.push('/user/logistics/yifahuo');
            return;
        } else if (showModals.value?.params?.titleCate) {
            router.push({
                path: '/user/my-bidding',
                query: {
                    titleCate: showModals.value?.params?.titleCate
                }
            });
            Object.keys(params.value).forEach((item) => {
                params.value[item] = '';
            });
            params.value.total = 1;
            fetchData.value = [];
            checkList.value.DelList = [];
            getFetchData(1, 10);
        }
    }
);
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
    if (checkList.value.DelList.length == fetchData.value.length) {
        all.value = true;
    } else {
        all.value = false;
    }
};
function getChecked(Bn) {
    const item = checkList.value.DelList.find((item) => item.Bn === Bn);
    return item !== undefined;
}
//全选
const all = ref(false);
const getAll = () => {
    if (!all.value) {
        checkList.value.DelList = fetchData.value.map((item) => {
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
//支付
const zhiFu = () => {
    if (checkList.value.DelList.length < 1) {
        info('warning', '请先选择要支付的订单吧');
        return;
    }
    localStorage.setItem('checkedStatus', 0);
    localStorage.setItem('kuaidis', 0);
    localStorage.setItem('zhifus', 0);
    localStorage.setItem('baojias', true);
    localStorage.setItem('iptValues', '');
    localStorage.setItem('quanLists', '');
    localStorage.setItem('DelLists', []);
    localStorage.removeItem('allPrice');
    localStorage.removeItem('orderId');
    localStorage.setItem('showPaegs', 2);
    const goodsList = JSON.stringify(checkList.value.DelList);
    localStorage.setItem('goodsList', goodsList);
    router.push({
        path: '/user/my-bidding',
        query: {
            titleCate: showModals.value?.params?.titleCate,
            show: 2,
            goodsList: checkList.value?.DelList
        }
    });
};
</script>

<template>
    <Item
        :fetchData="checkList?.DelList"
        @changeShowPage="changeShowPage"
        v-show="route.query.show == 2"
    ></Item>
    <div class="my-bidding" v-show="showComponent == 1">
        <div class="card-box">
            <div class="title"> 我的竞买 </div>
            <show-modal ref="showModals" :titleList="jingMaiList">
                <template v-slot:active2>
                    <div class="search-cate">
                        <a-select
                            ref="select"
                            placeholder="所有时间"
                            class="item"
                            v-model:value="params.Times"
                            :options="timeOptions"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="全部状态"
                            class="item"
                            v-model:value="params.Status"
                            :options="statusOptions"
                            :disabled="showModals?.params?.titleCate != '竞买中'"
                        ></a-select>
                        <a-select
                            ref="select"
                            placeholder="全部平台"
                            class="item"
                            :options="pingTai"
                        ></a-select>
                        <a-input
                            @keydown.enter="getFetchData(1, 10)"
                            v-model:value="params.Title"
                            class="item-input"
                            placeholder="名称和藏品"
                        />
                        <a-button :icon="h(SearchOutlined)" @click="getFetchData(1, 10)"
                            >搜索</a-button
                        >
                    </div>
                </template>
                <!-- 快递取件码 -->
                <!-- <template v-slot:active3>
                    <QuJian v-show="showModals?.params?.titleCate == '未支付'"></QuJian>
                </template> -->
                <template v-slot:active4>
                    <a-table :pagination="false" :columns="jingMaiColumns" :dataSource="fetchData">
                        <template #bodyCell="{ column, record }">
                            <template
                                v-if="
                                    showModals?.params?.titleCate == '未支付' && column.key == 'Bn'
                                "
                            >
                                <div class="title-item">
                                    <a-checkbox
                                        @change.stop="showCheck(record)"
                                        style="margin-right: 15px"
                                        :checked="getChecked(record.Bn)"
                                    ></a-checkbox>
                                    <p> {{ record.Bn }}</p>
                                </div>
                            </template>

                            <template v-if="column.key === 'Brand'">
                                {{ record.Brand == 1 ? '竞买' : record.Brand == 2 ? '一口价' : '' }}
                            </template>
                            <template v-if="column.key === 'Title'">
                                <div class="goods-info" @click="showGoodsDetails(record)">
                                    <img :src="record.CoverImg" alt="" />
                                    <a-tooltip>
                                        <template #title> {{ record.Title }} </template>
                                        <span>
                                            {{ record.Title }}
                                        </span>
                                    </a-tooltip>
                                </div>
                            </template>
                            <template v-if="column.key === 'Status'">
                                {{
                                    record.Status == 1
                                        ? '领先'
                                        : record.Status == 2
                                          ? '代理'
                                          : record.Status == 3
                                            ? '出局'
                                            : ''
                                }}
                            </template>
                            <template v-if="column.key === 'MPrice'">
                                <span class="active"
                                    >￥{{ record.MakePrice || record.MPrice }}元</span
                                >
                            </template>
                        </template>
                    </a-table>
                    <div class="footer" v-if="showModals?.params?.titleCate == '未支付'">
                        <a-checkbox
                            @change="getAll()"
                            style="margin-right: 15px"
                            :checked="all"
                        ></a-checkbox>
                        <span class="all">全选</span>
                        <a-button @click="zhiFu" type="primary"> 去支付 </a-button>
                    </div>
                </template>
            </show-modal>
            <a-button
                v-if="showModals?.params?.titleCate != '未支付'"
                @click="router.push('/jingmai')"
                type="primary"
                style="margin-top: 30px"
            >
                抢购
            </a-button>
            <CatePage :paginations="params" @fetchList="getFetchData"></CatePage>
        </div>
    </div>
    <Item2 @changeShowPage="changeShowPage" v-show="showComponent == 3"></Item2>
    <Item3 @changeShowPage="changeShowPage" v-show="showComponent == 4"></Item3>
    <!-- //余额支付的 -->
    <Item4 @changeShowPage="changeShowPage" :AllTotal="AllTotal" v-if="showComponent == 5"></Item4>
</template>

<style scoped lang="less">
.my-bidding {
    :deep(.ant-table-wrapper) {
        .ant-table-thead > tr > th {
            background-color: #eef3f8;
        }
        .active {
            color: #a11111;
        }
        .details {
            cursor: pointer;
            &:hover {
                color: #a11111;
            }
        }
    }
    .card-box {
        .table-item-gooods-info {
            .flex-row;
            gap: 10px;

            img {
                width: 50px;
            }
        }
        .active {
            color: #9a0000;
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
        :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
            background-color: #fff;
            font-size: 16px;
            font-weight: 400;
        }
        .title-item {
            display: flex;
        }
        .ant-btn {
            width: 120px;
            border-radius: 6px;
        }
        .footer {
            display: flex;
            align-items: center;
            gap: 20px;
            padding: 10px 16px;
            font-size: 16px;
            color: #333333;
        }
    }
}
</style>
