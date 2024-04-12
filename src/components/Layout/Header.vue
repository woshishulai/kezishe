<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { navList } from '../data';
import { useUserInfo } from '@/store/store';
import { getUserNikeNameApi } from '@/request/api';
import { DownOutlined } from '@ant-design/icons-vue';
import HeaderInput from './item/HeaderInput.vue';
import Tabbar from './item/Tabbar.vue';
const router = useRouter();
const selector = ref('登录');
const nikeNameList = ref([]);
const user = useUserInfo();
onMounted(async () => {
    try {
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
        } else {
            console.log(res);
        }
    } catch (error) {
        console.log(error);
    }
});
const changeUserName = (item) => {
    user.changeUserNickName(item);
};
watchEffect(async () => {
    selector.value = user.userNickName.NickName;
});
const removeUserInfo = () => {
    user.removeUserInfo();
    user.removeUserTranslate();
    user.removeUserNickName();
    router.push('/login');
};
</script>

<template>
    <div class="header-wrap">
        <div class="header-user-wrap">
            <div class="con-main-wrap">
                <div class="welcome-login">
                    <h5>您好，欢迎来到壳子社</h5>
                    <a-divider type="vertical" style="background-color: #a2887d" />
                    <div class="login" v-if="!user.userInfo.ApiToken">
                        <span class="active" @click="router.push('/login')">登录</span>
                        {{ user.userInfo.ApiToken }}
                        <a-divider type="vertical" style="background-color: #a2887d" />
                        <span @click="router.push('/register')">注册</span>
                    </div>
                    <div v-else class="user-name">{{ user.userInfo.UserName }}</div>
                </div>
                <div class="user-info">
                    <span v-if="!user.userInfo.ApiToken" @click="router.push('/login')" value="登录"
                        >登录</span
                    >
                    <a-dropdown v-else :arrow="true">
                        <span @click="router.push('/user')">{{ selector }}</span>
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
                    <a-divider type="vertical" style="background-color: #a2887d" />
                    <li>
                        购物车 <span class="active"> {{ 0 }}</span> 件
                    </li>
                    <a-divider type="vertical" style="background-color: #a2887d" />
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

    .header-user-wrap {
        border-bottom: 1px solid #ebebeb;

        .con-main-wrap {
            .flex-row;
            justify-content: space-between;
            padding: 12px;
            font-weight: 500;

            .welcome-login {
                .flex-row;
                gap: 30px;

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
                gap: 20px;
                span {
                    padding: 10px 0;
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
        .con-main-wrap {
            .flex-row;
            justify-content: space-between;
            gap: 250px;
            padding: 20px 0;
            .logo {
                cursor: pointer;
            }
            .reserach {
                flex: 1;
            }
        }
    }
}
</style>
