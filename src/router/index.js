//哈希路由
import { useUserInfo } from '@/store/module/user';
import { message } from 'ant-design-vue';
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

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
                    name: '账号管理'
                },
                component: () => import('@/pages/User/item/AccountManagement/index.vue'),
                children: [
                    {
                        path: '',
                        component: () =>
                            import('@/pages/User/item/AccountManagement/PersonalInformation.vue'),
                        meta: {
                            name: '个人信息'
                        }
                    },
                    {
                        path: 'nick-name',
                        component: () => import('@/pages/User/item/AccountManagement/NickName.vue'),
                        meta: {
                            name: '个人昵称'
                        }
                    },
                    {
                        path: 'bank-information',
                        component: () =>
                            import('@/pages/User/item/AccountManagement/BankInformation.vue'),
                        meta: {
                            name: '银行信息'
                        }
                    },
                    {
                        path: 'shipping-information',
                        component: () =>
                            import('@/pages/User/item/AccountManagement/ShippingInformation.vue'),
                        meta: {
                            name: '快递信息'
                        }
                    },
                    {
                        path: 'change-password',
                        component: () =>
                            import('@/pages/User/item/AccountManagement/ChangePassword.vue'),
                        meta: {
                            name: '修改密码'
                        }
                    }
                ]
            },
            {
                path: 'mail',
                component: () => import('@/pages/User/item/Mail/index.vue'),
                meta: {
                    name: '信箱'
                }
            },
            {
                path: 'my-following',
                component: () => import('@/pages/User/item/MyFollowing.vue'),
                meta: {
                    name: '我的关注'
                }
            },
            {
                path: 'my-bidding',
                component: () => import('@/pages/User/item/Bidding/index.vue'),
                meta: {
                    name: '我的竞买'
                }
            },
            {
                path: 'zhifu',
                component: () => import('@/pages/User/item/Bidding/Item.vue'),
                meta: {
                    name: '支付'
                }
            },
            {
                path: 'select-zhifu',
                component: () => import('@/pages/User/item/Bidding/Item4.vue'),
                meta: {
                    name: '支付'
                }
            },
            {
                path: 'writ-form',
                component: () => import('@/pages/User/item/Bidding/Item2.vue'),
                meta: {
                    name: '填写汇款告知单'
                }
            },
            {
                path: 'yu-yue',
                component: () => import('@/pages/User/item/Bidding/Item3.vue'),
                meta: {
                    name: '预约柜台业务'
                }
            },
            {
                path: 'my-entrustment',
                meta: {
                    name: '我的委托'
                },
                children: [
                    {
                        path: '',
                        component: () => import('@/pages/User/item/MyEntrustment/index.vue'),
                        meta: {
                            name: '我的藏品'
                        }
                    },
                    {
                        path: 'my-contract',
                        component: () => import('@/pages/User/item/MyContract/index.vue'),
                        meta: {
                            name: '我的合同'
                        }
                    },
                    {
                        path: 'settlement-details',
                        component: () => import('@/pages/User/item/SettlementDetails/index.vue'),
                        meta: {
                            name: '结算明细'
                        }
                    }
                ]
            },
            {
                path: 'quick-sell',
                meta: {
                    name: '一键转卖'
                },
                component: () => import('@/pages/User/item/QuickSell/index.vue'),
                children: [
                    {
                        path: '',
                        meta: {
                            name: '合同列表'
                        },
                        component: () => import('@/pages/User/item/QuickSell/QuickSell.vue')
                    },
                    {
                        path: 'details',
                        meta: {
                            name: '合同明细'
                        },
                        component: () => import('@/pages/User/item/QuickSell/QuickSellDetails.vue')
                    },
                    {
                        path: 'contract-details',
                        meta: {
                            name: '合同详情'
                        },
                        component: () => import('@/pages/User/item/QuickSell/ContractDetails.vue')
                    }
                ]
            },
            {
                path: 'logistics',
                meta: {
                    name: '物流'
                },
                children: [
                    {
                        path: '',
                        component: () => import('@/pages/User/item/Logistics/NotShipped.vue'),
                        meta: {
                            name: '未发货'
                        }
                    },
                    {
                        path: 'yifahuo',
                        component: () => import('@/pages/User/item/Logistics/Shipped.vue'),
                        meta: {
                            name: '已发货'
                        }
                    }
                ]
            },
            {
                path: 'youhuiquan',
                component: () => import('@/pages/User/item/Financiallnfirmation/Youhuiquan.vue'),
                meta: {
                    name: '优惠券'
                }
            },
            {
                path: 'points',
                component: () => import('@/pages/User/item/Points.vue'),
                meta: {
                    name: '积分'
                }
            },
            {
                path: 'financial-information',
                // component: () => import('@/pages/User/item/FinancialInformation.vue'),
                meta: {
                    name: '财务信息'
                },
                children: [
                    {
                        path: '',
                        component: () =>
                            import('@/pages/User/item/Financiallnfirmation/Chongzhi.vue'),
                        meta: {
                            name: '账户余额'
                        }
                    },
                    {
                        path: 'edu',
                        component: () => import('@/pages/User/item/Financiallnfirmation/Edu.vue'),
                        meta: {
                            name: '竞买额度'
                        }
                    },
                    {
                        path: 'refund',
                        component: () =>
                            import('@/pages/User/item/Financiallnfirmation/TuiKuan.vue'),
                        meta: {
                            name: '退款'
                        }
                    },
                    {
                        path: 'financial-details',
                        component: () => import('@/pages/User/item/Financiallnfirmation/Caiwu.vue'),
                        meta: {
                            name: '财务明细'
                        }
                    }
                ]
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
                        component: () => import('@/pages/JingMai/zhuanchang/Item1.vue')
                        // component: () => import('@/pages/JingMai/youpiao/Item1.vue')
                    },
                    {
                        path: 'stamp-goods-details',
                        meta: {
                            name: '藏品详情'
                        },
                        component: () => import('@/pages/JingMai/zhuanchang/Item2.vue')
                        // component: () => import('@/pages/JingMai/youpiao/Item2.vue')
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
                        path: 'transaction-goods',
                        meta: {
                            name: '成交藏品'
                        },
                        component: () => import('@/pages/Chengjiao/goods/index.vue')
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
                component: () => import('@/pages/Shougou/index.vue')
            },
            {
                path: '/help',
                meta: {
                    name: '帮助中心'
                },
                component: () => import('@/pages/Help/index.vue')
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
        path: '/user/Required',
        component: () => import('@/pages/Required/index.vue')
    },
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
    scrollBehavior(to, from, savedPosition) {
        // 只有当路径（不包括查询参数）改变时才滚动到顶部
        if (to.path !== from.path) {
            return { top: 0 };
        }
        // 否则，保持当前位置
        return savedPosition || {};
    }
});
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
    //如果跳转到页面==现在的页面 就刷新当前页面
    // 获取用户信息的逻辑，可能是从全局状态管理或者其他地方获取
    // const user = useUserInfo();
    // const userInfo = user.userInfo ? user.userInfo : {}
    //消息提示
    // const info = (status, msg) => message[status](msg);
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
