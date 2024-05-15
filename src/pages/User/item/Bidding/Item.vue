<script setup>
import Header from './Header.vue';
import { ref, computed, reactive, onMounted, watchEffect, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { useUserInfo } from '@/store/store';
import { handleFinishFailed } from '@/utils/form/rules';
import { shippingColumns } from '../../data';
import { info } from '@/hooks/antd/message';
import { getZhiFu } from '@/request/user/api';
import { jingMaiColumns } from './data';
import {
    getUserAddressApi,
    removeUserAddressApi,
    changeUserAddressInfo,
    addUserAddressInfo,
    getCountList
} from '@/request/api';
import { youHuiQuan, getKuaiDi } from '@/request/user/api';

const router = useRouter();
const user = useUserInfo();

const addId = (e, value) => {
    formState.AreaType = value[0].AreaType;
};
const formState = reactive({
    Id: '', //数组的某一项
    title: '', //标题
    username: '',
    region: '中国',
    statusList: [], //省市数据
    date1: undefined, //选择的省市
    text: '', //详细地址
    bankNmae: '', //邮编
    tel: '', //电话
    phone: '',
    AreaType: ''
});
const props = defineProps({
    fetchData: {
        type: Array,
        default: []
    }
});
const goodsLists = ref([]);
watchEffect(() => {
    if (props?.fetchData.length >= 1) {
        goodsLists.value = props?.fetchData;
    } else {
        goodsLists.value = JSON.parse(localStorage.getItem('goodsList'));
    }
});

onMounted(async () => {
    try {
        await initCountList();
        await getZhiFuInfoList();
        await getAddressList();
        await getYouHuiQuanList();
        await getKuaiDiLists();
    } catch (error) {
        console.error(error);
    }
});
//快递价格
const kuaidiPriceList = ref([]);
const getKuaiDiLists = async () => {
    const res = await getKuaiDi();
    if (res.Tag !== 1) {
        return;
    }
    kuaidiPriceList.value = res.Data;
};

//计算快递价格
const goodsList = computed(() => {
    let arr = [];
    goodsLists.value?.forEach((item) => {
        const existingIndex = arr.findIndex((group) => group[0]?.CTypeId === item.CTypeId);
        if (existingIndex !== -1) {
            arr[existingIndex].push(item);
        } else {
            arr.push([item]);
        }
    });
    return arr;
});
const kuaidiPriceAll = computed(() => {
    if (kuaidi.value != 3) {
        return 0;
    }
    let totalPrice = 0;
    goodsList.value.forEach((group) => {
        const CTypeId = group[0]?.CTypeId;
        const kuaidiItem = kuaidiPriceList.value.find(
            (item) => item.CTypeId == CTypeId && item.AreaType == user.userAddress.AreaType
        );
        if (kuaidiItem) {
            let num = group.length;
            if (num <= kuaidiItem.FristNum) {
                totalPrice += parseInt(kuaidiItem.FristFee);
            } else {
                let extraFees =
                    Math.ceil((num - kuaidiItem.FristNum) / kuaidiItem.NextNum) *
                    parseInt(kuaidiItem.NextFee);
                totalPrice += parseInt(kuaidiItem.FristFee) + extraFees;
            }
        }
    });

    return totalPrice;
});

//优惠券数组
const youhuiquanList = ref({
    CouponUserData: [],
    lengths: '',
    CouponData: {}
});
const getYouHuiQuanList = async () => {
    const res = await youHuiQuan();
    if (res.Tag !== 1) {
        return;
    }
    console.log(res);
    youhuiquanList.value.CouponUserData = res.Data.CouponUserData.filter((item) => {
        return item.Status == 0;
    });
    youhuiquanList.value.CouponData = res.Data.CouponData;
    youhuiquanList.value.lengths = res.Data.CouponUserData.length;
};
const youhuiquanDetails = (item) => {
    const getItem = youhuiquanList.value.CouponData.find(
        (items) => (items.CouponId = item.CouponId)
    );
    return getItem.Title + getItem.Price;
};

const getAddressList = async () => {
    const res = await getUserAddressApi();
    if (res.Tag !== 1) {
        return;
    }
    addressList.value = res.Data;
};
const initCountList = async () => {
    const ress = await getCountList();
    if (ress.Tag !== 1) {
        return;
    }
    countList.value = ress.Data;
    formState.region = countList.value[0].AreaName;
    formState.statusList = countList.value[0].ChildList;
};
const getZhiFuInfoList = async () => {
    try {
        let res = await getZhiFu(1);
        if (res.Tag !== 1) {
            return;
        }
        peisongList.value = res.Data.DeliveryList;
        zhiFuList.value = res.Data.PayList;
        wuLiuList.value = res.Data.ExpressList;
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};
//配送方式
const peisongList = ref([]);
//物流方式
const wuLiuList = ref([]);
//支付方式
const zhiFuList = ref([]);

//城市
const countList = ref([]);
const removeOpen = ref(false);
const showAddress = ref(false);
const showAddressList = () => {
    showAddress.value = true;
};
const closeModel = () => {
    removeOpen.value = false;
};
const showModal = () => {
    removeOpen.value = true;
};
const postAPi = async () => {
    let res = await removeUserAddressApi(user.userAddress.Id);
    if (res.Tag == 1) {
        formState.Id = '';
        user.removeUserAddress();
        closeModel();
        const ress = await getUserAddressApi();
        addressList.value = ress.Data;
    }
};
//切换地址
const open = ref(false);
const changeAddress = (item) => {
    showAddress.value = false;
    user.changeUserAddress(item);
};
const changeOpen = (index) => {
    if (index == 1) {
        formState.title = '新增收货地址';
        formState.Id = '';
    }
    if (index == 2) {
        formState.title = '编辑收货地址';
        formState.Id = user.userAddress.Id;
        formState.username = user.userAddress.NickName;
        formState.region = user.userAddress.State;
        formState.date1 = [user.userAddress.Sheng, user.userAddress.Shi];
        formState.text = user.userAddress.Address;
        formState.bankNmae = user.userAddress.Postal;
        formState.tel = user.userAddress.Tel;
        formState.phone = user.userAddress.Phone;
        formState.default = user.userAddress.Default;
    }
    open.value = true;
};
//切换国家
const handleChange = (value, option) => {
    formState.region = value;
    formState.statusList = option.ChildList;
    formState.date1 = [];
};
//提交
const handleFinish = async () => {
    if (!formState.date1) {
        message['error']('省市地区不能为空');
        return;
    }
    let params = {
        NickName: formState.username, //昵称
        State: formState.region,
        Sheng: formState.date1[0],
        Shi: formState.date1[1],
        Address: formState.text,
        Postal: formState.bankNmae,
        Tel: formState.tel,
        Phone: formState.phone,
        Default: '0',
        AreaType: formState.AreaType,
        Id: formState.Id
    };
    try {
        let res;
        if (formState.title == '新增收货地址') {
            res = await addUserAddressInfo(params);
            params.Id = res.Data;
        }
        if (formState.title == '编辑收货地址') {
            res = await changeUserAddressInfo(params);
        }
        if (res.Tag === 1) {
            addressList.value.push(params);
            user.changeUserAddress(params);
            formState.username = '';
            // formState.region = '';
            formState.bankNmae = '';
            formState.tel = '';
            formState.phone = '';
            formState.text = '';
            formState.date1 = [];
            const ress = await getUserAddressApi();
            addressList.value = ress.Data;
            info('success', res.Message);
            open.value = false;
        }
    } catch (error) {
        info('error', error);
    }
};
//勾选框 优惠券
const checkedss = ref(false);
const emits = defineEmits(['changeShowPage']);
//选择的地址
const checked = ref(true);
const addressList = ref([]);
//选择的配送方式
const checkedStatusLocalStorage = localStorage.getItem('checkedStatus');
const checkedStatus = ref(0);
checkedStatusLocalStorage
    ? (checkedStatus.value = checkedStatusLocalStorage)
    : (checkedStatus.value = 0);
const changePeiSong = (e) => {
    zhifu.value = '';
    if (e.target.value != 2) {
        kuaidi.value = 0;
    }
};
//快递公司
const kuaidis = localStorage.getItem('kuaidis');
const kuaidi = ref(0);
kuaidis ? (kuaidi.value = kuaidis) : (kuaidi.value = 0);
const chanegKuaiDi = (index) => {
    kuaidi.value = index;
    checkedStatus.value = peisongList.value[1].Types;
    zhifu.value = 1;
};
//z公司
const zhifus = localStorage.getItem('zhifus');
const zhifu = ref(0);
zhifus ? (zhifu.value = zhifus) : (zhifu.value = 0);
const chanegZhiFu = (index) => {
    zhifu.value = index;
};

//我要保价
const baojia = ref(true);
let baojias = localStorage.getItem('baojias');
if (baojias) {
    baojias = true;
}
baojias ? (baojia.value = baojias) : (baojia.value = true);

const changeInput = (e) => {
    if (!e.target.checked) {
        iptValue.value = '';
    } else {
        iptValue.value = endPrice.value;
    }
};
//保价的价格
const iptValue = ref('');
const iptValues = localStorage.getItem('iptValues');
iptValues ? (iptValue.value = iptValues) : (iptValue.value = '');
const addPrice = () => {
    baojia.value = true;
    if (!kuaidi.value) {
        return;
    } else {
        if (iptValue.value > startPrice.value) {
            iptValue.value = startPrice.value;
            return;
        }
        if (iptValue.value < endPrice.value) {
            iptValue.value = endPrice.value;
        }
    }
};
const quan = ref(false);
// let quans = localStorage.getItem('quans');
// if (quans) {
//     quans = true;
// }
// quans ? (quan.value = quans) : (quan.value = true);
const changeQuan = (e) => {
    if (!e.target.checked) {
        quanList.value = [];
        selectCheckes.value = [];
    }
};
const quanList = ref([]);
const quanLists = localStorage.getItem('quanLists');
quanLists ? (quanList.value = JSON.parse(quanLists)) : (quanList.value = []);
const checkList = ref({
    DelList: []
});
const DelLists = localStorage.getItem('DelLists');
DelLists ? (checkList.value.DelList = JSON.parse(DelLists)) : (checkList.value.DelList = []);

//下拉选择勾选框
const selectCheckes = ref([]);
const changeGetYouhuiquan = (e) => {
    const index = selectCheckes.value.findIndex((item) => item.Id == e.Id);
    console.log(selectCheckes.value);
    if (index == -1) {
        let query = {
            Id: e.Id,
            CouponId: e.CouponId
        };
        selectCheckes.value.push(query);
    } else {
        selectCheckes.value.splice(index, 1);
    }
};
const getActives = (e) => {
    const index = selectCheckes.value.findIndex((item) => item.Id == e.Id);
    if (index == -1) {
        return false;
    } else {
        return true;
    }
};
const submit = () => {
    if (!user.userAddress.Id) {
        info('error', '请先添加地址');
        return;
    }
    if (!checkedStatus.value && checkedStatus.value != 0) {
        info('error', '请先选择配送方式');
        return;
    }
    if (checkedStatus.value == 2 && (!kuaidi.value || kuaidi.value == 0)) {
        info('error', '请先选择配送方式');
        return;
    }
    if (zhifu.value == 0 || !zhifu.value) {
        info('error', '请先选择支付方式');
        return;
    }
    const OrderDatas = goodsLists.value.map((item) => {
        let query = {
            AuctionType: 1,
            Aid: item.Aid, //藏品记录ID
            Gid: item.Gid, //藏品ID
            Title: item.Title, //藏品名称
            MakePrice: item.MakePrice, //成交价
            Nums: item.Nums, //数量
            IsCret: checkList.value.DelList.some((items) => item.Bn == items.Bn) ? 1 : 0, //是否包含证书 默认 0 不包含 1 包含
            CretPrice: 15 //证书价格
        };
        return query;
    });
    const CouponData = selectCheckes.value;
    const query = {
        OrderType: 1,
        AddrId: user.userAddress.Id, //地址ID
        DeliveryType: checkedStatus.value, //暂存还是上门
        PayType: zhifu.value, //怎么支付
        ExpressType: kuaidi.value, //物流方式，
        IsInsured: baojia.value ? 1 : 0, //报价
        InsuredPrice: iptValue.value || '0', //保价金额 比如100万
        AllLogisticsCost: kuaidiPriceAll.value, //运费
        WaitChargeTotal: '0', //仓储费 未支付没有仓储费 未发货有
        KeepPriceTotal: iptValue.value / news.value || '0', //保价费
        AllCertFeeCost: youhuiquanPrice.value, //收藏证书
        AllCertyouhuiCost: selectCheckes.value.length * 20, //收藏证书券抵扣金额
        AllTotal: allPrice.value, //应付总额
        OrderDatas,
        CouponData
    };
    quan.value = false;
    if (zhifu.value == 1) {
        emits('changeShowPage', 5, query);
        return;
    } else {
        emits('changeShowPage', 3, query);
    }
};
//勾选框
const showCheck = (e) => {
    if (getChecked(e.Bn)) {
        checkList.value.DelList = checkList.value.DelList.filter((item) => item.Bn !== e.Bn);
    } else {
        let query = {
            Bn: e.Bn
        };
        checkList.value.DelList.push(query);
    }
};
function getChecked(Bn) {
    const item = checkList.value.DelList.find((item) => item.Bn === Bn);
    return item !== undefined;
}
//展示商品详情
const showGoodsDetails = (i) => {
    console.log(i);
    router.push({
        path: '/jingmai/goods-details',
        query: {
            id: i.Gid
        }
    });
};
const goodsAllPrice = computed(() => {
    if (!goodsLists.value) return 0;
    return goodsLists.value.reduce((acc, item) => acc + item.Nums * item.MakePrice, 0);
});
//收藏证书需要支出的费用
const youhuiquanPrice = computed(() => {
    if (checkList.value.DelList.length < 1) return 0;
    if (checkList.value.DelList.length <= selectCheckes.value.length) return 0;
    if (selectCheckes.value.length) {
        return (checkList.value.DelList.length - selectCheckes.value.length) * 20;
    }
    return checkList.value.DelList.length * 20;
});
//收藏证书减少支出的费用
const removeYouHuiQuan = computed(() => {
    if (selectCheckes.value.length < 1) return 0;
    if (checkList.value.DelList.length >= selectCheckes.value.length)
        return selectCheckes.value.length * 20;
    if (selectCheckes.value.length > checkList.value.DelList.length) {
        return checkList.value.DelList.length * 20;
    }
});
const allPrice = computed(() => {
    if (!news.value) {
        return goodsAllPrice.value + kuaidiPriceAll.value + youhuiquanPrice.value;
    } else {
        return (
            goodsAllPrice.value +
            kuaidiPriceAll.value +
            youhuiquanPrice.value +
            Number(iptValue.value) * news.value
        );
    }
});
watchEffect(() => {
    localStorage.setItem('checkedStatus', checkedStatus.value);
    localStorage.setItem('kuaidis', kuaidi.value);
    localStorage.setItem('zhifus', zhifu.value);
    localStorage.setItem('baojias', baojia.value);
    localStorage.setItem('iptValues', iptValue.value);
    // localStorage.setItem('quans', quan.value);
    localStorage.setItem('quanLists', quanList.value);
    if (checkList.value && checkList.value.DelList) {
        localStorage.setItem('DelLists', JSON.stringify(checkList.value.DelList));
    }
});
//最低报价最高报价
const endPrice = ref(0);
const startPrice = ref(0);
//折扣比例
const news = ref(0);
watchEffect(() => {
    if (!kuaidi.value) {
        iptValue.value = '';
        news.value = '';
        endPrice.value = '';
        startPrice.value = '';
    }
    //计算报价费用
    if (wuLiuList.value.length) {
        const item = wuLiuList.value.find((item) => item.Types == kuaidi.value);
        if (item) {
            console.log(item);
            endPrice.value = item.MinCoverage || '';
            startPrice.value = item.Maxcoverage || '';
            news.value = item.InsuranceRate || '';
            iptValue.value = endPrice.value || '';
        }
    }
});
</script>

<template>
    <div class="address-wrap">
        <Header num="1"></Header>
        <div class="title-nav">
            <h5>收货信息</h5>
            <p @click="changeOpen(1)">新增收货地址</p>
        </div>
        <!-- 地址 -->
        <div class="center">
            <div class="address-default">
                <div class="address">
                    <a-radio v-model:checked="checked"></a-radio>
                    <p v-if="user.userAddress.Id"
                        >{{ user.userAddress.NickName }} {{ user.userAddress.State
                        }}{{ user.userAddress.Sheng }}{{ user.userAddress.Shi
                        }}{{ user.userAddress.Address }}{{ user.userAddress.Tel }}</p
                    >
                    <p v-else>请先添加地址</p>
                </div>
                <div class="change" v-show="user.userAddress.Id">
                    <p @click="changeOpen(2)">修改</p>
                    |
                    <p @click="showModal">删除</p>
                </div>
            </div>
            <div class="check-one" @click="showAddressList">
                更多地址
                <img :src="getImageUrl('user/jingmai/icon8.svg')" alt="" />
            </div>
        </div>
        <!-- 配送方式 -->
        <div class="title-nav">
            <h5>配送方式</h5>
        </div>
        <div class="center">
            <div class="select">
                <a-radio-group v-model:value="checkedStatus" @change="changePeiSong">
                    <a-radio :value="peisongList[0]?.Types">
                        <span class="radio">{{ peisongList[0]?.Title }}</span>
                    </a-radio>
                </a-radio-group>
                <p v-html="peisongList[0]?.Contents"> </p>
            </div>
            <div class="kuai-di">
                <div class="select">
                    <a-radio-group v-model:value="checkedStatus" @change="changePeiSong">
                        <a-radio :value="peisongList[1]?.Types">
                            <span class="radio">{{ peisongList[1]?.Title }}</span>
                        </a-radio>
                    </a-radio-group>
                    <p v-html="peisongList[1]?.Contents"> </p>
                </div>
                <div class="list">
                    <div class="item" v-for="(item, index) in wuLiuList" :key="item.Types">
                        <a-tooltip color="#9a0000">
                            <template #title v-if="item.SubTitle != ''">
                                <p>{{ item.SubTitle }}</p>
                            </template>
                            <p
                                class="wuliu"
                                :class="item.Types == kuaidi ? 'active' : ''"
                                @click="chanegKuaiDi(item.Types)"
                            >
                                {{ item.Title }}
                            </p>
                        </a-tooltip>
                        <img
                            v-show="item.SubTitle == ''"
                            style="cursor: pointer; margin-left: 10px"
                            :src="getImageUrl('chengjiao/icon6.png')"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="select">
                <a-radio-group v-model:value="checkedStatus" @change="changePeiSong">
                    <a-radio :value="peisongList[2]?.Types">
                        <span class="radio">{{ peisongList[2]?.Title }}</span>
                    </a-radio>
                </a-radio-group>
                <p>{{ peisongList[2]?.Contents }} </p>
            </div>
        </div>
        <!-- 支付方式 -->
        <div class="title-nav">
            <h5>
                支付方式
                <div>(商城商品只支持在线支付,完成支付后可申请上门自提)</div>
            </h5>
        </div>
        <div class="center">
            <div class="list">
                <div class="item" v-for="(item, index) in zhiFuList" :key="item.Types">
                    <a-button
                        class="wuliu"
                        :class="item.Types == zhifu ? 'active' : ''"
                        @click="chanegZhiFu(item.Types)"
                        :disabled="
                            (checkedStatus == 2 && item.Types != 1 && item.Types != 3) ||
                            (checkedStatus != 2 && item.Types == 2)
                        "
                    >
                        {{ item.Title }}
                    </a-button>
                </div>
            </div>
        </div>
        <!-- 是否保价 -->
        <div class="title-nav" v-show="checkedStatus != 1">
            <h5>
                是否保价
                <div>(仅限物流发货)</div>
            </h5>
        </div>
        <div class="center price-list" v-show="checkedStatus != 1">
            <a-checkbox @change="changeInput" v-model:checked="baojia">我要保价</a-checkbox>
            {{ endPrice }} - {{ startPrice }}
            <a-input
                @input="addPrice"
                style="width: 150px; background-color: #f3f3f3; height: 40px; border-radius: 10px"
                v-model:value="iptValue"
            />
            元
            <p>保价费:{{ iptValue * news }}元</p>
            <a-tooltip color="#9a0000">
                <template #title>
                    <div class="info-fuwu">
                        <p>服务费基础服务费{{ props.goodsDtails?.offerData?.Tips }}</p>
                        <p>服务费百分比{{ props.goodsDtails?.offerData?.TipsRate }}</p>
                        <p>服务费起征点{{ props.goodsDtails?.offerData?.TipsLevel }}</p>
                        <p>服务费提示信息{{ props.goodsDtails?.offerData?.TipsDes }}</p>
                    </div>
                </template>
                <img style="cursor: pointer" :src="getImageUrl('chengjiao/icon6.png')" alt="" />
            </a-tooltip>
        </div>
        <!-- 订单信息 -->
        <div class="title-nav">
            <h5>订单信息</h5>
            <p @click="emits('changeShowPage', 1)">返回修改</p>
        </div>
        <a-table :pagination="false" :columns="jingMaiColumns" :dataSource="goodsLists">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'Title'">
                    <div class="goods-info" @click="showGoodsDetails(record)">
                        <img :src="record.CoverImg" alt="" />
                        <span>
                            {{ record.Title }}
                        </span>
                    </div>
                </template>
                <template v-if="column.key === 'Status'">
                    <a-checkbox
                        @change.stop="showCheck(record)"
                        style="margin-right: 15px"
                        :checked="getChecked(record.Bn)"
                    ></a-checkbox>
                </template>
                <template v-if="column.key === 'MPrice'">
                    <span class="active">￥{{ record.MPrice || record.MakePrice }}</span>
                </template>
            </template>
        </a-table>
        <div class="center">
            <div class="details">
                <div class="left">
                    <div class="top-title">
                        <a-checkbox @change="changeQuan" v-model:checked="quan"
                            ><h5>优惠券</h5></a-checkbox
                        >
                        <a-dropdown :open="quan" placement="bottomLeft" :arrow="true">
                            <div class="top-title">
                                <p v-show="selectCheckes.length < 1">选择优惠券</p>
                                <p v-show="selectCheckes.length >= 1"
                                    >您已选择{{ selectCheckes.length }}张优惠券 ￥-{{
                                        selectCheckes.length * 20
                                    }}.00元</p
                                >
                            </div>
                            <template #overlay>
                                <div class="select-wrap">
                                    <div
                                        style="
                                            padding: 16px 26px;
                                            box-shadow:
                                                0 1px 2px -2px rgba(0, 0, 0, 0.16),
                                                0 3px 6px 0 rgba(0, 0, 0, 0.12),
                                                0 5px 12px 4px rgba(0, 0, 0, 0.09);
                                        "
                                        class="title"
                                        >共{{ youhuiquanList?.lengths }}张,可用{{
                                            youhuiquanList?.CouponUserData.length
                                        }}张,已选择{{ selectCheckes.length }}张</div
                                    >
                                    <div
                                        class="check-list"
                                        v-if="youhuiquanList?.CouponUserData.length"
                                    >
                                        <div
                                            class="check-item"
                                            v-for="item in youhuiquanList?.CouponUserData"
                                            :key="item"
                                        >
                                            <a-checkbox
                                                :checked="getActives(item)"
                                                @change="changeGetYouhuiquan(item)"
                                                >{{ youhuiquanDetails(item) }}</a-checkbox
                                            >
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </a-dropdown>
                    </div>
                </div>
                <div class="right">
                    <div class="item">
                        <span>{{ goodsList.length }} 件商品总额:</span>
                        <span>{{ goodsAllPrice }}</span>
                    </div>
                    <div class="item">
                        <span>运费:</span>
                        <span>{{ kuaidiPriceAll }}</span>
                    </div>
                    <div class="item" v-show="kuaidi">
                        <span>保价费:</span>
                        <span>{{ iptValue * news }}</span>
                    </div>
                    <div class="item">
                        <span>收藏证书:</span>
                        <span>{{ checkList.DelList.length * 20 }}</span>
                    </div>
                    <div class="item">
                        <span>优惠券:</span>
                        <span>-0.00</span>
                    </div>
                    <div class="item">
                        <span>收藏证书优惠券:</span>
                        <span>-{{ removeYouHuiQuan }}.00</span>
                    </div>
                    <div class="zong">
                        应付总额:<p class="price"
                            >￥<span>{{ allPrice }}</span></p
                        >元
                    </div>
                    <a-button type="primary" @click="submit">去付款</a-button>
                </div>
            </div>
        </div>
        <div class="footer-label">
            <img src="@/assets/img/user/jingmai/icon12.svg" alt="" />
            商城订单在用户中心“竞买”查看，未支付的订单在支付期限过后自动关闭，藏品证书在未付状态下申请，且部分藏品(包括商城)不提供申请收藏证书。
        </div>
        <!-- 订单相关的 -->
        <a-modal v-model:open="open" :title="formState.title" :footer="null">
            <a-form
                labelAlign="left"
                :model="formState"
                name="basicsss"
                :label-col="{ span: 7 }"
                :wrapper-col="{ span: 17 }"
                autocomplete="off"
                @finish="handleFinish"
                @finishFailed="handleFinishFailed"
            >
                <a-form-item
                    :rules="[{ required: true, message: '姓名不能为空' }]"
                    label="姓名"
                    name="username"
                >
                    <a-input v-model:value.trim="formState.username" />
                </a-form-item>
                <a-form-item
                    :rules="[{ required: true, message: '国家不能为空' }]"
                    label="所在地区"
                >
                    <a-select
                        :field-names="{
                            label: 'AreaName',
                            value: 'AreaName'
                        }"
                        v-model:value="formState.region"
                        show-search
                        :options="countList"
                        @change="handleChange"
                    ></a-select>
                </a-form-item>
                <a-form-item
                    :rules="[{ required: true, message: '省市不能为空' }]"
                    label="省市地址"
                    name="date1"
                >
                    <a-cascader
                        :field-names="{
                            label: 'AreaName',
                            value: 'AreaName',
                            children: 'ChildList'
                        }"
                        @change="addId"
                        expand-trigger="hover"
                        v-model:value="formState.date1"
                        :options="formState.statusList"
                    />
                </a-form-item>
                <a-form-item
                    :rules="[{ required: true, message: '详细地址不能为空' }]"
                    label="详细地址"
                    name="text"
                >
                    <a-textarea
                        v-model:value="formState.text"
                        :auto-size="{ minRows: 2, maxRows: 5 }"
                    />
                </a-form-item>
                <a-form-item
                    :rules="[
                        { required: true, message: '邮编不能为空' },
                        { pattern: /^[0-9]{6}$/, message: '邮编格式不正确' }
                    ]"
                    label="邮编"
                    name="bankNmae"
                >
                    <a-input v-model:value="formState.bankNmae" />
                </a-form-item>
                <a-form-item
                    :rules="[
                        { required: true, message: '收货手机号不能为空' },
                        { pattern: /^[0-9]{11}$/, message: '手机号格式不正确' }
                    ]"
                    label="收货手机号"
                    name="tel"
                >
                    <a-input v-model:value="formState.tel" />
                </a-form-item>
                <a-form-item
                    :rules="[{ required: true, message: '联系电话不能为空' }]"
                    label="联系电话"
                    name="phone"
                >
                    <a-input v-model:value="formState.phone" />
                </a-form-item>
                <a-form-item :wrapper-col="{ offset: 7, span: 17 }">
                    <a-button type="primary" html-type="submit">保存</a-button>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:open="removeOpen" title="删除地址" @cancel="closeModel" @ok="postAPi">
        </a-modal>
        <a-modal width="1000px" v-model:open="showAddress" :footer="null">
            <a-table :pagination="false" :columns="shippingColumns" :data-source="addressList">
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'Address'">
                        <div class="address">
                            <span> {{ record.State + record.Sheng }}</span>
                            <span>&nbsp;&nbsp;</span>
                            <span> {{ record.Shi }}</span>
                        </div>
                    </template>
                    <template v-if="column.key === 'AddressDetails'">
                        <div class="address-details">
                            <span> {{ record.Address }}</span>
                        </div>
                    </template>
                    <template v-if="column.key === 'Tel'">
                        <div class="tel">
                            <span v-if="record.Tel"> {{ record.Tel }}</span>
                            <span v-else> {{ record.Phone }}</span>
                        </div>
                    </template>
                    <template v-if="column.key === 'status'">
                        <div class="status">
                            <span @click="changeAddress(record)">选择</span>
                        </div>
                    </template>
                </template>
            </a-table>
        </a-modal>
    </div>
</template>

<style scoped lang="less">
.address-wrap {
    padding: 20px 16px;
    background-color: #fff;
    .footer-label {
        display: flex;
        gap: 5px;
        font-size: 14px;
        color: #b11503;
        img {
            height: 12px;
        }
    }
    .title-nav {
        .flex-row;
        justify-content: space-between;
        padding: 18px 50px;
        background-color: #eef3f8;
        h5 {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            font-size: 20px;
            div {
                font-weight: 400;
                font-size: 16px;
            }
        }
        p {
            color: #1677ff;
            padding-bottom: 1px;
            border-bottom: 1px solid #1677ff;
            cursor: pointer;
            &:hover {
                color: #b11503;
                border-color: #b11503;
            }
        }
    }

    .center {
        padding: 34px 50px;
        .address-default {
            .flex-row;
            justify-content: space-between;
            .address {
                .flex-row;
                gap: 10px;
            }
            .change {
                .flex-row;
                gap: 5px;
                color: #1677ff;
                p {
                    padding-bottom: 1px;
                    border-bottom: 1px solid #1677ff;
                    cursor: pointer;
                }
            }
        }
        .check-one {
            .flex-row;
            gap: 20px;
            width: 148px;
            border-radius: 10px;
            padding: 14px 20px;
            margin-top: 20px;
            border: 1px solid #d9d9d9;
            cursor: pointer;
            &:hover {
                color: #9a0000;
            }
            img {
                width: 12px;
            }
        }
        .select {
            display: flex;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 10px;
            margin-bottom: 30px;
            .radio {
                margin-left: 10px;
            }
            p {
                width: 70%;
                line-height: 24px;
                span {
                    color: #1677ff;
                    border-bottom: 1px solid #1677ff;
                    padding-bottom: 1px;
                    cursor: pointer;
                }
            }
        }
        .kuai-di {
            margin-bottom: 30px;
            .select {
                margin-bottom: 20px;
            }
        }
        .list {
            margin-left: 35px;
            .flex-row;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 100px;
            .item {
                display: flex;
                align-items: center;
                width: 184px;
                text-align: center;
                cursor: pointer;
                .wuliu {
                    width: 100%;
                    padding: 15px 20px;
                    background-color: #eef3f8;
                    &:hover,
                    &.active {
                        background: url('@img/user/jingmai/wlbg.jpg');
                        background-size: 100% 100%;
                    }
                }
            }
        }
        .ant-select {
            margin-top: 15px;
            text-align: center;
            font-size: 14px;
        }
        // .check-one {
        //     width: 141px;
        //     position: relative;
        //     margin-left: 38px;
        //     img {
        //         position: absolute;
        //         top: 52%;
        //         right: 17%;
        //         width: 12px;
        //     }
        // }
        :deep(.ant-select-selector) {
            .flex-row;
            border-radius: 10px;
            line-height: 45px;
            height: 45px;
            input {
                height: 33px;
            }
        }
        :deep(.ant-select-arrow) {
            display: none;
        }
        .details {
            .flex-row;
            align-items: flex-start;
            justify-content: space-between;
            .left {
                .top-title {
                    .flex-row;
                    cursor: pointer;
                    p {
                        margin-bottom: 1px;
                    }
                }
                .title {
                    padding: 10px 16px;
                    border: 1px solid #eef3f8;
                }
            }
            .right {
                .item {
                    .flex-row;
                    justify-content: space-between;
                    margin: 15px 0;
                }
                .zong {
                    .flex-row;
                    align-items: flex-end;
                    gap: 5px;
                    margin-top: 40px;
                    font-size: 20px;
                    line-height: 30px;
                    .price {
                        color: #9a0000;
                        span {
                            font-size: 30px;
                        }
                    }
                }
                .ant-btn {
                    margin-top: 30px;
                }
            }
        }
    }
    .price-list {
        .flex-row;
        justify-content: flex-start;
        gap: 10px;
    }
    .goods-info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        gap: 3px;
        width: 100%;
        &:hover {
            color: #9a0000;
            cursor: pointer;
        }
        img {
            height: 40px;
        }
        span {
            flex: 1;
        }
    }
    :deep(.ant-table-wrapper .ant-table-thead > tr > th) {
        background-color: #fff;
        padding: 20px 16px;
        font-weight: 400;
    }
}
.status {
    cursor: pointer;
    &:hover {
        color: #9a0000;
    }
}
.check-list {
    background-color: #fff;
    padding-bottom: 10px;
    height: 180px;
    overflow: auto;
    /* 添加以下代码 */

    .check-item {
        padding: 8px 26px;
        background-color: #fff;
        cursor: pointer;
        &:hover {
            background-color: #eef3f8;
        }
    }
}
/* 修改滚动条的宽度和颜色 */
::-webkit-scrollbar {
    width: 6px; /* 设置滚动条宽度 */
    background-color: #fff; /* 设置滚动条背景色 */
}

/* 修改滚动条滑块的颜色 */
::-webkit-scrollbar-thumb {
    background-color: #999; /* 设置滚动条滑块颜色 */
}
</style>
