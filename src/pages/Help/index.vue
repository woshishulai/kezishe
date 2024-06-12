<script setup>
import { ref, computed, reactive, onMounted, watch, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getMenuList, getLeftMenuList, getInfoDetails, getDanYe } from '@/request/shougou/api';

import Details from './Details.vue';
import { info } from '@/hooks/antd/message';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const menuData = ref(null);
const rightList = ref(null);
const openKeys = ref([]); // 忽略参数部分

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
const getDanYes = async (index) => {
    let res = await getDanYe(index);
    details.value = res.Data.articledata;
    document.title = res.Data.seoData.seoTitle;
};
const addMethods = (query) => {
    if (query && query.ColType && query.ColType == 2) {
        getDanYes(query.Id);
    } else if (query && query.Number) {
        getDetails(query.Number);
    } else {
        getRightList();
    }
};
function* apis() {
    let index = yield fetchDataApi();
    // 文章详情  和 右边列表
    yield addMethods(index);
}
const iterator = apis();
const fetchDataApi = async (page = 1, pageSize = 10) => {
    query.PageIndex = page;
    query.PageSize = pageSize;
    try {
        let res = await getMenuList(query);
        menuData.value = res.Data;
        if (menuData.value.Children.lenght <= 1) {
            return;
        }
        query.Id = route.query.Id || menuData.value.Children[0].Id;
        openKeys.value.push(query.Id);
        console.log(openKeys.value);
        title.value = menuData.value.Children[0].Name;
        let number = route.query.Number;
        let ColType = route.query.ColType || menuData.value.Children[0].ColType;
        if (number || ColType || menuData.value.Children[0].ColType == 2) {
            let querys = {
                Number: number,
                ColType,
                Id: query.Id
            };
            const currentQuery = { ...route.query };
            currentQuery.ColType = ColType;
            router.push({
                path: route.path,
                query: currentQuery
            });
            iterator.next(querys);
        } else {
            iterator.next();
        }
    } catch (error) {}
};
onMounted(() => {
    iterator.next();
});

const showDetails = (item) => {
    getDetails(item);
    router.push({
        path: '/help',
        query: {
            Number: item,
            Id: route.query.Id,
            faId: route.query.faId
        }
    });
};
const changeShowList = (item) => {
    query.Id = item.Id;
    let querys = {
        Number: '',
        Id: item.Id,
        ColType: item.ColType,
        faId: route.query.faId
    };
    addMethods(querys);
    router.push({
        path: '/help',
        query: querys
    });
    title.value = item.Name;
};
const generateMenuItems = (menu) => {
    console.log(menu);
    if (menu && Object.prototype.toString.call(menu) === '[object Array]' && menu.length > 0) {
        return menu
            .map((item) => {
                const childMenuItem = {
                    Id: item.Id,
                    key: item.Id,
                    label: item.Name,
                    Name: item.Name,
                    ColType: item.ColType,
                    Href: item.Href,
                    Path: item.Path,
                    icon: () =>
                        h('img', {
                            src: getImageUrl('help/menu-son.svg'),
                            alt: 'icon',
                            class: 'menu-icon'
                        })
                };
                if (
                    item.Children &&
                    Object.prototype.toString.call(item.Children) === '[object Array]' &&
                    item.Children.length > 0
                ) {
                    childMenuItem.children = generateMenuItems(item.Children);
                }
                return childMenuItem;
            })
            .filter(Boolean);
    } else {
        return [];
    }
};
const handleClick = (items) => {
    let item = items.item;
    query.Id = item.Id;
    let querys = {
        Number: '',
        Id: item.Id,
        ColType: item.ColType,
        faId: route.query.faId
    };
    addMethods(querys);
    router.push({
        path: '/help',
        query: querys
    });
    title.value = item.Name;
};
watch(
    () => route.query.faId,
    () => {
        query.Pid = route.query.faId;
        fetchDataApi();
    }
);
</script>

<template>
    <div class="wrap">
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
                            <a-menu
                                id="dddddd"
                                v-model:openKeys="openKeys"
                                v-model:selectedKeys="selectedKeys"
                                mode="inline"
                                :items="generateMenuItems(menuData?.Children)"
                                @click="handleClick"
                            >
                                <template v-slot:expandIcon="{ isOpen }">
                                    <img
                                        v-if="isOpen"
                                        class="menu-icons"
                                        :src="getImageUrl('help/selectRight.svg')"
                                        alt="展开图标"
                                    />
                                    <img
                                        v-else
                                        class="menu-icon"
                                        :src="getImageUrl('help/right.svg')"
                                        alt="收起图标"
                                    />
                                </template>
                            </a-menu>
                        </div>
                    </div>
                </div>
                <div class="shou-gou" v-show="!route.query.Number && route.query.ColType != 2">
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
                <Details
                    v-show="route.query.Number || route.query.ColType == 2"
                    :tableList="details"
                ></Details>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.wrap {
    padding-bottom: 40px;
    background: linear-gradient(
        to bottom,
        #fff 0,
        #fff 76px,
        #fee3ba 76px,
        #fdf3e4 286px,
        #fff 286px
    );

    :deep(.ant-menu-light) {
        background-color: #fffaeb;
        padding: 10px 0;
        &.ant-menu-light.ant-menu-inline .ant-menu-sub.ant-menu-inline,
        &.ant-menu-light .ant-menu-item-selected,
        & {
            background-color: #fffaeb;
        }
        & .ant-menu-submenu-title {
            height: 45px;
            font-size: 16px;
            font-family: 'MicrosoftYaHei';
            color: rgb(183, 119, 7);
            background-color: #fce7a5;
            border-radius: 20px;
            .menu-icon {
                width: 8px;
                height: 10px;
            }
            .menu-icons {
                width: 11px;
                height: 6px;
            }
        }
        .ant-menu-item {
            img {
                opacity: 0;
                width: 10px;
                height: 12px;
                margin-top: 3px;
            }
        }
        .ant-menu-item-only-child {
            background-color: #fce7a5 !important;
            border-radius: 20px;
            color: rgb(183, 119, 7);
            height: 45px;
            &.ant-menu-item-selected {
                font-family: 'MicrosoftYaHei';
                color: rgb(154, 0, 0);
            }

            .ant-menu-title-content {
                font-size: 16px;
                font-family: 'MicrosoftYaHei';
            }
        }
        //选中的
        .ant-menu-submenu-open {
            .ant-menu-submenu-title {
                font-size: 16px;
                font-family: 'MicrosoftYaHei';
                color: rgb(154, 0, 0);
                font-weight: 500;
            }
            .ant-menu-item-selected {
                img {
                    opacity: 1;
                }
                // color: rgb(154, 0, 0);
            }
        }
    }
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

    .show-element {
        display: flex;
        flex-direction: row;
        margin-top: 40px;
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
                }
            }
        }
    }
}
</style>
