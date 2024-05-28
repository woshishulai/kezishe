const statusList = [
    {
        value: '北京市',
        label: '北京市',
        children: [
            {
                value: '昌平区',
                label: '昌平区'
            },
            {
                value: '海淀区',
                label: '海淀区'
            }
        ]
    },
    {
        value: '山西省',
        label: '山西省',
        children: [
            {
                value: '太原市',
                label: '太原市'
            },
            {
                value: '临汾市',
                label: '临汾市'
            }
        ]
    }
];
const shippingDataSource = [
    {
        key: '1',
        name: '王子涵',
        bank: '中国北京，西城区',
        code: '黄寺大街24号19号明湖大厦',
        ee: '100120',
        rr: '13799226494',
        tt: '设为默认'
    },
    {
        key: '2',
        name: '王子涵',
        bank: '中国北京，西城区',
        code: '黄寺大街24号19号明湖大厦',
        ee: '100120',
        rr: '13799226494',
        tt: '设为默认'
    }
];

const shippingColumns = [
    {
        title: '收货人',
        dataIndex: 'NickName',
        key: 'NickName',
        align: 'center'
    },
    {
        title: '所在地区',
        dataIndex: 'Address',
        key: 'Address',
        align: 'center'
    },
    {
        title: '详细地址',
        dataIndex: 'AddressDetails',
        key: 'AddressDetails',
        align: 'center'
    },
    {
        title: '邮编',
        dataIndex: 'Postal',
        key: 'Postal',
        align: 'center'
    },
    {
        title: '电话/手机',
        dataIndex: 'Tel',
        key: 'Tel',
        align: 'center'
    },
    {
        title: '',
        dataIndex: 'status',
        key: 'status',
        align: 'center'
    }
];
const jingMaiList = [
    {
        cate: '竞买中'
    },
    {
        cate: '已得标'
    },
    {
        cate: '未得标'
    },
    {
        cate: '未支付'
    },
    {
        cate: '不支付'
    },
    {
        cate: '未发货'
    },
    {
        cate: '已发货'
    }
];

export const timeOptions = [
    {
        value: '',
        label: '全部'
    },
    {
        value: '1',
        label: '1小时'
    },
    {
        value: '6',
        label: '6小时'
    },
    {
        value: '24',
        label: '当天'
    }
];
export const statusOptions = [
    {
        value: '',
        label: '全部状态'
    },
    {
        value: '1',
        label: '领先'
    },
    {
        value: '2',
        label: '代理'
    },
    {
        value: '3',
        label: '出局'
    }
];
export const pingTai = [
    {
        value: '',
        label: '全部'
    },
    {
        value: '0',
        label: '壳子社'
    }
];
export const jingMaiColumns = [
    {
        title: '藏品编号',
        dataIndex: 'Bn',
        key: 'Bn',
        align: 'center',
        ellipsis: true,
        width: 180
    },
    {
        title: '类型',
        dataIndex: 'Brand',
        key: 'Brand',
        align: 'center'
    },
    {
        title: '藏品名称',
        dataIndex: 'Title',
        key: 'Title',
        align: 'center',
        width: 250,
        ellipsis: true
    },
    {
        title: '平台',
        dataIndex: 'PingTai',
        key: 'PingTai',
        align: 'center',
        ellipsis: true
    },
    {
        title: '当前价',
        dataIndex: 'MPrice',
        key: 'MPrice',
        align: 'center',
        ellipsis: true,
        width: 140
    },
    {
        title: '状态',
        dataIndex: 'Status',
        key: 'Status',
        align: 'center',
        ellipsis: true
    },
    {
        title: '结标时间',
        dataIndex: 'Ontime',
        key: 'Ontime',
        align: 'center',
        ellipsis: true,
        width: 220
    }
];
export { statusList, jingMaiList, shippingDataSource, shippingColumns };
