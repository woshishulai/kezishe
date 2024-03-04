<script setup>
import { ref, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getWeiTuoNavApi } from '@/request/weituo/index.js';
const tableList = reactive([]);
onMounted(async () => {
    let res = await getWeiTuoNavApi();
    tableList.value = res.Data;
});

const router = useRouter();
const route = useRoute();
const navList = router.currentRoute._rawValue.matched[1].children;
const index = navList.findIndex((item) => item.path == 'details');
navList.splice(index, 1);
const newPath = ref('');
watchEffect(() => {
    newPath.value = route.path.replace('/weituo/', '');
});
const showItem = (item, index) => {
    console.log(tableList.value.Children[index].Id);
    router.push(`/weituo/${item}?id=${tableList.value.Children[index].Id}`);
};
</script>

<template>
    <div class="wrap">
        <BreadCrumbs></BreadCrumbs>
        <div class="con-main-wrap">
            <div class="menu-left">
                <div class="title">
                    <span class="white"></span>
                    <div class="cen-wrap">
                        <span>委托</span>
                        <span>ENTRUST</span>
                    </div>
                    <img :src="getImageUrl('weituo/icon.png')" alt="" />
                </div>
                <div class="menu-list">
                    <div v-for="(item, i) in navList" :key="i" class="weituo-nav-item">
                        <p
                            :class="item.path === newPath ? 'active' : ''"
                            @click="showItem(item.path, i)"
                            >{{ item.meta.name }}
                            <img :src="getImageUrl('weituo/right.svg')" alt="" />
                        </p>
                    </div>
                </div>
            </div>
            <div class="right-wrap">
                <RouterView></RouterView>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.wrap {
    padding-bottom: 80px;
    background: url('@/assets/img/weituo/bg.png');
    .con-main-wrap {
        .flex-row;
        align-items: stretch;
        gap: 15px;
        .menu-left {
            cursor: pointer;
            font-size: 16px;
            .title {
                .flex-row;
                padding: 21px 26px;
                gap: 20px;
                background: url('@/assets/img/weituo/menu-title.png');
                .white {
                    width: 4px;
                    height: 30px;
                    background-color: #fff;
                }
                .cen-wrap {
                    .flex-col;
                    align-items: flex-start;
                    font-size: 20px;
                    gap: 5px;
                    color: #fff;
                    margin-right: 20px;
                }
            }
            .menu-list {
                padding: 10px;
                background-color: #fff;
                .weituo-nav-item {
                    margin: 10px 0;
                    p {
                        .flex-row;
                        justify-content: space-between;
                        padding: 16px 16px 16px 40px;
                        border-radius: 10px;
                        &:hover {
                            background-color: #f2f2f2;
                            border-radius: 10px;
                            img {
                                opacity: 1;
                            }
                        }
                        &.active {
                            background-color: #f2f2f2;
                            color: #ff2e00;
                            img {
                                opacity: 1;
                            }
                        }
                        img {
                            opacity: 0;
                            height: 30px;
                        }
                    }
                }
            }
        }
        .right-wrap {
            flex: 1;
            min-height: 1000px;
            :deep(.title) {
                text-align: center;
                padding: 26px 120px;
                font-size: 20px;
                border-bottom: 1px solid #ebebeb;
            }
            :deep(.cen-box) {
                padding: 40px 40px 80px;
            }
        }
    }
}
</style>
