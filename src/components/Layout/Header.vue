<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useUserInfo } from '@/store/store';
import { defaultUserNickName, getUserNikeNameApi } from '@/request/api';
import HeaderInput from './item/HeaderInput.vue';
import Tabbar from './item/Tabbar.vue';
import { removeUserInfo } from '@/hooks/user/outLoading';
import { CaretDownOutlined } from '@ant-design/icons-vue';
const router = useRouter();
const selector = ref('登录');
const nikeNameList = ref([]);
const user = useUserInfo();

onMounted(async () => {
    try {
        if (user.userInfo.UserId) {
            let res = await getUserNikeNameApi();
            if (res.Tag == 1) {
                nikeNameList.value = res.Data;
                let query = nikeNameList.value.find((item) => item.Default == 1);
                if (query) {
                    selector.value = user.userNickName.NickName;
                    user.changeUserNickName(query);
                } else {
                    user.changeUserNickName(nikeNameList.value[0]);
                    selector.value = user.userNickName.NickName;
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
});
//修改默认的用户名
const changeUserName = async (item) => {
    if (item.Default) {
        return;
    }
    let res = await defaultUserNickName(item.Id);
    if (res.Tag === 1) {
        const oldDefaultNickName = user.userNickName.Id;
        let index = nikeNameList.value.findIndex((item) => item.Id == oldDefaultNickName);
        nikeNameList.value[index].Default = 0;
        item.Default = 1;
        user.changeUserNickName(item);
        selector.value = user.userNickName.NickName;
    }
};
watchEffect(async () => {
    selector.value = user.userNickName.NickName;
});
const showHelp = () => {
    router.push('/help');
};
// const removeUserInfo = () => {
//     user.removeUserInfo();
//     user.removeUserTranslate();
//     user.removeUserNickName();
//     router.push('/login');
// };
</script>

<template>
    <div class="header-wrap">
        <div class="header-user-wrap">
            <div class="con-main-wrap">
                <div class="welcome-login">
                    <h5>您好，欢迎来到中邮网</h5>
                    <a-divider type="vertical" />
                    <div class="login" v-if="!user.userInfo.ApiToken">
                        <span class="active" @click="router.push('/login')">登录</span>
                        {{ user.userInfo.ApiToken }}
                        <a-divider type="vertical" />
                        <span @click="router.push('/register')">注册</span>
                    </div>
                    <div v-else class="user-name">{{ user.userInfo.UserName }}</div>
                </div>
                <div class="user-info">
                    <span v-if="!user.userInfo.ApiToken" @click="router.push('/login')" value="登录"
                        >登录</span
                    >
                    <a-dropdown v-else>
                        <span @click="router.push('/user')"
                            >{{ selector }}
                            <CaretDownOutlined />
                        </span>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item
                                    v-for="(item, index) in nikeNameList"
                                    :key="item.NickName"
                                    :value="item.NickName"
                                    @click="changeUserName(item)"
                                >
                                    <span>{{ item.NickName }}</span>
                                </a-menu-item>
                                <a-menu-item @click="removeUserInfo()">
                                    <span>退出</span>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                    <a-divider type="vertical" />
                    <li>
                        购物车 <span class="active"> {{ 0 }}</span> 件
                    </li>
                    <a-divider type="vertical" />
                    <li @click="showHelp" class="help"> 帮助中心 </li>
                    <a-divider type="vertical" />
                    <li>免费咨询热线: 4000-888-0888</li>
                </div>
            </div>
        </div>
        <div class="header-search-wrap">
            <div class="con-main-wrap">
                <img
                    class="logo"
                    @click="router.push('/')"
                    src="@/assets/img/global/logo.png"
                    alt=""
                />
                <div class="reserach">
                    <HeaderInput />
                </div>
                <img class="code" src="@/assets/img/global/code.png" alt="" />
            </div>
        </div>
        <Tabbar />
    </div>
</template>
<style scoped lang="less">
.header-wrap {
    background-color: #fff;
    font-size: 14px;

    .header-user-wrap {
        border-bottom: 1px solid #ebebeb;

        .con-main-wrap {
            .flex-row;
            justify-content: space-between;
            padding: 6px 12px;
            font-weight: 500;

            .welcome-login {
                .flex-row;
                gap: 16px;

                h5 {
                    font-weight: 600;
                }

                .login {
                    .flex-row;
                    gap: 10px;

                    span {
                        cursor: pointer;
                    }
                }
            }

            .user-info {
                .flex-row;
                gap: 16px;

                span {
                    padding: 10px 0;
                    cursor: pointer;
                    &:hover {
                        color: #9a0000;
                    }
                }
                .help {
                    cursor: pointer;
                    &:hover {
                        color: #9a0000;
                    }
                }

                :deep(.ant-select-selection-item) {
                    font-weight: 600;
                    font-size: 16px;
                }
            }

            .active {
                color: #ff0005;
            }
        }
    }

    .header-search-wrap {
        .code {
            width: 94px;
            height: 94px;
        }
        .con-main-wrap {
            .flex-row;
            justify-content: space-between;
            gap: 250px;
            padding: 20px 0;
            .logo {
                cursor: pointer;
                height: 82px;
            }
            .reserach {
                flex: 1;
            }
        }
    }
}
</style>
<style>
.header-wrap .anticon svg {
    color: rgb(0, 0, 0);
    height: 11px;
    width: 18px;
}
.header-wrap .ant-divider-vertical {
    top: 0;
    background-color: #a2887d;
}
</style>
