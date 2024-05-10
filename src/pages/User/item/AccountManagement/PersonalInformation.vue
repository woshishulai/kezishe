<script setup>
import { useRouter, useRoute } from 'vue-router';
import { reactive, ref, onMounted } from 'vue';
import { isAddActive } from '@/hooks/user';
import { getUserInfoApi } from '@/request/api';
import { getPhone } from '@/utils/form/getCode';
import { useUserInfo } from '@/store/store';
import { info } from '@/hooks/antd/message';
import { changeUserInfo, changeUserCallInfo } from '@/request/api';
import { userInfoRules, changeUserInfoCallRules } from './rules';
import { handleFinishFailed } from '@/utils/form/rules.js';
import Upload from './item/Upload.vue';
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
onMounted(async () => {
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
    } catch (error) {
        info('error', error);
    }
});
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
        } else {
            status = 'error';
        }
        info(status, res.Message);
    } catch (error) {
        info('error', error);
    }
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
            <div class="title"> 基本信息(通过) </div>
            <div class="form-wrap">
                <a-form
                    labelAlign="left"
                    ref="formRef"
                    :rules="userInfoRules"
                    @finish="handleFinish"
                    @finishFailed="handleFinishFailed"
                    :model="formState"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 19 }"
                    :hide-required-mark="true"
                    autocomplete="off"
                >
                    <a-form-item label="姓名" has-feedback name="RealName">
                        <a-input v-model:value.trim="formState.RealName" />
                    </a-form-item>
                    <a-form-item label="性别" name="gender">
                        <a-radio-group v-model:value.trim="formState.Gender">
                            <a-radio value="1">男</a-radio>
                            <a-radio value="2">女</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="出生年月" name="date1">
                        <a-date-picker
                            value-format="YYYY-MM-DD"
                            v-model:value="formState.Birthday"
                            style="width: 100%"
                        />
                    </a-form-item>
                    <a-form-item label="证件类型" has-feedback name="region" class="card-cate">
                        <a-select
                            v-model:value.trim="formState.IdType"
                            placeholder="请选择证件类型"
                        >
                            <a-select-option value="1">身份证</a-select-option>
                            <a-select-option value="2">护照</a-select-option>
                            <a-select-option value="3">台胞证</a-select-option>
                            <a-select-option value="4">其他</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="证件号码" name="IdNumbers">
                        <a-input
                            :class="
                                isAddActive(user.userTranslate.userProfileInfos, '身份证件')
                                    ? ''
                                    : 'active'
                            "
                            v-model:value.trim="formState.IdNumbers"
                        />
                    </a-form-item>
                    <a-form-item label="证件照片" class="upload-wrap">
                        <Upload @getFiles="getFiles"></Upload>
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 19, offset: 5 }">
                        <a-button html-type="submit" type="primary">保存基本信息</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
        <div class="card-box">
            <div class="title">联系信息</div>
            <div class="form-wrap">
                <a-form
                    labelAlign="left"
                    ref="formRef"
                    @finish="onFinish"
                    @finishFailed="handleFinishFailed"
                    :rules="changeUserInfoCallRules"
                    :model="formState1"
                    :label-col="{ span: 6 }"
                    :wrapper-col="{ span: 19 }"
                    autocomplete="off"
                    :hide-required-mark="true"
                >
                    <a-form-item hide-required-mark="false" label="手机" name="Mobile">
                        <div class="flex">
                            <a-input
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
                                :disabled="countdown > 0"
                            >
                                <span v-if="countdown === 0">获取验证码</span>
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
                            <a-input v-model:value.trim="formState1.code" />
                        </div>
                    </a-form-item>
                    <a-form-item label="邮箱" name="email">
                        <div class="flex">
                            <a-input
                                :class="
                                    user.userTranslate.userProfileInfos?.[2].IsAuth ? 'active' : ''
                                "
                                v-model:value.trim="formState1.email"
                            />
                            <a-button @click="getEmailCode" :disabled="emailCountDown > 0">
                                <span v-if="emailCountDown === 0">获取验证码</span>
                                <span v-else>{{ emailCountDown }}</span></a-button
                            >
                        </div>
                    </a-form-item>
                    <a-form-item hide-required-mark="false" label="邮箱验证码" name="emailCode">
                        <a-input v-model:value.trim="formState1.emailCode" />
                    </a-form-item>
                    <a-form-item label="电话" name="Mobile">
                        <a-input v-model:value.trim="formState1.Mobile" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 19, offset: 6 }">
                        <a-button html-type="submit" type="primary">保存基本信息</a-button>
                    </a-form-item>
                </a-form>
            </div>
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

    .card-box {
        .user-id {
            padding: 40px;
            .flex-row;
            justify-content: flex-start;
            gap: 90px;
        }

        .form-wrap {
            width: 500px;
            padding: 50px 0 30px 50px;

            .ant-radio-group {
                .flex-row;
                justify-content: flex-start;
                height: 52px;
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
            gap: 10px;
        }
    }
}
</style>
