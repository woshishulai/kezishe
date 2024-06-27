<script setup>
import { getImageUrl } from '@/utils';
import { ref, h, watch, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getMailApi } from '@/request/api';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';

const router = useRouter();
const route = useRoute();
const active = ref('');
const sonActive = ref('');
const list = ref([
    {
        router: 'account-management',
        name: '账号管理',
        children: [
            {
                router: 'account-management',
                name: '个人信息',
                selectIcon: 'right.png'
            },
            {
                router: 'account-management/nick-name',
                name: '个人昵称',
                selectIcon: 'right.png'
            },
            {
                router: 'account-management/bank-information',
                name: '银行信息',
                selectIcon: 'right.png'
            },
            {
                router: 'account-management/shipping-information',
                name: '快递信息',
                selectIcon: 'right.png'
            },
            {
                router: 'account-management/change-password',
                name: '修改密码',
                selectIcon: 'right.png'
            }
        ],
        icon: 'zhanghaozhongxinzhanghaoguanli'
    },
    {
        router: 'mail',
        name: '信箱',
        icon: '001-mailinboxapp'
    },
    {
        router: 'my-following',
        name: '我的关注',
        icon: 'aixin'
    },
    {
        router: 'my-bidding',
        name: '我的竞买',
        icon: 'chuizi'
    },
    {
        router: 'my-entrustment',
        name: '我的委托',
        children: [
            {
                router: 'my-entrustment',
                name: '我的藏品',
                selectIcon: 'right.png'
            },
            {
                router: 'my-entrustment/my-contract',
                name: '我的合同',
                selectIcon: 'right.png'
            },
            {
                router: 'my-entrustment/settlement-details',
                name: '结算明细',
                selectIcon: 'right.png'
            }
        ],
        icon: 'weituo'
    },
    {
        router: 'quick-sell',
        name: '一键转卖',
        children: [
            {
                router: 'quick-sell',
                name: '合同列表',
                selectIcon: 'right.png'
            },
            {
                router: 'quick-sell/details',
                name: '合同明细',
                selectIcon: 'right.png'
            },
            {
                router: 'quick-sell/contract-details',
                name: '合同详情',
                selectIcon: 'right.png'
            }
        ],
        icon: 'touch'
    },
    {
        router: 'logistics',
        name: '物流',
        children: [
            {
                router: 'logistics',
                name: '未发货',
                selectIcon: 'right.png'
            },
            {
                router: 'logistics/yifahuo',
                name: '已发货',
                selectIcon: 'right.png'
            }
        ],
        icon: 'wuliuxinxi'
    },
    {
        router: 'youhuiquan',
        name: '优惠券',
        icon: 'youhuijuan'
    },
    {
        router: 'points',
        name: '积分',
        icon: '5wodejifen'
    },
    {
        router: 'financial-information',
        name: '财务信息',
        children: [
            {
                router: 'financial-information',
                name: '账户余额',
                selectIcon: 'right.png'
            },
            {
                router: 'financial-information/edu',
                name: '竞买额度',
                selectIcon: 'right.png'
            },
            {
                router: 'financial-information/refund',
                name: '退款',
                selectIcon: 'right.png'
            },
            {
                router: 'financial-information/financial-details',
                name: '财务明细',
                selectIcon: 'right.png'
            }
        ],
        icon: 'jurassic_currency'
    }
]);
const url = route.fullPath.replace('/user/', '');

list.value.forEach((item, index) => {
    if (item.router === url) {
        active.value = index;
        sonActive.value = 0;
    } else if (item.children && item.children.length) {
        const childIndex = item.children.findIndex((child) => child.router === url);
        if (childIndex !== -1) {
            active.value = index;
            sonActive.value = childIndex;
        }
    }
});
const getEmail = async () => {
    let res = await getMailApi({
        page: 1,
        pageSize: 10000
    });
    const index = res.Data.find((item) => {
        return item.IsRead == 0;
    });
    if (index) {
        list.value[1].num = 1;
    } else {
        list.value[1].num = null;
    }
};

const timer = ref(null);
timer.value = setInterval(() => {
    getEmail();
}, 10000);
onUnmounted(() => {
    timer.value = null;
});

// const selectRouter = router.currentRoute._rawValue.fullPath;
// const segments = selectRouter.split('/');
// let desiredPath = '';

// // 函数来获取不包含参数的路径
// const getPathWithoutParams = (path) => path.split('?')[0];

// if (segments.length >= 3) {
//     desiredPath = `/${segments[1]}/${segments[2]}`;
// }
// const openKeys = ref([getPathWithoutParams(desiredPath)]); // 忽略参数部分

// const selectedKeys = ref([getPathWithoutParams(selectRouter)]); // 忽略参数部分
// watch(router.currentRoute, (to, from) => {
//     selectedKeys.value = [getPathWithoutParams(router.currentRoute._rawValue.fullPath)]; // 忽略参数部分
// });
// const generateMenuItems = (routes, parentRoutePath = '/user/') => {
//     const userRoutes = routes.find((route) => route.path === '/user');
//     const generateChildren = (children, parentPath) => {
//         return children
//             .map((childRoute, index) => {
//                 if (childRoute.path === 'userinfo') {
//                     // 排除个人中心路由
//                     return null;
//                 }
//                 if (childRoute.isShowMenu == false) {
//                     // 排除不展示
//                     return null;
//                 }
//                 const childMenuItem = {
//                     key: getPathWithoutParams(parentPath + childRoute.path), // 忽略参数部分
//                     label: childRoute.meta.name,
//                     router: childRoute.path,
//                     icon: () => (childRoute.meta.icon ? h(childRoute.meta.icon) : null)
//                 };

//                 if (childRoute.children && childRoute.children.length > 0) {
//                     childMenuItem.children = generateChildren(
//                         childRoute.children,
//                         parentPath + childRoute.path + '/'
//                     );
//                 }

//                 return childMenuItem;
//             })
//             .filter(Boolean); // 过滤掉为null的项
//     };

//     if (userRoutes) {
//         return generateChildren(userRoutes.children, parentRoutePath);
//     }

//     return [];
// };

// const menuItems = ref(generateMenuItems(userRoutes));

const handleClick = (e, index, iIndex) => {
    active.value = index;
    sonActive.value = iIndex || 0;
    const url = `/user/${e}`;
    if (url === route.path) {
        router.replace({ path: url, query: { refresh: Math.random() } }).then(() => {
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
        router.push(url);
    }
};
const showUserInfo = () => {
    router.push('/user/userinfo');
    active.value = '';
    sonActive.value = '';
};
</script>
<template>
    <div class="user-nav-list">
        <div class="nav-title" @click="showUserInfo">个人中心</div>
        <div class="list">
            <div class="item" v-for="(item, index) in list" :key="index">
                <div
                    class="title"
                    @click="handleClick(item.router, index)"
                    :class="{ active: active === index }"
                >
                    <div class="icon">
                        <i :class="['iconfont', 'icon-' + item.icon]"></i>
                    </div>
                    {{ item.name }}
                    <span v-if="item.num"></span>
                </div>
                <div class="i" v-show="item.children && item.children.length && active === index">
                    <div
                        class="i-item"
                        v-for="(i, iIndex) in item.children"
                        :key="iIndex"
                        @click="handleClick(i.router, index, iIndex)"
                        :class="{ active: sonActive === iIndex }"
                    >
                        <img :src="getImageUrl('user/menu/right.png')" alt="" /> {{ i.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.user-nav-list {
    width: 256px;
}
.nav-title {
    background: url('@/assets/img/user/menu-title-bg.png');
    background-size: 100% 100%;
    height: 56px;
    color: #fff;
    line-height: 57px;
    cursor: pointer;
    padding-left: 35px;
    border-radius: 10px 10px 0 0;
    font-size: 16px;
}
.list {
    padding: 4px 12px;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    padding-bottom: 40px;
}
.item {
    width: 100%;
}
.title {
    position: relative;
    display: flex;
    align-items: center;
    color: rgb(74, 74, 74);
    padding: 20px 8px 17px;
    font-size: 16px;
    cursor: pointer;
}
.title:hover {
    color: #9a0000;
}
.title.active {
    color: #9a0000;
}
.title .icon {
    width: 30px;
}
.title span {
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateX(-50%);
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #9a0000;
}
.i {
    padding-bottom: 10px;
    transition: 0.2s;
    color: #4a4a4a;
    font-size: 21px;
}
.i-item {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 8px 16px;
    cursor: pointer;
    border-width: 2px;
    border-color: transparent;
    border-style: solid;
    border-radius: 6px;
    font-size: 14px;
}
.i-item:hover {
    color: #9a0000;
}
.i-item.active {
    color: #9a0000;
    border-color: rgb(154, 0, 0);
}
.i-item img {
    opacity: 0;
}
.i-item.active img,
.i-item:hover img {
    opacity: 1;
}
</style>
