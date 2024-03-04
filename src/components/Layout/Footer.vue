<script setup>
import { cateList, footerNavList, footerInfoList } from '../data';
</script>

<template>
    <div class="footer-wrap">
        <div class="cate-info">
            <div class="con-main-wrap">
                <div class="cate-item" v-for="item in cateList" :key="item.text">
                    <div class="icon">{{ item.text }}</div>
                    <div class="info">
                        <h5>{{ item.title }}</h5>
                        <span>{{ item.label }}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="details-info">
            <div class="con-main-wrap">
                <div class="left-call-info">
                    <div class="item">
                        <p>全国免费热线</p>
                        <h5>4000-888-0888</h5>
                    </div>
                    <div class="item">
                        <p>售后及投诉热线</p>
                        <h5>13910046349</h5>
                    </div>
                </div>
                <div class="nav-list">
                    <div class="nav-item" v-for="item in footerNavList" :key="item.title">
                        <h5>{{ item.title }}</h5>
                        <span class="nav-item-details" v-for="i in item.list" :key="i">
                            {{ i.text }}
                        </span>
                    </div>
                </div>
                <div class="icon-logo">
                    <img src="@/assets/img/global/code.png" alt="" />
                    <p>关注我们</p>
                    <h5>可以获得更多咨询</h5>
                </div>
            </div>
        </div>
        <FooterLink bg="#eaeaea" pd-top="26px" pd-bom="16px"></FooterLink>
    </div>
</template>
<style scoped lang="less">
.footer-wrap {
    background: #f6f6f6;

    .cate-info {
        padding: 40px 0;
        border-bottom: 1px solid #ebebeb;

        .con-main-wrap {
            .flex-row;
            justify-content: space-between;

            .cate-item {
                .flex-row;
                gap: 25px;

                .icon {
                    .flex-row;
                    font-size: 25px;
                    font-weight: 600;
                    color: #962215;
                    height: 56px;
                    width: 56px;
                    background: url('@/assets/img/footer/duobianxing.jpg');
                    background-size: 100% 100%;
                }

                .info {
                    .flex-col;
                    align-items: flex-start;
                    gap: 10px;

                    h5 {
                        font-size: 22px;
                        font-weight: 600;
                    }

                    span {
                        font-size: 14px;
                        color: #949494;
                    }
                }
            }
        }
    }

    .details-info {
        padding: 40px 0;

        .con-main-wrap {
            .flex-row;
            justify-content: space-between;
            align-items: flex-start;

            .left-call-info {
                .flex-col;
                align-items: flex-start;
                gap: 30px;

                .item {
                    h5 {
                        font-size: 22px;
                        font-weight: 600;
                        cursor: pointer;
                    }

                    p {
                        margin-bottom: 10px;
                        font-size: 18px;
                        font-weight: 600;
                        color: #393939;
                    }
                }
            }

            .nav-list {
                .flex-row;
                align-items: flex-start;
                gap: 160px;

                .nav-item {
                    .flex-col;
                    gap: 10px;
                    align-items: flex-start;

                    h5 {
                        font-size: 16px;
                        font-weight: 700;
                    }

                    span {
                        cursor: pointer;
                        color: #828282;
                        font-size: 14px;
                        font-weight: 600;
                    }
                }
            }

            .icon-logo {
                .flex-col;
                gap: 10px;

                p {
                    color: #393939;
                    font-weight: 600;
                }

                h5 {
                    font-size: 16px;
                    font-weight: 600;
                }
            }
        }
    }
}
</style>
