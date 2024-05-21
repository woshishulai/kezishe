<script setup>
import { ref, h, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { userRoutes } from '@/router/index.js';
const router = useRouter();
const route = useRoute();
const selectRouter = router.currentRoute._rawValue.fullPath;
const segments = selectRouter.split('/');
let desiredPath = '';

// 函数来获取不包含参数的路径
const getPathWithoutParams = (path) => path.split('?')[0];

if (segments.length >= 3) {
    desiredPath = `/${segments[1]}/${segments[2]}`;
}
const openKeys = ref([getPathWithoutParams(desiredPath)]); // 忽略参数部分

const selectedKeys = ref([getPathWithoutParams(selectRouter)]); // 忽略参数部分
watch(router.currentRoute, (to, from) => {
    selectedKeys.value = [getPathWithoutParams(router.currentRoute._rawValue.fullPath)]; // 忽略参数部分
});
const generateMenuItems = (routes, parentRoutePath = '/user/') => {
    const userRoutes = routes.find((route) => route.path === '/user');
    const generateChildren = (children, parentPath) => {
        return children
            .map((childRoute, index) => {
                if (childRoute.path === 'userinfo') {
                    // 排除个人中心路由
                    return null;
                }
                if (childRoute.isShowMenu == false) {
                    // 排除不展示
                    return null;
                }
                const childMenuItem = {
                    key: getPathWithoutParams(parentPath + childRoute.path), // 忽略参数部分
                    label: childRoute.meta.name,
                    router: childRoute.path,
                    icon: () => (childRoute.meta.icon ? h(childRoute.meta.icon) : null)
                };

                if (childRoute.children && childRoute.children.length > 0) {
                    childMenuItem.children = generateChildren(
                        childRoute.children,
                        parentPath + childRoute.path + '/'
                    );
                }

                return childMenuItem;
            })
            .filter(Boolean); // 过滤掉为null的项
    };

    if (userRoutes) {
        return generateChildren(userRoutes.children, parentRoutePath);
    }

    return [];
};

const menuItems = ref(generateMenuItems(userRoutes));

const handleClick = (e) => {
    const routePath = `${e.key}`;
    if (routePath === route.path) {
        router.replace({ path: routePath, query: { refresh: Math.random() } }).then(() => {
            localStorage.removeItem('checkedStatus');
            localStorage.removeItem('kuaidis');
            localStorage.removeItem('zhifus');
            localStorage.removeItem('baojias');
            localStorage.removeItem('iptValues');
            localStorage.removeItem('quans');
            localStorage.removeItem('quanLists');
            localStorage.removeItem('DelLists');
            localStorage.removeItem('showModal');
            localStorage.removeItem('showPaegs');
            localStorage.removeItem('goodsList');
        });
    } else {
        router.push(routePath);
    }
};
</script>

<template>
    <div class="user-nav-list">
        <div class="nav-title" @click="router.push('/user/userinfo')"> 个人中心 </div>
        <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            style="width: 260px"
            mode="inline"
            :items="menuItems"
            :key="menuItems"
            @click="handleClick"
        ></a-menu>
    </div>
</template>

<style scoped lang="less">
.user-nav-list {
    .nav-title {
        background: url('@/assets/img/user/menu-title-bg.png');
        background-size: 100% 100%;
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
        padding-left: 50px;
    }
}
:deep(.ant-menu-submenu-title) {
    font-size: 18px;
}
:deep(.ant-menu-sub) {
    .ant-menu-title-content {
        font-size: 16px;
        // color: #4a4a4a;
        // &:hover {
        //     color: #fff;
        // }
    }
}
:deep(.ant-menu-item) {
    font-size: 18px;
}
</style>
