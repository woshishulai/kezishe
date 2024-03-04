<script setup>
import { ref, computed, reactive, onMounted, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SearchOutlined } from '@ant-design/icons-vue';
import { getImageUrl } from '@/utils';
import CatePage from '@/components/common/CatePage.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
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
        title: '全部类型',
        dataIndex: 'goodscode',
        key: 'goodscode',
        align: 'center'
    },
    {
        title: '全部事件',
        dataIndex: 'goodscate',
        key: 'goodscate',
        align: 'center'
    },
    {
        title: '积分',
        dataIndex: 'goodsname',
        key: 'goodsname',
        align: 'center'
    },
    {
        title: '时间',
        dataIndex: 'order',
        key: 'order',
        align: 'center'
    },
    {
        title: '说明',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
    }
];
const dataSource = [
    {
        goodscode: '获取',
        goodscate: '委托结算',
        goodsname: '55',
        order: '2023-10.10'
    },
    {
        goodscode: '获取',
        goodscate: '委托结算',
        goodsname: '55',
        order: '2023-10.10'
    },
    {
        goodscode: '获取',
        goodscate: '委托结算',
        goodsname: '55',
        order: '2023-10.10'
    },
    {
        goodscode: '获取',
        goodscate: '委托结算',
        goodsname: '55',
        order: '2023-10.10'
    }
];
</script>

<template>
    <div class="points">
        <div class="card-box">
            <div class="title"> 积分 </div>
            <div class="con-wrap">
                <div class="jifen-wrap">
                    <h5>{{ '3, 614' }}</h5>
                </div>
                <show-modal :titleList="list">
                    <template v-slot:active2>
                        <div class="search-cate">
                            <a-select
                                ref="select"
                                placeholder="全部类型"
                                v-model:value="value1"
                                style="width: 220px"
                                :options="options1"
                                @change="handleChange"
                            ></a-select>
                            <a-select
                                ref="select"
                                placeholder="全部事件"
                                v-model:value="value1"
                                style="width: 220px"
                                :options="options1"
                                @change="handleChange"
                            ></a-select>
                            <a-select
                                ref="select"
                                placeholder="近一年"
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
                        <a-table :columns="columns" :dataSource="dataSource"></a-table>
                    </template>
                    <template v-slot:active4>
                        <CatePage></CatePage>
                    </template>
                </show-modal>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.points {
    width: 100%;

    .con-wrap {
        padding: 20px 12px;

        .jifen-wrap {
            padding: 55px 0 100px 120px;
            margin-bottom: 20px;
            background: url('@/assets/img/user/jifen/jifen-bg.png');
            background-size: 100% 100%;

            h5 {
                color: #fff;
                font-size: 40px;
            }
        }
    }
}
</style>
