<script setup>
import { ref, computed, reactive, onMounted, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { navList } from '@/components/data';
import { getTabbatList } from '@/request/api';
import { useInternalMessage } from 'ant-design-vue/es/message/useMessage';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const tabbarList = ref([]);
const active = ref(null);
onMounted(async () => {
    try {
        let res = await getTabbatList();
        tabbarList.value = res.Data;
    } catch (err) {
        console.log(err);
    }
});

const showNav = (item) => {
    if (item.router == '/jingmai') {
        active.value = 0;
    } else {
        active.value = null;
    }
};
const changeActive = (index) => {
    active.value = index;
};
const removeActive = () => {
    active.value = null;
};
const showStamp = (item) => {
    if (item.TypeName == '邮票') {
        return;
        // router.push({
        //     path: '/jingmai/show-stamp-goods    ',
        //     query: {
        //         Id: item.Id
        //     }
        // });
    } else if (item.TypeName == '专场') {
        router.push({
            path: '/jingmai/',
            query: {
                Id: item.Id
            }
        });
    }
};
const showStampGoods = (i) => {
    router.push({
        path: '/jingmai/show-stamp-goods',
        query: {
            Id: i.Id,
            SType: 1,
            Cate1: 2,
            show: true
        }
    });
};
</script>

<template>
    <div class="header-tabbar-wrap" @mouseleave="removeActive()">
        <div class="con-main-wrap">
            <li
                class="nav-item"
                @click="router.push(item.router)"
                v-for="item in navList"
                @mouseover="showNav(item)"
                :key="item.title"
                :class="
                    route.path == item.router ||
                    route.path == item.children1 ||
                    route.path == item.children2
                        ? 'active'
                        : ''
                "
            >
                <span class="item"
                    >{{ item.title }}
                    <i
                        v-if="item.title == '竞买' || item.title == '成交'"
                        class="iconfont icon-down"
                    ></i>
                </span>
                <span class="shu"></span>
            </li>
        </div>
        <!-- //导航 -->
        <div class="fixed" v-if="active != null">
            <div class="con-main-wrap">
                <!-- //二级 -->
                <div class="two-item" v-for="(item, index) in tabbarList" :key="item.Id">
                    <li
                        @mouseover="changeActive(index)"
                        @click.stop="showStamp(item)"
                        :class="active === index ? 'active' : ''"
                    >
                        {{ item.TypeName }}</li
                    >
                </div>
            </div>
        </div>
        <div class="fixed san" v-if="tabbarList[active]?.Children.length">
            <div class="con-main-wrap">
                <div class="item" v-for="item in tabbarList[active]?.Children">
                    <span class="san-name">{{ item.TypeName }}</span>
                    <div class="list">
                        <span
                            v-for="(i, index) in item.Children"
                            @click.stop="showStampGoods(i)"
                            :key="index"
                            >{{ i.TypeName }}</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.header-tabbar-wrap {
    position: relative;
    background: #9a0000;
    padding: 5px 0 0;
    height: 48px;

    .con-main-wrap {
        .flex-row;
        justify-content: flex-start;
        color: #fff;
        .nav-item {
            position: relative;
            .flex-row;
            height: 43px;
            width: 148px;
            line-height: 43px;
            cursor: pointer;
            border-radius: 6px 6px 0 0;
            font-size: 16px;
            &:last-child {
                .shu {
                    display: none;
                }
            }
            &:hover {
                background: #c30606;
                .shu {
                    display: none;
                }
            }
            &.active {
                background-color: #fff;
                color: #9a0000;
                font-weight: bold;
                font-size: 18px;
                .shu {
                    display: none;
                }
            }
            .item {
                position: relative;
                .iconfont {
                    position: absolute;
                    bottom: -3px;
                    right: -15px;
                    font-size: 12px;
                }
            }
            .shu {
                position: absolute;
                right: 0;
                width: 1px;
                background-color: #c30606;
                height: 13px;
            }
        }
    }
    .fixed {
        position: absolute;
        top: 48px;
        width: 100%;
        z-index: 3;
        background-color: #f6f6f6;
        .con-main-wrap {
            .two-item {
                padding: 0 54px;
                li {
                    font-size: 16px;
                    padding: 2px 6px 5px;
                    height: 48px;
                    line-height: 48px;
                    cursor: pointer;
                    font-weight: bold;
                    color: #9a0000;
                    border-bottom: 3px solid transparent;
                    &:hover,
                    &.active {
                        border-color: #9a0000;
                    }
                }
            }
        }
    }
    .san {
        top: 96px;
        background-color: #fff;
        .con-main-wrap {
            display: flex;
            // justify-content: space-between;
            align-items: flex-start;
            padding: 30px 0;
            .item {
                // flex: 1;
                .flex-col;
                align-items: flex-start;
                gap: 20px;
                padding: 0 60px;
                color: #000;
                border-right: 1px solid #f2f2f2;
                &:last-child {
                    border: none;
                }
                .san-name {
                    color: #9a0000;
                    font-size: 15px;
                    font-weight: bold;
                }
                .list {
                    .flex-col;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    justify-content: flex-start;
                    gap: 16px;
                    height: 150px;
                    span {
                        color: #000;
                        font-weight: 600;
                        &:hover {
                            color: #9a0000;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
}
</style>
