<script setup>
import { ref, computed, reactive, onMounted, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { SearchOutlined } from '@ant-design/icons-vue';
import { getImageUrl } from '@/utils';
import { options2, options3, HeTongDataSource, HeTongColumns } from '../MyEntrustment/data';
import CatePage from '@/components/common/CatePage.vue';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const list = [
    {
        cate: '自营合同'
    },
    {
        cate: '商城合同'
    }
];
const state = reactive({
    selectedRowKeys: [],
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
const value1 = ref('cate1');
const handleChange = (value) => {
    console.log(`selected ${value}`);
};
const getGoodsList = () => {
    loading.value = true;
};
</script>

<template>
    <div class="my-entrustment">
        <div class="card-box">
            <div class="title"> 我的合同 </div>
            <show-modal :titleList="list">
                <template v-slot:active2>
                    <div class="search-cate">
                        <a-select
                            ref="select"
                            class="item"
                            placeholder="所有时间"
                            v-model:value="value1"
                            :options="options2"
                            @change="handleChange"
                        ></a-select>
                        <a-select
                            ref="select"
                            class="item"
                            placeholder="全部状态"
                            v-model:value="value1"
                            :options="options3"
                            @change="handleChange"
                        ></a-select>
                        <a-input v-model:value="value" class="item-input" placeholder="合同号" />
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
                        :columns="HeTongColumns"
                        :dataSource="HeTongDataSource"
                    >
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === `status`">
                                <div v-if="record.status == '已执行'">{{ record.status }}</div>
                                <div v-else style="color: red">{{ record.status }}</div>
                            </template>
                        </template>
                    </a-table>
                </template>
            </show-modal>
            <CatePage></CatePage>
        </div>
    </div>
</template>

<style scoped lang="less"></style>
