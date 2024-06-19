import { ref } from 'vue';

const options1 = ref([
    {
        value: '-1',
        label: '全部'
    },
    {
        value: '1',
        label: '待处理'
    },
    {
        value: '2',
        label: '已受理'
    },
    {
        value: '3',
        label: '整理中'
    },
    {
        value: '4',
        label: '制图中'
    },
    {
        value: '5',
        label: '审核中'
    },
    {
        value: '6',
        label: '核查中'
    },
    {
        value: '7',
        label: '执行中'
    },
    {
        value: '8',
        label: '已执行'
    }
]);
const options2 = ref([
    {
        value: '0',
        label: '不限'
    },
    {
        value: '1',
        label: '1日内'
    },
    {
        value: '2',
        label: '2日内'
    },
    {
        value: '3',
        label: '一月内'
    },
    {
        value: '4一月外',
        label: ''
    },
    {
        value: '',
        label: ''
    }
]);
const options3 = ref([
    {
        value: 'cate1',
        label: '所有时间'
    },
    {
        value: 'lucy',
        label: 'Lucy'
    },
    {
        value: 'yiminghe',
        label: 'Yiminghe'
    }
]);
const timeStartOptions = [
    {
        value: '-1',
        label: '全部委托时间'
    },
    {
        value: '1',
        label: '一周内'
    },
    {
        value: '2',
        label: '一月内'
    },
    {
        value: '3',
        label: '三月内'
    },
    {
        value: '4',
        label: '三月外'
    }
];
const timeStartOptionss = [
    {
        value: '0',
        label: '全部'
    },
    {
        value: '1',
        label: '一日内'
    },
    {
        value: '2',
        label: '七日内'
    },
    {
        value: '30',
        label: '一月内'
    },
    {
        value: '40',
        label: '一月外'
    }
];
const timeEndOptions = [
    {
        value: '-1',
        label: '全部结标时间'
    },
    {
        value: '1',
        label: '一周内'
    },
    {
        value: '2',
        label: '一月内'
    },
    {
        value: '3',
        label: '3月内'
    },
    {
        value: '4',
        label: '三月外'
    }
];
const sellingPriceList = [
    {
        value: '-1',
        label: '全部类型'
    },
    {
        value: '1',
        label: '竞买'
    },
    {
        value: '2',
        label: '一口价'
    }
];
const statusLists = [
    {
        value: '-1',
        label: '全部'
    },
    {
        value: '3',
        label: '已成交'
    },
    {
        value: '0',
        label: '待预展'
    },
    {
        value: '1',
        label: '预展中'
    },
    {
        value: '2',
        label: '竞买中'
    },
    {
        value: '3',
        label: '已成交'
    },
    {
        value: '7',
        label: '未成交'
    },
    {
        value: '8',
        label: '已下架'
    },
    {
        value: '9',
        label: '已退回'
    },
    {
        value: '4',
        label: '待结算'
    },
    {
        value: '5',
        label: '结算中'
    },
    {
        value: '6',
        label: '已结算'
    }
];
const JingMaiStatusList = [
    {
        cate: '已成交',
        num: '5216'
    },
    {
        cate: '待预展',
        num: '0'
    },
    {
        cate: '预展中',
        num: '0'
    },
    {
        cate: '竞买中',
        num: '0'
    },
    {
        cate: '20',
        num: '43'
    },
    {
        cate: '结算中',
        num: '0'
    },
    {
        cate: '已结算',
        num: '5697'
    },
    {
        cate: '未成交',
        num: '7'
    },
    {
        cate: '已下架',
        num: '193'
    },
    {
        cate: '已退回',
        num: '335'
    }
];
const JingMaiColumns = [
    {
        title: '商品编号',
        ellipsis: true,
        dataIndex: 'Bn',
        key: 'Bn',
        width: 140,
        align: 'center'
    },
    {
        title: '商品名称',
        ellipsis: true,
        dataIndex: 'Title',
        key: 'Title',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '合同编号',
        ellipsis: true,
        dataIndex: 'Cbn',
        key: 'Cbn',
        width: 140,
        align: 'center'
    },
    {
        title: '委托时间',
        ellipsis: true,
        dataIndex: 'EntrustTime',
        key: 'EntrustTime',
        align: 'center',
        width: 180
    },
    {
        title: '起始价',
        ellipsis: true,
        dataIndex: 'BasePrice',
        key: 'BasePrice',
        align: 'center',
        width: 130
    },
    {
        title: '当前出价',
        ellipsis: true,
        dataIndex: 'MPrice',
        key: 'MPrice',
        align: 'center',
        width: 100
    },
    {
        ellipsis: true,
        title: '开始竞价时间',
        dataIndex: 'Starttime',
        key: 'Starttime',
        align: 'center',
        width: 180
    },
    {
        ellipsis: true,
        title: '结标时间',
        dataIndex: 'OnTime',
        key: 'OnTime',
        align: 'center',
        width: 180
    },
    {
        ellipsis: true,
        title: '结算状态',
        dataIndex: 'SettleStatus',
        key: 'SettleStatus',
        align: 'center',
        width: 130
    },
    {
        ellipsis: true,
        title: '结算时间',
        dataIndex: 'SettleTime',
        key: 'SettleTime',
        align: 'center',
        width: 160
    },

    {
        ellipsis: true,
        title: '藏品状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center',
        width: 160
    }
];
//已结算 已成交
const JingMaiColumns1 = [
    {
        title: '商品编号',
        ellipsis: true,
        dataIndex: 'Bn',
        key: 'Bn',
        width: 140,
        align: 'center'
    },
    {
        title: '商品名称',
        ellipsis: true,
        dataIndex: 'Title',
        key: 'Title',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '合同编号',
        ellipsis: true,
        dataIndex: 'Cbn',
        key: 'Cbn',
        width: 140,
        align: 'center'
    },
    {
        title: '委托时间',
        ellipsis: true,
        dataIndex: 'EntrustTime',
        key: 'EntrustTime',
        align: 'center',
        width: 180
    },
    {
        title: '起始价',
        ellipsis: true,
        dataIndex: 'BasePrice',
        key: 'BasePrice',
        align: 'center',
        width: 130
    },
    {
        title: '结标价',
        ellipsis: true,
        dataIndex: 'MakePrice',
        key: 'MakePrice',
        align: 'center',
        width: 100
    },
    {
        ellipsis: true,
        title: '开始竞价时间',
        dataIndex: 'Starttime',
        key: 'Starttime',
        align: 'center',
        width: 180
    },
    {
        ellipsis: true,
        title: '结标时间',
        dataIndex: 'OnTime',
        key: 'OnTime',
        align: 'center',
        width: 180
    },
    {
        ellipsis: true,
        title: '结算状态',
        dataIndex: 'SettleStatus',
        key: 'SettleStatus',
        align: 'center',
        width: 130
    },
    {
        ellipsis: true,
        title: '结算时间',
        dataIndex: 'SettleTime',
        key: 'SettleTime',
        align: 'center',
        width: 160
    },
    {
        ellipsis: true,
        title: '结算编号',
        dataIndex: 'Settlebn',
        key: 'Settlebn',
        align: 'center',
        width: 160
    },
    {
        ellipsis: true,
        title: '藏品状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center',
        width: 160
    }
];
//预展
const JingMaiColumns2 = [
    {
        title: '商品编号',
        ellipsis: true,
        dataIndex: 'Bn',
        key: 'Bn',
        width: 140,
        align: 'center'
    },
    {
        title: '商品名称',
        ellipsis: true,
        dataIndex: 'Title',
        key: 'Title',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '合同编号',
        ellipsis: true,
        dataIndex: 'Cbn',
        key: 'Cbn',
        width: 140,
        align: 'center'
    },
    {
        title: '起始价',
        ellipsis: true,
        dataIndex: 'BasePrice',
        key: 'BasePrice',
        width: 140,
        align: 'center'
    },
    {
        title: '委托时间',
        ellipsis: true,
        dataIndex: 'EntrustTime',
        key: 'EntrustTime',
        align: 'center',
        width: 180
    },
    {
        ellipsis: true,
        title: '藏品状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center',
        width: 160
    }
];
//竞买中
const JingMaiColumns3 = [
    {
        title: '商品编号',
        ellipsis: true,
        dataIndex: 'Bn',
        key: 'Bn',
        width: 140,
        align: 'center'
    },
    {
        title: '商品名称',
        ellipsis: true,
        dataIndex: 'Title',
        key: 'Title',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '合同编号',
        ellipsis: true,
        dataIndex: 'Cbn',
        key: 'Cbn',
        width: 140,
        align: 'center'
    },
    {
        title: '专场名称',
        ellipsis: true,
        dataIndex: 'SpecialName',
        key: 'SpecialName',
        width: 140,
        align: 'center'
    },
    {
        title: '委托时间',
        ellipsis: true,
        dataIndex: 'EntrustTime',
        key: 'EntrustTime',
        align: 'center',
        width: 180
    },
    {
        title: '起始价',
        ellipsis: true,
        dataIndex: 'BasePrice',
        key: 'BasePrice',
        align: 'center',
        width: 180
    },
    {
        ellipsis: true,
        title: '藏品状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center',
        width: 160
    }
];
//已退回
const JingMaiColumns4 = [
    {
        title: '商品编号',
        ellipsis: true,
        dataIndex: 'Bn',
        key: 'Bn',
        width: 140,
        align: 'center'
    },
    {
        title: '商品名称',
        ellipsis: true,
        dataIndex: 'Title',
        key: 'Title',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '合同编号',
        ellipsis: true,
        dataIndex: 'Cbn',
        key: 'Cbn',
        width: 140,
        align: 'center'
    },
    {
        title: '委托时间',
        ellipsis: true,
        dataIndex: 'EntrustTime',
        key: 'EntrustTime',
        align: 'center',
        width: 180
    },
    {
        title: '退回时间',
        ellipsis: true,
        dataIndex: 'FailBackTime',
        key: 'FailBackTime',
        align: 'center',
        width: 180
    },
    {
        ellipsis: true,
        title: '藏品状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center',
        width: 160
    }
];
//已下架
const JingMaiColumns5 = [
    {
        title: '商品编号',
        ellipsis: true,
        dataIndex: 'Bn',
        key: 'Bn',
        width: 140,
        align: 'center'
    },
    {
        title: '商品名称',
        ellipsis: true,
        dataIndex: 'Title',
        key: 'Title',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '合同编号',
        ellipsis: true,
        dataIndex: 'Cbn',
        key: 'Cbn',
        width: 140,
        align: 'center'
    },
    {
        title: '委托时间',
        ellipsis: true,
        dataIndex: 'EntrustTime',
        key: 'EntrustTime',
        align: 'center',
        width: 180
    },
    {
        title: '起始价',
        ellipsis: true,
        dataIndex: 'BasePrice',
        key: 'BasePrice',
        align: 'center',
        width: 180
    },
    {
        title: '结标价',
        ellipsis: true,
        dataIndex: 'MakePrice',
        key: 'MakePrice',
        align: 'center',
        width: 180
    },
    {
        title: '开始竞价时间',
        ellipsis: true,
        dataIndex: 'Starttime',
        key: 'Starttime',
        align: 'center',
        width: 180
    },
    {
        title: '下架时间',
        ellipsis: true,
        dataIndex: 'ClosingTime',
        key: 'ClosingTime',
        align: 'center',
        width: 180
    },
    {
        ellipsis: true,
        title: '藏品状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center',
        width: 160
    }
];
//未成交
const JingMaiColumns6 = [
    {
        title: '商品编号',
        ellipsis: true,
        dataIndex: 'Bn',
        key: 'Bn',
        width: 140,
        align: 'center'
    },
    {
        title: '商品名称',
        ellipsis: true,
        dataIndex: 'Title',
        key: 'Title',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '合同编号',
        ellipsis: true,
        dataIndex: 'Cbn',
        key: 'Cbn',
        width: 140,
        align: 'center'
    },
    {
        title: '委托时间',
        ellipsis: true,
        dataIndex: 'EntrustTime',
        key: 'EntrustTime',
        align: 'center',
        width: 180
    },
    {
        title: '起始价',
        ellipsis: true,
        dataIndex: 'BasePrice',
        key: 'BasePrice',
        align: 'center',
        width: 180
    },
    {
        title: '结标价',
        ellipsis: true,
        dataIndex: 'MakePrice',
        key: 'MakePrice',
        align: 'center',
        width: 180
    },
    {
        title: '开始竞价时间',
        ellipsis: true,
        dataIndex: 'Starttime',
        key: 'Starttime',
        align: 'center',
        width: 180
    },
    {
        title: '结标时间',
        ellipsis: true,
        dataIndex: 'OnTime',
        key: 'OnTime',
        align: 'center',
        width: 180
    },
    {
        ellipsis: true,
        title: '藏品状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center',
        width: 160
    }
];
//待结算 结算中
const JingMaiColumns7 = [
    {
        title: '商品编号',
        ellipsis: true,
        dataIndex: 'Bn',
        key: 'Bn',
        width: 140,
        align: 'center'
    },
    {
        title: '商品名称',
        ellipsis: true,
        dataIndex: 'Title',
        key: 'Title',
        width: 200,
        align: 'center',
        ellipsis: true
    },
    {
        title: '合同编号',
        ellipsis: true,
        dataIndex: 'Cbn',
        key: 'Cbn',
        width: 140,
        align: 'center'
    },
    {
        title: '委托时间',
        ellipsis: true,
        dataIndex: 'EntrustTime',
        key: 'EntrustTime',
        align: 'center',
        width: 180
    },
    {
        title: '起始价',
        ellipsis: true,
        dataIndex: 'BasePrice',
        key: 'BasePrice',
        align: 'center',
        width: 180
    },
    {
        title: '结标价',
        ellipsis: true,
        dataIndex: 'MakePrice',
        key: 'MakePrice',
        align: 'center',
        width: 180
    },
    {
        title: '开始竞价时间',
        ellipsis: true,
        dataIndex: 'Starttime',
        key: 'Starttime',
        align: 'center',
        width: 180
    },
    {
        title: '结标时间',
        ellipsis: true,
        dataIndex: 'OnTime',
        key: 'OnTime',
        align: 'center',
        width: 180
    },
    {
        title: '结算状态',
        ellipsis: true,
        dataIndex: 'SettleStatus',
        key: 'SettleStatus',
        align: 'center',
        width: 180
    },
    {
        ellipsis: true,
        title: '藏品状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center',
        width: 160
    }
];
const JingMaiDataSource = [
    {
        goodscode: '630527010',
        goodscate: '竞买',
        goodsname: '好东西很不错',
        order: '中邮网',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '待结算'
    },
    {
        goodscode: '630527010',
        goodscate: '竞买',
        goodsname: '好东西很不错',
        order: '中邮网',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '结算中'
    },
    {
        goodscode: '630527010',
        goodscate: '竞买',

        goodsname: '好东西很不错',
        order: '中邮网',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '待结算'
    },

    {
        goodscode: '630527010',
        goodscate: '竞买',

        goodsname: '好东西很不错',
        order: '中邮网',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '结算中'
    },
    {
        goodscode: '630527010',
        goodscate: '竞买',
        goodsname: '好东西很不错',
        order: '中邮网',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '结算中'
    },
    {
        goodscode: '630527010',
        goodscate: '竞买',

        goodsname: '好东西很不错',
        order: '中邮网',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '待结算'
    },

    {
        goodscode: '630527010',
        goodscate: '竞买',

        goodsname: '好东西很不错',
        order: '中邮网',
        time: '2023.10.12',
        price: '3,600.00元',
        sub: '待结算'
    }
];

const ShippingStatusList = [
    {
        cate: '在售',
        num: '1'
    },
    {
        cate: '代售',
        num: '0'
    },
    {
        cate: '结算',
        num: '13'
    }
];
const ShippingColumns = [
    {
        title: '商品编号',
        dataIndex: 'goodscode',
        key: 'goodscode',
        align: 'center'
    },
    {
        title: '商品名称',
        dataIndex: 'goodsname',
        key: 'goodsname',
        align: 'center'
    },
    {
        title: '合同编号',
        dataIndex: 'order',
        key: 'order',
        align: 'center'
    },
    {
        title: '单价',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
    },
    {
        title: '委托数量',
        dataIndex: 'sub',
        key: 'sub',
        align: 'center'
    },
    {
        title: '已售数量',
        dataIndex: 'num',
        key: 'num',
        align: 'center'
    },
    {
        title: '剩余库存',
        dataIndex: 'kucun',
        key: 'kucun',
        align: 'center'
    },
    {
        title: '属性',
        key: 'cate',
        dataIndex: 'cate',
        align: 'center'
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        align: 'center'
    },
    {
        title: '委托时间',
        key: 'time',
        dataIndex: 'time',
        align: 'center'
    }
];

const ShippingColumnsJieSuan = [
    {
        title: '商品编号',
        dataIndex: 'goodscode',
        key: 'goodscode',
        align: 'center'
    },
    {
        title: '商品名称',
        dataIndex: 'goodsname',
        key: 'goodsname',
        align: 'center'
    },
    {
        title: '合同编号',
        dataIndex: 'order',
        key: 'order',
        align: 'center'
    },
    {
        title: '委托时间',
        key: 'weituoshijian',
        dataIndex: 'weituoshijian',
        align: 'center'
    },
    {
        title: '成交价格',
        dataIndex: 'price',
        key: 'price',
        align: 'center'
    },
    {
        title: '成交时间',
        dataIndex: 'num',
        key: 'num',
        align: 'center'
    },
    {
        title: '成交数量',
        dataIndex: 'sub',
        key: 'sub',
        align: 'center'
    },
    {
        title: '结算状态',
        dataIndex: 'jiesuanzhuangtai',
        key: 'jiesuanzhuangtai',
        align: 'center'
    },
    {
        title: '结算时间',
        key: 'time',
        dataIndex: 'time',
        align: 'center'
    }
];

const HeTongColumns = [
    {
        title: '合同编号',
        key: 'Number',
        dataIndex: 'Number',
        align: 'center'
    },
    {
        title: '登录日期',
        key: 'CreateTime',
        dataIndex: 'CreateTime',
        align: 'center'
    },
    {
        title: '藏品数量',
        key: 'GoodsCount',
        dataIndex: 'GoodsCount',
        align: 'center'
    },
    {
        title: '当前状态',
        key: 'Status',
        dataIndex: 'Status',
        align: 'center'
    },
    {
        title: '',
        key: 'Details',
        dataIndex: 'Details',
        align: 'center'
    }
];
const HeTongDataSource = [
    {
        hetongbianhao: '99203829217',
        dengluriqi: '2023.09.01',
        nums: '23',
        status: '执行中'
    },
    {
        hetongbianhao: '99203829217',
        dengluriqi: '2023.09.01',
        nums: '23',
        status: '已执行'
    },
    {
        hetongbianhao: '99203829217',
        dengluriqi: '2023.09.01',
        nums: '23',
        status: '执行中'
    },
    {
        hetongbianhao: '99203829217',
        dengluriqi: '2023.09.01',
        nums: '23',
        status: '已执行'
    },
    {
        hetongbianhao: '99203829217',
        dengluriqi: '2023.09.01',
        nums: '23',
        status: '执行中'
    },
    {
        hetongbianhao: '99203829217',
        dengluriqi: '2023.09.01',
        nums: '23',
        status: '已执行'
    }
];

export {
    options1,
    options2,
    options3,
    timeStartOptions,
    timeStartOptionss,
    timeEndOptions,
    sellingPriceList,
    statusLists,
    JingMaiStatusList,
    JingMaiColumns1,
    JingMaiColumns2,
    JingMaiColumns3,
    JingMaiColumns4,
    JingMaiColumns5,
    JingMaiColumns6,
    JingMaiColumns7,
    JingMaiColumns,
    JingMaiDataSource,
    ShippingStatusList,
    ShippingColumns,
    ShippingColumnsJieSuan,
    HeTongColumns,
    HeTongDataSource
};
