<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getMenuListAPi, submitWeituoAPi } from '@/request/weituo/index';
import { handleFinishFailed } from '@/utils/form/rules.js';
import Upload from '@/pages/User/item/AccountManagement/item/Upload.vue';
import { useUserInfo } from '@/store/store';
const user = useUserInfo();
const open = ref(false);
const openTitle = ref('请先登录在填写申请单');
const route = useRoute();
const formState = ref({
    username: '测试的',
    phone: 17634448534,
    introduction: '这里是测试的',
    remember: true
});
const list = [
    {
        icon: 'weituo/xianshang/1.png',
        rightNav: '',
        p1: '咨询委托',
        p2: '事宜'
    },
    {
        icon: 'weituo/xianshang/2.png',
        rightNav: '',
        p1: '填写委托',
        p2: '清单'
    },
    {
        icon: 'weituo/xianshang/3.png',
        rightNav: '',
        p1: '邮寄藏品',
        p2: ''
    },
    {
        icon: 'weituo/xianshang/4.png',
        rightNav: '',
        p1: '接受藏品',
        p2: ''
    },
    {
        icon: 'weituo/xianshang/5.png',
        rightNav: '',
        p1: '藏品审核',
        p2: '鉴定'
    },
    {
        icon: 'weituo/xianshang/6.png',
        rightNav: '',
        p1: '委托出售',
        p2: '明细确认'
    },
    {
        icon: 'weituo/xianshang/7.png',
        rightNav: '',
        p1: '预展开售',
        p2: ''
    },
    {
        icon: 'weituo/xianshang/8.png',
        rightNav: '',
        p1: '成交结算',
        p2: ''
    }
];
onMounted(async () => {
    if (!route.query.id) {
        return;
    }
    let params = {
        id: route.query.id,
        coltype: 'single'
    };
    let res = await getMenuListAPi(params);
    document.title = res.Data.seoData.seoTitle;
    console.log(res);
});
const handleOk = (e) => {
    console.log(e);
    open.value = false;
};

const onFinish = async (values) => {
    if (!formState.value.remember) {
        openTitle.value = '请同意服务协议';
        open.value = true;
        return;
    }
    if (user.userInfo.UserId) {
        const query = {
            UserName: formState.value.username,
            UserTel: formState.value.phone,
            Content: formState.value.introduction,
            UserFile: '测试'
        };
        console.log(query);
        let res = await submitWeituoAPi(query);
        console.log(res.Data);
    } else {
        openTitle.value = '请先登录在填写申请单';
        open.value = true;
    }
};
</script>

<template>
    <div class="xianshang">
        <div class="top-wrap">
            <div class="top-title">
                <p class="icon">
                    <span class="duan"></span>
                    <span class="chang"></span>
                </p>
                <h5>委托流程</h5>
                <p class="icon">
                    <span class="chang"></span>
                    <span class="duan"></span>
                </p>
            </div>
            <p class="info">轻松几步快速办理，委托出售免费估值</p>
            <div class="img-list">
                <div class="img-item" v-for="(item, index) in list" :key="index">
                    <div class="zero">
                        <img :src="getImageUrl(item.icon)" alt="" />
                        <img
                            v-if="index != 7"
                            class="wai"
                            :src="getImageUrl('weituo/xianshang/nav.jpg')"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div class="liu-cheng">
                <div class="xian1"></div>
                <div class="zero"> 1 </div>
                <div class="xian"></div>
                <div class="zero"> 2 </div>
                <div class="xian"></div>
                <div class="zero"> 3 </div>
                <div class="xian"></div>
                <div class="zero"> 4 </div>
                <div class="xian"></div>
                <div class="zero"> 5 </div>
                <div class="xian"></div>
                <div class="zero"> 6 </div>
                <div class="xian"></div>
                <div class="zero"> 7 </div>
                <div class="xian"></div>
                <div class="zero"> 8 </div>
                <div class="xian1"></div>
            </div>
            <div class="label-list">
                <div class="label-item" v-for="(item, index) in list" :key="index">
                    <p>{{ item.p1 }}</p>
                    <p>{{ item.p2 }}</p>
                </div>
            </div>
        </div>
        <div class="cen">
            <div class="title">
                在线委托申请单
                <div class="right-down">
                    <img :src="getImageUrl('weituo/xianshang1.jpg')" alt="" />
                    下载委托模版
                </div>
            </div>
            <a-modal v-model:open="open" :title="openTitle" @ok="handleOk"> </a-modal>
            <div class="cen-box">
                <a-form
                    :model="formState"
                    name="basic"
                    :label-col="{ span: 3 }"
                    :wrapper-col="{ span: 10 }"
                    autocomplete="off"
                    @finish="onFinish"
                    @finishFailed="handleFinishFailed"
                >
                    <a-form-item
                        label="姓名"
                        name="username"
                        :rules="[{ required: true, message: '姓名不可为空' }]"
                    >
                        <a-input v-model:value.trim="formState.username" />
                    </a-form-item>

                    <a-form-item
                        label="手机"
                        name="phone"
                        :rules="[{ required: true, message: '请输入您的手机号码' }]"
                    >
                        <a-input v-model:value.trim="formState.phone" />
                    </a-form-item>
                    <a-form-item name="introduction" label="内容">
                        <a-textarea v-model:value="formState.introduction" />
                    </a-form-item>
                    <a-form-item label="上传文档">
                        <Upload :fileModule="4"></Upload>
                    </a-form-item>
                    <a-form-item name="remember" :wrapper-col="{ offset: 3, span: 10 }">
                        <a-checkbox v-model:checked="formState.remember">
                            <div class="ok">
                                同意 <span class="red-span"> 《服务协议》 </span>
                            </div>
                        </a-checkbox>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ offset: 3, span: 10 }">
                        <a-button type="primary" html-type="submit"> 提交</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.xianshang {
    .top-wrap {
        background-color: #fff;
        padding: 40px 60px;
        .top-title {
            .flex-row;
            gap: 20px;
            h5 {
                font-size: 20px;
                color: #9a0000;
            }
            .icon {
                .flex-col;
                align-items: flex-end;
                gap: 10px;

                &:nth-child(3) {
                    align-items: flex-start;
                }
                .duan {
                    width: 30px;
                    height: 5px;
                    background-color: #9a0000;
                }
                .chang {
                    width: 60px;
                    height: 5px;
                    background-color: #9a0000;
                }
            }
        }
        .info {
            text-align: center;
            font-size: 18px;
            margin: 20px 0;
        }
        .img-list {
            .flex-row;
            gap: 50px;
            .img-item {
                flex: 1;
                position: relative;
                background: url('@/assets/img/weituo/xianshang/bjhui.png');
                padding: 12px;
                background-size: 100% 100%;
                .zero {
                    .flex-row;
                    width: 100%;
                    aspect-ratio: 1;
                    border-radius: 50%;
                    border: 10px solid #bd736b;
                    .wai {
                        position: absolute;
                        right: -40px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
        }
        .liu-cheng {
            margin: 10px 0;
            .flex-row;
            .xian1 {
                width: 30px;
                height: 5px;
                background-color: #9a0000;
            }
            .xian {
                width: 113px;
                height: 5px;
                background-color: #9a0000;
            }
            .zero {
                .flex-row;
                color: #fff;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: #9a0000;
            }
        }
        .label-list {
            .flex-row;
            gap: 50px;
            margin-top: 20px;
            .label-item {
                flex: 1%;
                text-align: center;
                p {
                    height: 20px;
                }
            }
        }
    }
    .cen {
        margin-top: 20px;
        background-color: #fff;
        .title {
            .flex-row;
            justify-content: space-between;
            .right-down {
                .flex-row;
                gap: 20px;
                padding: 12px 20px;
                background-color: #f0f0f0;
                color: #bf8484;
                border-radius: 8px;
                cursor: pointer;
                img {
                    width: 18px;
                }
            }
        }
        .ok {
            margin-top: 3px;
            .red-span {
                color: #a94242;
            }
        }
    }
}
</style>
