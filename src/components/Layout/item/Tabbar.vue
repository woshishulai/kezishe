<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { navList } from '@/components/data';
import { getTabbatList } from '@/request/api';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const tabbarList = ref([]);
const active = ref(0);
onMounted(async () => {
    try {
        let res = await getTabbatList();
        tabbarList.value = res.Data;
    } catch (err) {
        console.log(err);
    }
});
const changeActive = (index) => {
    console.log(index);
    active.value = index;
    console.log(tabbarList.value[active.value]);
};
const removeActive = () => {
    active.value = '';
};
</script>

<template>
    <div class="header-tabbar-wrap">
        <div class="con-main-wrap">
            <li
                class="nav-item"
                @click="router.push(item.router)"
                v-for="item in navList"
                :key="item.title"
                :class="route.path == item.router ? 'active' : ''"
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
        <div class="fixed">
            <div class="con-main-wrap">
                <!-- //二级 -->
                <div class="two-item" v-for="(item, index) in tabbarList" :key="item.Id">
                    <li @mouseover="changeActive(index)"> {{ item.TypeName }}</li>
                </div>
            </div>
        </div>
        <div class="fixed san">
            <div class="con-main-wrap">
                <div class="item" v-for="item in tabbarList[active]?.Children">
                    <span>{{ item.TypeName }}</span>
                    <div class="list">
                        <span></span>
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
            &:hover,
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
                    &:hover {
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
            justify-content: space-between;
            .item {
                flex: 1;
                color: #000;
            }
        }
    }
}
</style>
