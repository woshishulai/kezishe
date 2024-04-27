<script setup>
import { ref, computed, reactive, onMounted, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { SearchOutlined } from '@ant-design/icons-vue';
import { jingMaiList, timeOptions, statusOptions, jingMaiColumns, pingTai } from '../../data.js';
import {
    getJingMaiApi,
    getYiDeBiaoApi,
    getWeiDeBiaoApi,
    getWeiZhiFuApi,
    getBuZhiFuApi
} from '@/request/jingmai';
import { info } from '@/hooks/antd/message';
import { watch } from 'vue';
const router = useRouter();
const route = useRoute();
const showModals = ref(null);
const props = defineProps({});
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
const getFetchData = async (page, pageSize) => {
    params.value.PageIndex = page;
    params.value.PageSize = pageSize;
    try {
        let res = await apiList[showModals.value?.params?.titleCate](params.value); // 调用函数来获取数据
        params.total = res.Total;
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
        }
        Object.keys(params.value).forEach((item) => {
            params.value[item] = '';
        });
        params.value.total = 1;
        getFetchData(1, 10);
    }
);
const showGoodsDetails = (i) => {
    router.push({
        path: '/jingmai/show-stamp-goods',
        query: {
            Id: i.Gid,
            SType: 1,
            Cate1: 1
            // show: true
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
        checkList.value.DelList.push(query);
    }
    if (checkList.value.DelList.length == fetchData.value.length) {
        all.value = true;
    } else {
        all.value = false;
    }
    console.log(checkList.value);
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
            return query;
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
    console.log(checkList.value.DelList);
};
</script>

<template>
    <div class="my-bidding">
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
                        <a-button type="primary" @click="getFetchData(1, 10)">搜索</a-button>
                    </div>
                </template>
                <template v-slot:active3>
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
                                    <span>
                                        {{ record.Title }}
                                    </span>
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
                                    >￥{{ record.MPrice || record.MakePrice }}</span
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
