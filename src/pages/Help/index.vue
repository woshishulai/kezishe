<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getMenuList, getLeftMenuList, getInfoDetails } from '@/request/shougou/api';
import Details from './Details.vue';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const menuData = ref(null);
const rightList = ref(null);
const query = reactive({
    Pid: route.query.faId,
    Id: '',
    PageSize: 10,
    total: 1,
    PageIndex: 1
});
const details = ref({});
const getDetails = async (index) => {
    let res = await getInfoDetails(index);
    details.value = res.Data.ArticleInfo;
    document.title = res.Data.seoData.seoTitle;
};
const title = ref('');
const getRightList = async (page = 1, pageSize = 10) => {
    query.PageIndex = page;
    query.PageSize = pageSize;
    try {
        let ress = await getLeftMenuList(query);
        rightList.value = ress.Data;
        query.total = rightList.value.Total;
        document.title = rightList.value.seoData.seoTitle;
        if (!rightList.value || !Array.isArray(rightList.value.articledatas)) {
            return;
        }
        rightList.value.articledatas = rightList.value.articledatas.map((article) => {
            const date = new Date(article.addTime);
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const year = date.getFullYear();
            return {
                ...article,
                monthDay: `${month}.${day}`,
                year: `-${year}-`
            };
        });
        console.log(rightList.value);
    } catch (error) {}
};
function* apis() {
    let index = yield fetchDataApi();
    yield index ? getDetails(index) : getRightList();
}
const iterator = apis();
const fetchDataApi = async (page = 1, pageSize = 10) => {
    query.PageIndex = page;
    query.PageSize = pageSize;
    try {
        let res = await getMenuList(query);
        menuData.value = res.Data;
        query.Id = route.query.Id || menuData.value.Children[0].Id;
        title.value = menuData.value.Children[0].Name;
        let number = route.query.Number;
        if (number || menuData.value.Children[0].ColType == 2) {
            iterator.next(number || menuData.value.Children[0].Id);
        } else {
            iterator.next();
        }
    } catch (error) {
        info('error', error);
    }
};
onMounted(() => {
    iterator.next();
});

const showDetails = (item) => {
    getDetails(item);
    router.push({
        path: '/shougou',
        query: {
            Number: item,
            Id: route.query.Id
        }
    });
};
const changeShowList = (index, name) => {
    query.Id = index;
    getRightList();
    router.push({
        path: '/shougou',
        query: {
            Number: '',
            Id: index
        }
    });
    title.value = name;
};
</script>

<template>
    <div class="wrap">
        <div class="bgs" :style="{ backgroundImage: `url(${menuData?.ImgUrl})` }"></div>
        <div class="con-main-wrap">
            <BreadCrumbs></BreadCrumbs>
            <div class="show-element">
                <div class="left-wrap">
                    <div class="cate-nav">
                        <div class="title">
                            <h5>{{ menuData?.Name }}</h5>
                            <p>
                                {{ menuData?.EnName }}
                            </p>
                        </div>
                        <div class="center">
                            <div
                                class="nav-item"
                                v-for="item in menuData?.Children"
                                :key="item.Id"
                                :class="query.Id == item.Id ? 'active' : ''"
                                @click="changeShowList(item.Id, item.Name)"
                            >
                                {{ item?.Name }}
                            </div>
                        </div>
                    </div>
                    <div class="information">
                        <div class="title">
                            <span></span>
                            <h5>推荐资讯</h5>
                        </div>
                        <div class="center">
                            <div
                                class="nav-item"
                                v-for="(item, index) in 8"
                                :key="index"
                                @click="showDetails(item)"
                            >
                                中国邮政发行《“一带一路”倡议提出十周年》纪念邮票
                            </div>
                        </div>
                    </div>
                </div>
                <div class="shou-gou" v-show="!route.query.Number">
                    <div class="title">{{ title }}</div>
                    <div class="con-wrap">
                        <div
                            class="info-item"
                            v-for="(item, index) in rightList?.articledatas"
                            :key="index"
                            @click="showDetails(item.id)"
                            :style="{ backgroundImage: `url(${menuData?.ImgUrl})` }"
                        >
                            <div class="bg"> </div>
                            <div class="left-time">
                                <p class="mounth-day">09.03</p>
                                <p class="year">-2023-</p>
                            </div>
                            <div class="right-text">
                                {{ item.addtime }}
                                <h5>{{ item.title }}</h5>
                                <p class="label">{{ item.contents }}</p>
                                <p class="more">详细》</p>
                            </div>
                        </div>
                    </div>
                    <CatePage :paginations="query" @fetchList="getRightList"></CatePage>
                </div>
                <Details v-show="route.query.Number" :tableList="details"></Details>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.wrap {
    position: relative;
    padding-bottom: 40px;
    .shou-gou {
        flex: 1;
        background-color: #fff;
        .title {
            height: 110px;
            line-height: 110px;
            padding: 0 40px;
            font-size: 18px;
        }
        .con-wrap {
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            .info-item {
                position: relative;
                z-index: 1;
                display: flex;
                flex-direction: row;
                gap: 30px;
                padding: 20px;
                cursor: pointer;
                background-size: 100% 100%;
                &:hover {
                    .bg {
                        opacity: 0;
                    }
                }
                .bg {
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                    z-index: -1;
                    bottom: 0;
                    background-color: #f8f8f8;
                }
                .left-time {
                    padding: 40px;
                    background-color: #fff;
                    text-align: center;
                    .mounth-day {
                        font-size: 36px;
                    }
                    .year {
                        margin-top: 10px;
                        font-size: 16px;
                    }
                }
                .right-text {
                    flex: 1;
                    width: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    h5 {
                        .ellipsis;
                        font-size: 18px;
                        font-weight: 600;
                    }
                    .label {
                        .ellipsis2;
                        color: #6a6a6a;
                        height: 40px;
                        line-height: 20px;
                    }
                    .more {
                        display: flex;
                        flex-direction: row-reverse;
                    }
                }
            }
        }
    }
    .bgs {
        content: '';
        position: absolute;
        top: 76px;
        left: 0;
        right: 0;
        bottom: auto;
        height: 310px;
        z-index: -1;
        // background-image: url('@/assets/img/shougou/bg.jpg');
        background-size: cover;
        background-position: center top;
    }
    .show-element {
        display: flex;
        flex-direction: row;
        margin-top: 120px;
        .left-wrap {
            width: 280px;
            .cate-nav {
                .title {
                    padding: 30px 40px;
                    background-color: #9a0000;
                    color: #fff;
                    h5 {
                        font-size: 24px;
                    }
                    p {
                        margin-top: 10px;
                        color: #e3bf89;
                        font-size: 16px;
                    }
                }
                .center {
                    min-height: 300px;
                    padding: 20px 0;
                    background-color: #fffaeb;
                    .nav-item {
                        position: relative;
                        padding: 15px 40px;
                        margin-bottom: 10px;
                        font-size: 18px;
                        cursor: pointer;
                        .ellipsis;
                        &.active {
                            background-color: #f9ecc3;
                            &::before {
                                display: block;
                                position: absolute;
                                right: 0;
                                top: 0;
                                content: '';
                                width: 5px;
                                height: 48px;
                                background-color: #9a0000;
                            }
                        }
                        &:hover {
                            background-color: #f9ecc3;
                        }
                    }
                }
            }
            .information {
                margin-top: 10px;
                .title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 15px 20px;
                    background: url('@/assets/img/weituo/menu-title.png');
                    span {
                        display: block;
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background-color: #fff;
                    }
                    h5 {
                        font-size: 24px;
                        color: #fff;
                    }
                }
                .center {
                    min-height: 300px;
                    padding: 20px 0;
                    background-color: #fffaeb;
                    .nav-item {
                        font-size: 14px;
                        padding: 15px 20px;
                        margin-bottom: 10px;
                        line-height: 18px;
                        border-bottom: 1px dashed #f4e5b8;
                        cursor: pointer;
                        .ellipsis2;
                        &:hover {
                            color: #fff;
                            background-color: #9a0000;
                        }
                    }
                }
            }
        }
    }
}
</style>
