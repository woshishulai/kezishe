import { ref } from 'vue';
const list = [
    {
        cate: '竞买'
    },
    {
        cate: '购物'
    }
];
const tableList = [
    {
        cate: '结算单号'
    },
    {
        cate: '结算数'
    },
    {
        cate: '总结标额'
    },
    {
        cate: '结算总额'
    },

    {
        cate: '生成时间'
    },
    {
        cate: '状态'
    }
];
const options1 = ref([
    {
        value: 'cate1',
        label: '所有分类'
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
const setColumns = [
    {
        title: '合同编号 : 626231',
        key: 'contractCode',
        dataIndex: 'contractCode',
        align: 'center'
    },
    {
        title: '结算单数 : 1',
        key: 'number',
        dataIndex: 'number',
        align: 'center'
    },
    {
        title: '结算总结标额 : 0.00',
        key: 'biaoe',
        dataIndex: 'biaoe',
        align: 'center'
    },
    {
        title: '结算总额 : 0.00',
        key: 'zonge',
        dataIndex: 'zonge',
        align: 'center'
    },
    {
        title: '未结算藏品数 :16',
        key: 'weijiesuan',
        dataIndex: 'weijiesuan',
        align: 'center'
    },
    {
        title: '时间',
        key: 'time',
        dataIndex: 'time',
        align: 'center'
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        align: 'center'
    },
    {
        title: '查看',
        key: 'details',
        dataIndex: 'details',
        align: 'center'
    }
];
const dataSource = [
    {
        contractCode: '1047144',
        number: '1',
        biaoe: '0.00',
        zonge: '0.00',
        weijiesuan: '',
        time: '2023-09-07 12:12:33',
        status: '已完成',
        details: '查看详情'
    },
    {
        contractCode: '1047144',
        number: '1',
        biaoe: '0.00',
        zonge: '0.00',
        weijiesuan: '',
        time: '2023-09-07 12:12:33',
        status: '已完成',
        details: '查看详情'
    }
];
const gouWuTitleColumns = [
    {
        title: '结算单号',
        key: 'goodsCode',
        dataIndex: 'goodsCode',
        align: 'center'
    },
    {
        title: '成交数量',
        key: 'chengJiaoNum',
        dataIndex: 'chengJiaoNum',
        align: 'center'
    },
    {
        title: '成交总额',
        key: 'chengJiaoQian',
        dataIndex: 'chengJiaoQian',
        align: 'center'
    },
    {
        title: '结算总额',
        key: 'jieSuanZongE',
        dataIndex: 'jieSuanZongE',
        align: 'center'
    },
    {
        title: '结算时间',
        key: 'jieSuanShiJian',
        dataIndex: 'jieSuanShiJian',
        align: 'center'
    }
];
const gouWuDataSource = [
    {
        goodsCode: '4803',
        chengJiaoNum: 1,
        chengJiaoQian: 444.0,
        jieSuanZongE: 5453.0,
        jieSuanShiJian: '2023-10-9 23:33:11'
    },
    {
        goodsCode: '4803',
        chengJiaoNum: 1,
        chengJiaoQian: 444.0,
        jieSuanZongE: 5453.0,
        jieSuanShiJian: '2023-10-9 23:33:11'
    },
    {
        goodsCode: '4803',
        chengJiaoNum: 1,
        chengJiaoQian: 444.0,
        jieSuanZongE: 5453.0,
        jieSuanShiJian: '2023-10-9 23:33:11'
    },
    {
        goodsCode: '4803',
        chengJiaoNum: 1,
        chengJiaoQian: 444.0,
        jieSuanZongE: 5453.0,
        jieSuanShiJian: '2023-10-9 23:33:11'
    }
];
export { options1, list, tableList, setColumns, dataSource, gouWuTitleColumns, gouWuDataSource };
