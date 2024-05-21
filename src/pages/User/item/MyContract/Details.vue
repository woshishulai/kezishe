<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getHeTongDetailsApi } from '@/request/user/api.js';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
const tableList = ref({});
const getHetongDetails = async (number) => {
    try {
        let res = await getHeTongDetailsApi(number);
        tableList.value = res.Data;
        console.log(tableList.value);
    } catch (error) {}
};
watchEffect(() => {
    getHetongDetails(route.query.Number);
});
</script>

<template>
    <div class="hetong-details">
        <div class="card-box infos">
            <div class="news">
                <div class="title">
                    <p>合同编号： {{ tableList.Number }}</p>
                    <p>登记日期：{{ tableList.AcceptTime }}</p>
                </div>
                <div class="show-jie-suan"> 查看结算概括 </div>
            </div>
            <div class="liucheng-list">
                <div
                    class="liucheng-item"
                    v-for="(item, index) in tableList.JinDuList"
                    :key="index"
                >
                    <div class="card-info">
                        <p>{{ item.Title }}</p>
                        <p>{{ item.Time }}</p>
                    </div>
                    <img class="nav" :src="getImageUrl('user/logistics/nav.png')" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.hetong-details {
    .infos {
        .title {
            .flex-row;
            gap: 30px;
            font-size: 20px;
            justify-content: flex-start;
            font-weight: 500;
            color: #9a0000;
            border: none;
        }
    }
    .news {
        width: 100%;
        border-bottom: 1px solid #ebebeb;
        .flex-row;
        justify-content: space-between;
        .show-jie-suan {
            color: #3a84e6;
            text-decoration: underline;
            cursor: pointer;
        }
    }

    .liucheng-list {
        .flex-row;
        padding: 20px 0;
        gap: 10px;

        .liucheng-item {
            flex: 1;
            .flex-row;
            gap: 10px;

            &:last-child {
                .nav {
                    display: none;
                }
            }
            .card-info {
                flex: 1;
                .flex-col;
                height: 68px;
                gap: 10px;
                padding: 15px 0;
                background-color: #eef3f8;
                border-radius: 8px;
                font-size: 14px;
                p {
                    height: 14px;
                }
            }
        }
    }
}
</style>
