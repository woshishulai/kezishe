<script setup>
import { useLoading } from '@/store/store';
import { onMounted } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
const locale = zhCN;
const Loading = useLoading();
onMounted(() => {
    cx();
    window.addEventListener('resize', function () {
        cx();
    });
    function cx() {
        var Wth = document.documentElement.clientWidth;
        var app = document.querySelector('#app');
        if (Wth < 1400) {
            if (navigator.userAgent.indexOf('Firefox') != -1) {
                //判断当前浏览器是否是火狐浏览器
                // app.style.width = "1450px";
                // document.documentElement.style.transform =
                //   "scale(" + Wth / 1450 + ")";
                // // document.body.style.overflow = "hidden";
                // document.documentElement.style.transformOrigin = "left top 0px";
            } else {
                document.documentElement.style.zoom = (Wth / 1450) * 100 + '%';
            }
        } else {
            // app.style.width = '100%';
            document.documentElement.style.zoom = '100%';
        }
    }
});
</script>
<template>
    <div class="app">
        <a-config-provider
            :locale="locale"
            :theme="{
                token: {
                    //primary属性为的背景色
                    colorPrimary: '#9a0000',
                    //默认的统一颜色
                    // colorBgContainer: '#f4f4f4',
                    //默认边框色
                    // colorBorder: '#9a0000',
                    //默认圆角
                    borderRadius: 0,
                    //选中的背景颜色 比如select
                    controlItemBgActive: '#9a0000',
                    // //控制组件项在鼠标悬浮时的背景颜色。
                    controlItemBgHover: '#a61f1b',
                    //输入框提示文本
                    colorTextPlaceholder: '#000',
                    //组件高度 比如输入框 按钮等
                    controlHeight: 50,
                    //输入框提示文本
                    colorTextPlaceholder: '#000',
                    //被选中的
                    controlItemBgActive: '#fff',
                    //边框粗细
                    // lineWidth:'2'
                    //用于配置动画效果，为 `false` 时则关闭动画
                    // motion: true
                    // 字体
                    fontSize: 16,
                    fontFamily: '微软雅黑'
                    // colorIcon: '#9a0000'
                    // colorIconHover: '#9a0000'
                    // colorBgBase: '#9a0000',
                    // colorPrimaryActive: '#007306'
                    // 分割线 比如menu菜单的边
                    // colorSplit: '#333',
                    // 输入框和文本警用颜色 比如select展开下面selectitem的时候 文字颜色
                    // colorTextQuaternary: '#007306'
                    //禁用的字体颜色
                    // colorTextDisabled: '#007306'.
                    //带背景颜色的
                    // colorTextLightSolid: '#007306'

                    //比如下拉框展开时候的字体颜色
                    // colorTextPlaceholder: '#007306',
                }
            }"
        >
            <a-spin :spinning="Loading.spinning" tip="Loading...">
                <RouterView key="app"></RouterView>
            </a-spin>
        </a-config-provider>
    </div>
</template>

<style scoped lang="less">
.app {
    max-width: 2200px;
    margin: 0 auto;
}
</style>
