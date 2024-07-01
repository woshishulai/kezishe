let navList = [
    {
        title: '首页',
        router: '/'
    },
    {
        title: '竞买',
        router: '/jingmai',
        children1: '/jingmai/',
        children2: '/jingmai/stamp',
        children3: '/jingmai/show-stamp-goods',
        children4: '/jingmai/goods-details',
        children5: '/jingmai/show-goods'
    },
    {
        title: '委托',
        router: '/weituo/online-commission'
    },
    {
        title: '中邮商城',
        router: '/zhongyou'
    },
    {
        title: '成交',
        router: '/chengjiao',
        children1: '/chengjiao/transaction-session',
        children2: '/chengjiao/details',
        children3: '/chengjiao/transaction-goods'
    },
    {
        title: '收购',
        router: '/shougou'
    },
    {
        title: '中邮评级',
        router: '/pingji'
    }
];
let cateList = [
    {
        text: '正',
        title: '正品保障',
        label: '正规渠道,真品保证'
    },
    {
        text: '天',
        title: '天天专场',
        label: '品类齐全,畅选无忧'
    },
    {
        text: '物',
        title: '急速物流',
        label: '急速配速,精致服务'
    },
    {
        title: '轻松购物',
        label: '流程简单,欢乐购物',
        text: '乐'
    }
];
let footerNavList = [
    {
        title: '买家指南',
        list: [
            {
                text: '商品展示'
            },
            {
                text: '商品规则'
            },
            {
                text: '购买流程'
            },
            {
                text: '支付方式'
            },
            {
                text: '配送方式'
            },
            {
                text: '售后服务'
            }
        ]
    },
    {
        title: '委托指南',
        list: [
            {
                text: '委托流程'
            },
            {
                text: '收费标准'
            },
            {
                text: '结算周期'
            },
            {
                text: '委托回赠'
            },
            {
                text: '业务团队'
            },
            {
                text: '更多帮助'
            }
        ]
    },
    {
        title: '关于我们',
        list: [
            {
                text: '公司介绍'
            },
            {
                text: '新闻动态'
            },
            {
                text: '诚聘英才'
            },
            {
                text: '法律声明'
            },
            {
                text: '服务协议'
            },
            {
                text: '联系我们'
            }
        ]
    },
    {
        title: '网站导航',
        list: [
            {
                text: '网站地图'
            },
            {
                text: '在线反馈'
            },
            {
                text: '帮助中心'
            }
        ]
    }
];

let footerInfoList = [
    {
        title: '首页'
    },
    {
        title: '招聘英才'
    },
    {
        title: '合作及洽谈'
    },
    {
        title: '联系我们'
    },
    {
        title: '关于我们'
    },
    {
        title: '风险提示'
    },
    {
        title: '收藏导航'
    }
];
export { navList, cateList, footerNavList, footerInfoList };
