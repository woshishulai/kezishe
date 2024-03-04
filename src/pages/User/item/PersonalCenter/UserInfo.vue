<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getImageUrl } from '@/utils';
import { infoList, infoDataSource, infoColumns } from '../../data';
import { useUserInfo } from '@/store/store';
import { getUserDetailsApi } from '@/request/api';
const user = useUserInfo();
const router = useRouter();
onMounted(async () => {
    try {
        let res = await getUserDetailsApi();
        let verifyPhone = res.Data.userProfileInfos[1].IsFillIn;
        user.changeUserTranslate(res.Data);
        user.changeUserTranslate({ verifyPhone: verifyPhone });
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
});
const showGrand = () => {
    router.push('/user/userinfo/show-grand');
};
</script>

<template>
    <div class="user-info">
        <div class="header-account">
            <div class="top-info">
                <img :src="getImageUrl('jingmai/list/list2.png')" alt="" />
                <div class="element-info">
                    <div class="element-top">
                        <h5>{{ user.userInfo.RealName }}</h5>
                        <p>客户编号: {{ user.userInfo.UserId }}</p>
                    </div>
                    <p class="show-grade" @click="showGrand">{{ '五钻三星' }}</p>
                    <div class="code">
                        <p>账户安全等级</p>
                        <div class="progress">
                            <a-progress
                                strokeColor="#e33d31"
                                :percent="user.userTranslate.ProfilePercent"
                                size="small"
                            />
                        </div>
                        <p class="nav-details" @click="router.push('/user/account-management')">
                            完善资料
                        </p>
                    </div>
                </div>
            </div>
            <div class="user-balance">
                <div
                    class="balance-item"
                    :style="{ backgroundImage: `url(${getImageUrl(item.img)})` }"
                    v-for="item in infoList"
                    :key="item.img"
                >
                    <p class="title"
                        >{{ item.title }}
                        <span v-if="item.icon">{{ item.icon }}</span>
                    </p>
                    <p class="number">
                        {{ item.num }}
                        <span>{{ item.danwei }}</span>
                    </p>
                    <div class="btns">
                        <button class="btn1" @click="router.push(item.router)">{{
                            item.btn1
                        }}</button>
                        <button class="btn2" @click="router.push(item.router2)" v-if="item.btn2">{{
                            item.btn2
                        }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-box">
            <div class="title"
                ><span>我的订单</span>
                <span class="move" @click="router.push('/user/quick-sell')">查看更多</span>
            </div>
            <div class="get-goods">
                <span
                    >竞买中 ： <span>{{ 1 }}</span></span
                >
                <span
                    >已得标 ： <span class="active">{{ 3 }}</span></span
                >
                <span
                    >未得标 ： <span class="active">{{ 1 }}</span></span
                >
                <span
                    >未支付 ： <span>{{ 0 }}</span></span
                >
                <span
                    >不支付 ： <span>{{ 0 }}</span></span
                >
                <span
                    >未发货 ： <span>{{ 0 }}</span></span
                >
                <span
                    >已发货 ： <span>{{ 0 }}</span></span
                >
            </div>
        </div>
        <div class="card-box">
            <div class="title"
                ><span>我的委托</span>
                <span class="move" @click="router.push('/user/my-entrustment/')">查看更多</span>
            </div>
            <a-table :pagination="false" :dataSource="infoDataSource" :columns="infoColumns">
                <template #status="{ record }">
                    <span>
                        <span
                            :class="record.status == 0 || record.status == '已成交' ? '' : 'active'"
                        >
                            {{ record.status }}</span
                        >
                    </span>
                </template>
                <template #operate="{ record }">
                    <span class="btn-details">
                        {{ record.operate }}
                    </span>
                </template>
            </a-table>
        </div>
    </div>
</template>

<style scoped lang="less">
.user-info {
    .header-account {
        background-color: #fff;
        padding: 40px 30px 26px;
        border-radius: 16px;

        .top-info {
            .flex-row;
            justify-content: flex-start;
            align-items: flex-start;
            gap: 40px;

            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }

            .element-info {
                .flex-col;
                align-items: flex-start;
                gap: 20px;
                padding-top: 10px;

                .element-top {
                    .flex-row;
                    gap: 40px;

                    h5 {
                        font-size: 28px;
                        font-weight: 700;
                    }
                }

                p {
                    color: #94979a;
                    font-size: 18px;
                    &.show-grade {
                        cursor: pointer;
                    }
                }

                .code {
                    display: flex;
                    align-items: center;
                    gap: 10px;

                    //进度条
                    .progress {
                        width: 120px;

                        .ant-progress-line {
                            margin-bottom: 2px;
                        }
                    }

                    .nav-details {
                        color: #4083e7;
                        border-bottom: 1px solid #4083e7;
                        cursor: pointer;
                    }
                }
            }
        }

        .user-balance {
            .flex-row;
            gap: 20px;
            margin-top: 30px;

            .balance-item {
                flex: 1;
                .flex-col;
                align-items: flex-start;
                gap: 20px;
                padding: 30px;
                background-size: 100% 100%;

                .title {
                    .flex-row;
                    justify-content: flex-start;
                    color: #a1a1a1;
                    gap: 10px;

                    span {
                        .flex-row;
                        width: 16px;
                        height: 16px;
                        font-size: 14px;
                        border-radius: 50%;
                        background-color: #686868;
                        color: #fff;
                    }
                }

                .number {
                    color: #9a0000;
                    font-weight: 700;
                    font-size: 30px;
                    // font-family: "Arial", sans-serif;

                    span {
                        font-size: 16px;
                        font-weight: 400;
                    }
                }

                .btns {
                    .flex-row;
                    justify-content: flex-start;
                    gap: 20px;

                    button {
                        cursor: pointer;
                        border: none;
                        padding: 8px 26px;
                        border-radius: 6px;
                        color: #fff;
                    }

                    .btn1 {
                        background-color: #9a0000;
                    }

                    .btn2 {
                        background-color: #85909b;
                    }
                }
            }
        }
    }

    .card-box {
        padding: 0 30px;
        margin-top: 30px;
        background-color: #fff;

        .title {
            .flex-row;
            justify-content: space-between;
        }

        .get-goods {
            .flex-row;
            justify-content: space-between;
            padding: 50px 40px;
            font-size: 18px;
        }

        .active {
            color: #9a0000;
        }

        .btn-details {
            cursor: pointer;
        }
    }
}
</style>
