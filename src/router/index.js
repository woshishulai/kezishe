//哈希路由
import { useUserInfo } from '@/store/module/user';
import { message } from 'ant-design-vue';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import {
    UserSwitchOutlined,
    HeartOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
    CaretRightOutlined
} from '@ant-design/icons-vue';
//在这里没有备初始化 userinfo是异步的
// const user = useUserInfo()
const baseRoutes = [
    {
        path: '/login',
        component: () => import('@/pages/Login/index.vue')
    },
    {
        path: '/register',
        component: () => import('@/pages/Register/index.vue')
    },
    {
        path: '/reset-password',
        component: () => import('@/pages/Reset/index.vue')
    }
];

const userRoutes = [
    {
        path: '/user',
        redirect: '/user/userinfo',
        meta: {
            name: '用户'
        },
        component: () => import('@/pages/User/index.vue'),
        children: [
            {
                path: 'userinfo',
                component: () => import('@/pages/User/item/PersonalCenter/index.vue'),
                meta: {
                    name: '个人中心'
                },
                children: [
                    {
                        path: '',
                        meta: {
                            name: '个人中心首页'
                        },
                        component: () => import('@/pages/User/item/PersonalCenter/UserInfo.vue')
                    },
                    {
                        path: 'show-grand',
                        meta: {
                            name: '会员等级'
                        },
                        component: () => import('@/pages/User/item/PersonalCenter/ShowGrand.vue')
                    }
                ]
            },
            {
                path: 'account-management',
                meta: {
                    name: '账号管理',
                    icon: UserSwitchOutlined
                },
                component: () => import('@/pages/User/item/AccountManagement/index.vue'),
                children: [
                    {
                        path: '',
                        component: () =>
                            import('@/pages/User/item/AccountManagement/PersonalInformation.vue'),
                        meta: {
                            name: '个人信息',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'nick-name',
                        component: () => import('@/pages/User/item/AccountManagement/NickName.vue'),
                        meta: {
                            name: '个人昵称',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'bank-information',
                        component: () =>
                            import('@/pages/User/item/AccountManagement/BankInformation.vue'),
                        meta: {
                            name: '银行信息',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'shipping-information',
                        component: () =>
                            import('@/pages/User/item/AccountManagement/ShippingInformation.vue'),
                        meta: {
                            name: '快递信息',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'change-password',
                        component: () =>
                            import('@/pages/User/item/AccountManagement/ChangePassword.vue'),
                        meta: {
                            name: '修改密码',
                            icon: CaretRightOutlined
                        }
                    }
                ]
            },
            {
                path: 'my-following',
                component: () => import('@/pages/User/item/MyFollowing.vue'),
                meta: {
                    name: '我的关注',
                    icon: HeartOutlined
                }
            },
            {
                path: 'my-bidding',
                component: () => import('@/pages/User/item/MyBidding.vue'),
                meta: {
                    name: '我的竞买',
                    icon: PieChartOutlined
                }
            },
            {
                path: 'my-entrustment',
                meta: {
                    name: '我的委托',
                    icon: MailOutlined
                },
                children: [
                    {
                        path: '',
                        component: () => import('@/pages/User/item/MyEntrustment/index.vue'),
                        meta: {
                            name: '我的藏品',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'my-contract',
                        component: () => import('@/pages/User/item/MyContract/index.vue'),
                        meta: {
                            name: '我的合同',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'settlement-details',
                        component: () => import('@/pages/User/item/SettlementDetails/index.vue'),
                        meta: {
                            name: '结算明细',
                            icon: CaretRightOutlined
                        }
                    }
                ]
            },
            {
                path: 'quick-sell',
                meta: {
                    name: '一键转卖',
                    icon: DesktopOutlined
                },
                component: () => import('@/pages/User/item/QuickSell/index.vue'),
                children: [
                    {
                        path: '',
                        meta: {
                            name: '合同列表',
                            icon: CaretRightOutlined
                        },
                        component: () => import('@/pages/User/item/QuickSell/QuickSell.vue')
                    },
                    {
                        path: 'details',
                        meta: {
                            name: '合同明细',
                            icon: CaretRightOutlined
                        },
                        component: () => import('@/pages/User/item/QuickSell/QuickSellDetails.vue')
                    },
                    {
                        path: 'contract-details',
                        meta: {
                            name: '合同详情',
                            icon: CaretRightOutlined
                        },
                        component: () => import('@/pages/User/item/QuickSell/ContractDetails.vue')
                    }
                ]
            },
            {
                path: 'logistics',
                meta: {
                    name: '物流',
                    icon: InboxOutlined
                },
                children: [
                    {
                        path: '',
                        component: () => import('@/pages/User/item/Logistics/NotShipped.vue'),
                        meta: {
                            name: '未发货',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'yifahuo',
                        component: () => import('@/pages/User/item/Logistics/Shipped.vue'),
                        meta: {
                            name: '已发货',
                            icon: CaretRightOutlined
                        }
                    }
                ]
            },
            {
                path: 'points',
                component: () => import('@/pages/User/item/Points.vue'),
                meta: {
                    name: '积分',
                    icon: AppstoreOutlined
                }
            },
            {
                path: 'financial-information',
                // component: () => import('@/pages/User/item/FinancialInformation.vue'),
                meta: {
                    name: '财务信息',
                    icon: PieChartOutlined
                },
                children: [
                    {
                        path: '',
                        component: () =>
                            import('@/pages/User/item/Financiallnfirmation/Chongzhi.vue'),
                        meta: {
                            name: '账户余额',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'youhuiquan',
                        component: () =>
                            import('@/pages/User/item/Financiallnfirmation/Youhuiquan.vue'),
                        meta: {
                            name: '优惠券',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'edu',
                        component: () => import('@/pages/User/item/Financiallnfirmation/Edu.vue'),
                        meta: {
                            name: '竞买额度',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'refund',
                        component: () =>
                            import('@/pages/User/item/Financiallnfirmation/TuiKuan.vue'),
                        meta: {
                            name: '退款',
                            icon: CaretRightOutlined
                        }
                    },
                    {
                        path: 'financial-details',
                        component: () => import('@/pages/User/item/Financiallnfirmation/Caiwu.vue'),
                        meta: {
                            name: '财务明细',
                            icon: CaretRightOutlined
                        }
                    }
                ]
            },
            {
                path: 'mail',
                component: () => import('@/pages/User/item/Mail/index.vue'),
                meta: {
                    name: '信箱',
                    icon: AppstoreOutlined
                }
            }
        ]
    }
];
const addRoutes = [
    {
        path: '/',
        meta: {
            name: '首页'
        },
        component: () => import('@/components/Layout/index.vue'),
        children: [
            {
                path: '',
                component: () => import('@/pages/Home/index.vue')
            },
            {
                path: '/jingmai',
                meta: {
                    name: '竞买'
                },
                component: () => import('@/pages/JingMai/index.vue'),
                children: [
                    {
                        path: '',
                        meta: {
                            name: '专场'
                        },
                        component: () => import('@/pages/JingMai/zhuanchang/index.vue')
                    },
                    {
                        path: 'show-goods',
                        meta: {
                            name: '藏品展示'
                        },
                        component: () => import('@/pages/JingMai/zhuanchang/Item1.vue')
                    },
                    {
                        path: 'goods-details',
                        meta: {
                            name: '藏品详情'
                        },
                        component: () => import('@/pages/JingMai/zhuanchang/Item2.vue')
                    },
                    {
                        path: 'stamp',
                        meta: {
                            name: '邮票'
                        },
                        component: () => import('@/pages/JingMai/youpiao/index.vue')
                    },
                    {
                        path: 'show-stamp-goods',
                        meta: {
                            name: '藏品展示'
                        },
                        component: () => import('@/pages/JingMai/youpiao/Item1.vue')
                    },
                    {
                        path: 'stamp-goods-details',
                        meta: {
                            name: '藏品详情'
                        },
                        component: () => import('@/pages/JingMai/youpiao/Item2.vue')
                    }
                ]
            },
            {
                path: '/weituo',
                redirect: '/weituo/online-commission',
                meta: {
                    name: '委托专栏'
                },
                component: () => import('@/pages/Weituo/WeiTuo.vue'),
                children: [
                    {
                        path: 'details',
                        meta: {
                            name: '委托'
                        },
                        component: () => import('@/pages/Weituo/item/Details.vue')
                    },
                    {
                        path: 'advantages',
                        meta: {
                            name: '委托优势与条款'
                        },
                        component: () =>
                            import('@/pages/Weituo/item/AdvantagesAndTermsOfEntrustment.vue')
                    },
                    {
                        path: 'online-commission',
                        meta: {
                            name: '线上委托'
                        },
                        component: () => import('@/pages/Weituo/item/OnlineCommission.vue')
                    },
                    {
                        path: 'delegation-process',
                        meta: {
                            name: '委托流程'
                        },
                        component: () => import('@/pages/Weituo/item/DelegationProcess.vue')
                    },
                    {
                        path: 'charges',
                        meta: {
                            name: '收费标准'
                        },
                        component: () => import('@/pages/Weituo/item/Charges.vue')
                    },
                    {
                        path: 'elegate-feedback',
                        meta: {
                            name: '委托回馈'
                        },
                        component: () => import('@/pages/Weituo/item/EelegateFeedback.vue')
                    },
                    {
                        path: 'billing-cycle',
                        meta: {
                            name: '结算周期'
                        },
                        component: () => import('@/pages/Weituo/item/BillingCycle.vue')
                    },
                    {
                        path: 'business-team-information',
                        meta: {
                            name: '业务团队信息'
                        },
                        component: () => import('@/pages/Weituo/item/BusinessTeamInformation.vue')
                    },
                    {
                        path: 'beware-of-scams',
                        meta: {
                            name: '谨防欺诈'
                        },
                        component: () => import('@/pages/Weituo/item/BewareOfScams.vue')
                    }
                ]
            },
            {
                path: '/zhongyou',
                meta: {
                    name: '中邮商城'
                },
                component: () => import('@/pages/Zhongyou/index.vue'),
                children: [
                    {
                        path: '',
                        meta: {
                            name: '商城首页'
                        },
                        component: () => import('@/pages/Zhongyou/Home/index.vue')
                    },
                    {
                        path: 'details',
                        meta: {
                            name: '商品详情 '
                        },
                        component: () => import('@/pages/Zhongyou/Details/index.vue')
                    },
                    {
                        path: 'list',
                        meta: {
                            name: '商城列表页'
                        },
                        component: () => import('@/pages/Zhongyou/List/index.vue')
                    }
                ]
            },
            {
                path: '/chengjiao',
                meta: {
                    name: '成交'
                },
                component: () => import('@/pages/Chengjiao/index.vue'),
                children: [
                    {
                        path: '',
                        meta: {
                            name: '成交专栏'
                        },
                        component: () => import('@/pages/Chengjiao/home/ChengJiao.vue')
                    },
                    {
                        path: 'transaction-session',
                        meta: {
                            name: '成交专场'
                        },
                        component: () =>
                            import('@/pages/Chengjiao/zhuanchang/TransactionSession.vue')
                    },
                    {
                        path: 'details',
                        meta: {
                            name: '成交详情'
                        },
                        component: () => import('@/pages/Chengjiao/details/Details.vue')
                    }
                ]
            },
            {
                path: '/shougou',
                meta: {
                    name: '收购'
                },
                component: () => import('@/pages/Shougou/index.vue'),
                children: [
                    {
                        path: '',
                        meta: {
                            name: '收购资讯'
                        },
                        component: () => import('@/pages/Shougou/ShouGou.vue')
                    },
                    {
                        path: 'details',
                        meta: {
                            name: '收购详情'
                        },
                        component: () => import('@/pages/Shougou/Details.vue')
                    }
                ]
            },
            {
                path: '/pingji',
                meta: {
                    name: '中邮评级'
                },
                component: () => import('@/pages/PingJi/index.vue')
            },
            {
                path: '/cart',
                component: () => import('@/pages/Cart/index.vue')
            }
        ]
    }
];
const routes = [
    ...baseRoutes,
    ...addRoutes,
    ...userRoutes,
    {
        path: '/:pathMatch(.*)',
        redirect: '/'
    }
];
const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes,
    // 路由滚动行为定制
    scrollBehavior() {
        return {
            top: 0
        };
    }
});
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
    // 获取用户信息的逻辑，可能是从全局状态管理或者其他地方获取
    const user = useUserInfo();
    // const userInfo = user.userInfo ? user.userInfo : {}
    //消息提示
    const info = (status, msg) => message[status](msg);
    // console.log('我是router路由 用户的信息为', user.userInfo, 'userInfo对象为', userInfo);
    // console.log('我是router路由 用户的信息为', user.userInfo, 'userInfo对象为');
    // 如果用户未登录且要访问的页面不是登录页面，则重定向到登录页面
    // if (
    //     Object.keys(user.userInfo).length === 0 &&
    //     to.path !== '/login' &&
    //     to.path !== '/' &&
    //     to.path !== '/register' &&
    //     to.path !== '/reset-password'
    // ) {
    //     next('/login');
    //     info('error', '请先登录');
    // } else {
    //     next(); // 继续正常跳转
    // }
    next();
});

export { userRoutes };
export default router;
