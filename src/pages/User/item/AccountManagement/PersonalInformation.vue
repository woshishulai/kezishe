<script setup>
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { isAddActive } from '@/hooks/user';
import { getUserInfoApi } from '@/request/api';
import { useUserInfo } from '@/store/store';
import { info } from '@/hooks/antd/message';
import { changeUserInfo, changeUserCallInfo } from '@/request/api';
import { changeUserInfoCallRules } from './rules';
import { handleFinishFailed } from '@/utils/form/rules.js';
import Upload from './item/Upload.vue';
const userInfoRules = {
    RealName: [
        {
            required: true,
            message: '请输入您的姓名',
            trigger: 'change'
        },
        {
            min: 1,
            max: 20,
            message: '用户名长度1-20位',
            trigger: 'change'
        }
    ],
    Gender: [
        {
            required: true,
            message: '请选择您的性别',
            trigger: 'change'
        },
        {
            validator: (_, value) => {
                if (value == 0) {
                    return Promise.reject(new Error('请选择您的性别'));
                }
                return Promise.resolve();
            },
            trigger: 'change'
        }
    ],
    Birthday: [
        {
            required: true,
            message: '请完善您的出生日期',
            trigger: 'change'
        }
    ],
    IdType: [
        {
            required: true,
            message: '请选择您的身份类型',
            trigger: 'change'
        }
    ],
    IdImage: [
        {
            required: true,
            message: '请上传您的证件',
            trigger: 'change'
        }
    ],
    IdNumbers: [
        {
            validator: (_, value) => {
                if (formState.value.IdType == 1) {
                    // 身份证格式校验
                    const idCardPattern =
                        /^[1-9]\d{5}(18|19|20)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/;
                    if (!idCardPattern.test(value)) {
                        return Promise.reject('身份证格式不正确');
                    }
                } else if (formState.value.IdType == 2) {
                    // 护照可以不输入
                    if (value) {
                        const passportPattern = /^[a-zA-Z0-9]{5,17}$/;
                        if (!passportPattern.test(value)) {
                            return Promise.reject('护照格式不正确');
                        }
                    }
                } else if (formState.value.IdType == 3) {
                    // 台胞证格式校验
                    const taiwanCardPattern = /^[a-zA-Z][0-9]{9}$/;
                    if (!taiwanCardPattern.test(value)) {
                        return Promise.reject('台胞证格式不正确');
                    }
                } else if (formState.value.IdType == 4) {
                    // 不校验
                }
                return Promise.resolve();
            },
            trigger: 'change'
        }
    ]
};
const user = useUserInfo();
const countdown = ref(0);
const emailCountDown = ref(0);
const formRef = ref();
const formState = ref({
    RealName: '',
    Gender: '0',
    Birthday: '',
    IdType: '',
    IdNumbers: '',
    IdImage: ''
});
const formState1 = ref({
    Mobile: user.userInfo.Mobile || '',
    code: '',
    email: user.userInfo.Email || '',
    emailCode: '',
    TelPhone: user.userInfo.TelPhone || ''
});
const fetchuserInfo = async () => {
    try {
        let res = await getUserInfoApi();
        if (res.Tag == 1) {
            if (res.Data.IdType == 0) {
                res.Data.IdType = '';
            }
            user.changeUserInfo(res.Data);
            formState.value = Object.assign({}, user.userInfo);
        } else {
            info('error', res.Message);
        }
    } catch (error) {}
};
onMounted(() => {
    fetchuserInfo();
});
const getPhone = () => {
    const phoneRegex = /^1[3456789]\d{9}$/;
    const phoneNumber = formState1.value.TelPhone;
    const isPhoneValid = phoneRegex.test(phoneNumber);
    if (!isPhoneValid) {
        info('error', '请输入正确的手机号');
    }
    return isPhoneValid;
};
const getCode = () => {
    const isPhoneValid = getPhone();
    if (isPhoneValid) {
        countdown.value = 60;
        info('success', '验证码发送成功请输入验证码');
        const interval = setInterval(() => {
            countdown.value > 0 ? countdown.value-- : clearInterval(interval);
        }, 1000);
    }
};
const getEmailPhone = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const email = formState1.value.email; // 假设您从某个表单状态中获取邮箱地址
    const isEmailValid = emailRegex.test(email);
    if (!isEmailValid) {
        info('error', '请输入正确的邮箱地址');
    }
    return isEmailValid;
};

const getEmailCode = () => {
    const isEmailValid = getEmailPhone();
    if (isEmailValid) {
        emailCountDown.value = 60;
        info('success', '验证码发送成功，请输入验证码');
        const interval = setInterval(() => {
            emailCountDown.value > 0 ? emailCountDown.value-- : clearInterval(interval);
        }, 1000);
    }
};
const getFiles = (file) => {
    formState.value.IdImage = file;
};

const handleFinish = async () => {
    let params = {
        Id: user.userInfo.UserId,
        RealName: formState.value.RealName,
        Gender: formState.value.Gender,
        Birthday: formState.value.Birthday,
        IdType: formState.value.IdType,
        IdNumbers: formState.value.IdNumbers,
        IdImage: formState.value.IdImage
    };
    try {
        let res = await changeUserInfo(params);
        let status;
        if (res.Tag == 1) {
            fetchuserInfo();
            status = 'success';
        } else {
            status = 'error';
        }
        info(status, res.Message);
    } catch (error) {
        info('error', error);
    }
};
const onFinish = async () => {
    let params = {
        Id: user.userInfo.UserId,
        Mobile: formState1.value.Mobile,
        Email: formState1.value.email,
        TelPhone: formState1.value.TelPhone
    };
    try {
        let res = await changeUserCallInfo(params);
        let status;
        if (res.Tag == 1) {
            status = 'success';
            fetchuserInfo();
        } else {
            status = 'error';
        }
        info(status, res.Message);
    } catch (error) {}
};
</script>

<template>
    <div class="personal-information">
        <div class="card-box">
            <div class="title">个人信息</div>
            <div class="user-id">
                <li>客户编号: {{ user.userInfo.UserId }}</li>
                <li>账户: {{ user.userInfo?.UserStatus == 1 ? '正常' : '禁用' }}</li>
                <li>注册: {{ user.userInfo?.RegTime }}</li>
            </div>
        </div>
        <div class="card-box">
            <div class="title son-title"> 基本信息(通过) </div>
            <div class="form-wrap">
                <a-form
                    labelAlign="left"
                    ref="formRef"
                    style="width: 771px; position: relative"
                    :rules="userInfoRules"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed"
                    :model="formState"
                    :label-col="{ span: 3 }"
                    :hide-required-mark="true"
                    autocomplete="off"
                >
                    <a-form-item label="姓名" has-feedback name="RealName">
                        <a-input v-model:value.trim="formState.RealName" style="width: 240px" />
                    </a-form-item>
                    <a-form-item
                        label="性别"
                        name="Gender"
                        style="position: absolute; top: 0px; left: 380px; width: 450px"
                    >
                        <a-radio-group v-model:value.trim="formState.Gender">
                            <a-radio value="1">男</a-radio>
                            <a-radio value="2">女</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="出生年月" name="Birthday">
                        <a-date-picker
                            value-format="YYYY-MM-DD"
                            v-model:value="formState.Birthday"
                            style="width: 240px"
                        />
                    </a-form-item>
                    <a-form-item label="证件类型" has-feedback name="IdType" class="card-cate">
                        <a-select
                            v-model:value.trim="formState.IdType"
                            placeholder="请选择证件类型"
                            style="width: 240px"
                        >
                            <a-select-option value="1">身份证</a-select-option>
                            <a-select-option value="2">护照</a-select-option>
                            <a-select-option value="3">台胞证</a-select-option>
                            <a-select-option value="4">其他</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="证件号码" name="IdNumbers">
                        <a-input
                            style="width: 240px"
                            :class="
                                isAddActive(user.userTranslate.userProfileInfos, '身份证件')
                                    ? ''
                                    : 'active'
                            "
                            v-model:value.trim="formState.IdNumbers"
                        />
                    </a-form-item>
                    <a-form-item label="证件照片" class="upload-wrap" name="IdImage">
                        <Upload
                            :userImageUrl="formState.IdImage"
                            title="照片"
                            @getFiles="getFiles"
                        ></Upload>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ offset: 3 }">
                        <a-button
                            style="width: 205px; height: 45px; padding: 0"
                            html-type="submit"
                            type="primary"
                            >保存基本信息</a-button
                        >
                    </a-form-item>
                </a-form>
            </div>
            <div class="footer-fix"></div>
        </div>
        <div class="card-box">
            <div class="title">联系信息</div>
            <div class="form-wrap">
                <a-form
                    labelAlign="left"
                    ref="formRef"
                    style="width: 771px"
                    @finish="onFinish"
                    @finishFailed="handleFinishFailed"
                    :rules="changeUserInfoCallRules"
                    :model="formState1"
                    :label-col="{ span: 3 }"
                    autocomplete="off"
                    :hide-required-mark="true"
                >
                    <a-form-item hide-required-mark="false" label="手机" name="Mobile">
                        <div class="flex">
                            <a-input
                                style="width: 240px"
                                v-model:value="formState1.TelPhone"
                                :class="
                                    isAddActive(user.userTranslate.userProfileInfos, '手机号码')
                                        ? ''
                                        : 'active'
                                "
                            />
                            <a-button
                                v-if="!isAddActive(user.userTranslate.userProfileInfos, '手机号码')"
                                @click="getCode"
                                style="
                                    background-color: #e1e7ec;
                                    color: #333;
                                    border-radius: 5px;
                                    height: 43px;
                                    padding: 0 4ch;
                                    line-height: 43px;
                                "
                                :disabled="countdown > 0"
                            >
                                <span v-if="countdown === 0">验证码</span>
                                <span v-else>{{ countdown }}</span></a-button
                            >
                        </div>
                    </a-form-item>
                    <a-form-item
                        v-if="user.userTranslate.verifyPhone !== '1'"
                        hide-required-mark="false"
                        label="验证码"
                        name="code"
                    >
                        <div class="flex">
                            <a-input v-model:value.trim="formState1.code" style="width: 240px" />
                        </div>
                    </a-form-item>
                    <a-form-item label="邮箱" name="email">
                        <div class="flex">
                            <a-input
                                style="width: 240px"
                                :class="
                                    user.userTranslate.userProfileInfos?.[2].IsAuth ? 'active' : ''
                                "
                                v-model:value.trim="formState1.email"
                            />
                            <a-button
                                @click="getEmailCode"
                                style="
                                    background-color: #e1e7ec;
                                    color: #333;
                                    border-radius: 5px;
                                    height: 43px;
                                    padding: 0 13px;
                                    line-height: 43px;
                                "
                                :disabled="emailCountDown > 0"
                            >
                                <span v-if="emailCountDown === 0">发送验证邮件</span>
                                <span v-else>{{ emailCountDown }}</span></a-button
                            >
                        </div>
                    </a-form-item>
                    <a-form-item hide-required-mark="false" label="验证码" name="emailCode">
                        <a-input style="width: 240px" v-model:value.trim="formState1.emailCode" />
                    </a-form-item>
                    <a-form-item label="电话" name="Mobile">
                        <a-input style="width: 240px" v-model:value.trim="formState1.Mobile" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ offset: 3 }">
                        <a-button
                            style="width: 205px; height: 45px; padding: 0"
                            html-type="submit"
                            type="primary"
                            >保存联系信息</a-button
                        >
                    </a-form-item>
                </a-form>
            </div>
            <div class="footer-fix"></div>
        </div>
        <!-- <div class="card-box">
            <div class="title">收藏信息</div>
            <div class="cate-list">
                <div class="cate-info">
                    <span>设置收藏类别:</span>
                    <a-select v-model:value="formState.region" style="width: 356px" placeholder="">
                        <a-select-option value="cardId">身份证</a-select-option>
                        <a-select-option value="driverLicense">驾驶证</a-select-option>
                    </a-select>
                </div>
                <div class="add-like">
                    <a-input v-model:value="value" placeholder="" />
                    <a-button>添加</a-button>
                </div>
                <div class="like-info">
                    <span>邮票钱币 &nbsp;X</span>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style scoped lang="less">
.personal-information {
    .flex-col;
    align-items: flex-start;
    gap: 30px;
    :deep(.ant-btn-primary) {
        background-color: #a4b0bc;
        border-radius: 5px;
        margin-top: 30px;
    }

    .card-box {
        position: relative;
        .son-title {
            font-size: 16px;
        }
        .footer-fix {
            position: absolute;
            bottom: 0;
            left: 0;
            height: 100px;
            right: 0;
            background-color: #f1f5f8;
            z-index: 1;
            border-radius: 0 0 10px 10px;
        }
        .user-id {
            padding: 40px;
            .flex-row;
            justify-content: flex-start;
            gap: 90px;
            font-size: 14px;
        }

        .form-wrap {
            width: 1000px;
            padding: 30px 0 0 32px;
            position: relative;
            z-index: 3;
            .ant-input {
                border-width: 1px;
                border-style: solid;
                border-radius: 4px;
                height: 43px;
                background-color: rgb(255, 255, 255);
            }
        }

        .cate-list {
            padding: 50px;
            .flex-col;
            align-items: flex-start;
            gap: 20px;

            .cate-info {
                .flex-row;

                span {
                    display: block;
                    width: 150px;
                }
            }

            .add-like {
                padding-left: 150px;
                .flex-row;
                gap: 20px;
            }

            .like-info {
                padding-left: 150px;
                .flex-row;

                span {
                    background-color: #f1f1f1;
                    .flex-row;
                    width: 130px;
                    padding: 20px;
                    cursor: pointer;
                }
            }
        }
        .flex {
            .flex-row;
            justify-content: flex-start;
            gap: 10px;
        }
    }
}
</style>
