<script setup>
import { ref, computed, reactive, onMounted, watch, h } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getMenuList, getLeftMenuList, getInfoDetails, getDanYe } from '@/request/shougou/api';
import { getHelp } from '@/request/api';
import Details from './Details.vue';
import { info } from '@/hooks/antd/message';
import { getImageUrl } from '@/utils';
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
//展开的数组
const openKeys = ref([]);
const addShowMenuItem = (id) => {
    const index = openKeys.value.findIndex((item) => item == id);
    if (index >= 0) {
        openKeys.value.splice(index, 1);
    } else {
        openKeys.value.push(id);
    }
};

//选中的
const selectKeys = ref('');
selectKeys.value = route.query.Id;
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
        if (selectKeys.value) {
            menuData.value.Children.forEach((item) => {
                if (item.Children && item.Children.length) {
                    item.Children.forEach((i) => {
                        if (i.Id == selectKeys.value) {
                            openKeys.value.push(item.Id);
                        }
                    });
                }
            });
        }
        query.Id = route.query.Id || menuData.value.Children[0].Id;
        selectKeys.value = query.Id;
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
    } catch (error) {
        console.log(error);
    }
};
const getHelpInfo = async () => {
    try {
        let res = await getHelp();
        menuData.value = res.Data;
        if (menuData.value.length) {
            if (route.query.Id) {
                addShowMenuItem(route.query.Id);
                menuData.value.forEach((item, index) => {
                    if (item.Children && item.Children.length) {
                        let sss = item.Children.findIndex((i) => i.Id == route.query.Id);
                        if (sss && sss >= 0) {
                            openKeys.value.push(menuData.value[index].Id);
                            changeShowList(menuData.value[index].Children[sss]);
                            throw Error('找到了');
                        }
                    }
                });
            } else {
                openKeys.value.push(menuData.value[0].Id);
                changeShowList(menuData.value[0].Children[0]);
            }
        }
    } catch (error) {
        console.log(error);
    }
};
onMounted(() => {
    if (!route.query.faId) {
        getHelpInfo();
    } else {
        iterator.next();
    }
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
    selectKeys.value = item.Id;
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
        if (route.query.faId) {
            query.Pid = route.query.faId;
            fetchDataApi();
        }
    }
);
watch(
    () => route.query.Id,
    () => {
        if (!route.query.Id) {
            getHelpInfo();
        } else {
            iterator.next();
        }
        if (route.query.Id) {
            let query = {
                Id: route.query.Id,
                ColType: route.query.ColType
            };
            changeShowList(query);
        }
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
                            <h5>{{ menuData?.Name || '帮助中心' }}</h5>
                            <p>
                                {{ menuData?.EnName }}
                            </p>
                        </div>
                        <div class="center">
                            <div class="list">
                                <div
                                    class="item"
                                    v-for="item in menuData?.Children || menuData"
                                    :key="item.Id"
                                >
                                    <div
                                        @click.stop="addShowMenuItem(item.Id)"
                                        class="menu-title"
                                        :class="openKeys.includes(item.Id) ? 'active' : ''"
                                        v-show="item?.Children && item?.Children.length"
                                    >
                                        <p>
                                            {{ item.Name }}
                                        </p>
                                        <img
                                            v-show="openKeys.includes(item.Id)"
                                            class="menu-icons"
                                            :src="getImageUrl('help/selectRight.svg')"
                                            alt="展开图标"
                                        />
                                        <img
                                            v-show="!openKeys.includes(item.Id)"
                                            class="menu-icon"
                                            :src="getImageUrl('help/right.svg')"
                                            alt="收起图标"
                                        />
                                    </div>
                                    <div
                                        @click="changeShowList(item)"
                                        class="menu-title"
                                        :class="selectKeys == item.Id ? 'active' : ''"
                                        v-show="!item?.Children || item.Children.length < 1"
                                    >
                                        <p>
                                            {{ item.Name }}
                                        </p>
                                        <img
                                            v-show="selectKeys == item.Id"
                                            style="width: 10px"
                                            :src="getImageUrl('help/select1.svg')"
                                            alt="展开图标"
                                        />
                                        <img
                                            v-show="selectKeys != item.Id"
                                            style="width: 10px"
                                            :src="getImageUrl('help/select2.svg')"
                                            alt="收起图标"
                                        />
                                    </div>
                                    <div class="son-list" v-show="openKeys.includes(item.Id)">
                                        <div
                                            class="son-item"
                                            v-for="i in item?.Children"
                                            :key="i.Id"
                                            @click="changeShowList(i)"
                                            :class="selectKeys == i.Id ? 'active' : ''"
                                        >
                                            <img :src="getImageUrl('help/menu-son.svg')" alt="" />
                                            <p>{{ i.Name }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
        #fff 52px,
        #fee3ba 52px,
        #fdf1db 286px,
        #fff 286px
    );
    :deep(table) {
        width: 100%;
        border-collapse: collapse;
        text-align: center;
        margin: 20px 0;
        th,
        td {
            border: 1px solid black; /* 为表格单元格添加1像素的黑色边框 */
            padding: 8px;
            text-align: left;
            text-align: center;
        }
        th {
            text-align: center;
            background-color: #f2f2f2; /* 设置表头的背景颜色 */
        }
    }
    :deep(p) {
        background: transparent;
        margin: 10px 0;
    }
    //  正常的
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
        }
        // .ant-menu-item {
        //     img {
        //         opacity: 0;
        //         width: 10px;
        //         height: 12px;
        //     }
        // }

        // .ant-menu-item-only-child {
        //     background-color: #fce7a5;
        //     border-radius: 20px;
        //     color: rgb(183, 119, 7);
        //     height: 45px;
        //     &.ant-menu-item-selected {
        //         font-family: 'MicrosoftYaHei';
        //         color: rgb(154, 0, 0);
        //     }

        //     .ant-menu-title-content {
        //         font-size: 16px;
        //         font-family: 'MicrosoftYaHei';
        //     }
        // }
        // .ant-menu-item {
        //     &.ant-menu-item-selected {
        //         background-color: #fce7a5;
        //         border-radius: 20px;
        //         color: rgb(183, 119, 7);
        //         height: 45px;
        //         &.ant-menu-item-selected {
        //             font-family: 'MicrosoftYaHei';
        //             color: rgb(154, 0, 0);
        //         }

        //         .ant-menu-title-content {
        //             font-size: 16px;
        //             font-family: 'MicrosoftYaHei';
        //         }
        //     }
        // }
        //选中的
        // .ant-menu-submenu-open {
        //     .ant-menu-submenu-title {
        //         font-size: 16px;
        //         font-family: 'MicrosoftYaHei';
        //         color: rgb(154, 0, 0);
        //         font-weight: 500;
        //         .ant-menu-item-icon {
        //             opacity: 0;
        //         }
        //     }
        //     //选中的紫菜蛋的箭头
        //     .ant-menu-item-selected {
        //         img {
        //             opacity: 1;
        //         }
        //         // color: rgb(154, 0, 0);
        //     }
        // }
    }
    // 子级
    :deep(.ant-menu-submenu) {
        .ant-menu-item.ant-menu-item-selected {
            background-color: rgb(255 246 217);
            border-radius: 0;
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
        margin-top: 36px;
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
                    .list {
                        min-height: 300px;
                        padding: 10px 5px 20px;
                        background-color: rgb(254 250 236);
                        .item {
                            .menu-title,
                            .title {
                                .flex-row;
                                justify-content: space-between;
                                padding: 0 30px 0 35px;
                                height: 45px;
                                background-color: rgb(252 231 166);
                                border-radius: 20px;
                                margin-bottom: 10px;
                                color: rgb(183, 119, 7);

                                &.active,
                                &:hover {
                                    cursor: pointer;
                                    color: rgb(154, 0, 0);
                                }
                                .menu-icon {
                                    width: 10px;
                                    height: 10px;
                                }
                                .menu-icons {
                                    width: 11px;
                                    height: 6px;
                                }
                            }
                            .son-list {
                                .son-item {
                                    .flex-row;
                                    justify-content: flex-start;
                                    gap: 30px;
                                    padding: 0 30px 0 35px;
                                    height: 45px;
                                    margin-bottom: 10px;
                                    img {
                                        opacity: 0;
                                    }
                                    &.active,
                                    &:hover {
                                        cursor: pointer;
                                        color: rgb(154, 0, 0);
                                        background-color: rgb(255 246 217);
                                        // img {
                                        //     opacity: 1;
                                        // }
                                    }
                                    &.active {
                                        img {
                                            opacity: 1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
