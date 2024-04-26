<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
import { getUserLevel } from '@/request/api';
import { info } from '@/hooks/antd/message';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
const fetchData = ref([
    {
        image: 'user/zuanshi.png'
    },
    {
        image: 'user/wjx.png'
    }
]);
onMounted(async () => {
    try {
        let res = await getUserLevel();
        if (res.Tag == 1) {
            fetchData.value[0].Title = res.Data.JingMai.Title; //等级秒速s
            fetchData.value[0].Level = res.Data.JingMai.Level; //等级
            fetchData.value[0].GrowthValue = res.Data.JingMai.GrowthValue; //成长值
            fetchData.value[0].ProtectionValue = res.Data.JingMai.ProtectionValue; //保级
            fetchData.value[0].PromotionValue = res.Data.JingMai.PromotionValue; //晋级
            fetchData.value[0].EffectiveDate = res.Data.JingMai.EffectiveDate; //有效期
            fetchData.value[1].Title = res.Data.WeiTuo.Title; //等级秒速
            fetchData.value[1].Level = res.Data.WeiTuo.Level; //等级
            fetchData.value[1].GrowthValue = res.Data.WeiTuo.GrowthValue; //成长值
            fetchData.value[1].ProtectionValue = res.Data.WeiTuo.ProtectionValue; //保级
            fetchData.value[1].PromotionValue = res.Data.WeiTuo.PromotionValue; //晋级
            fetchData.value[1].EffectiveDate = res.Data.WeiTuo.EffectiveDate; //有效期

            info('success', res.Message);
        }
    } catch (error) {
        info('error', error);
    }
});
</script>

<template>
    <div class="show-grand">
        <div
            class="card-box"
            v-for="item in fetchData"
            :key="item.Title"
            :style="{ backgroundImage: 'url(' + getImageUrl(item.image) + ')' }"
            :class="item.Title == '委托' ? 'active' : ''"
        >
            <div class="shang">
                <h5>{{ item.Title }}</h5>
                <div class="icons" v-if="item.Level != 0">
                    <img
                        v-for="i in item.Level"
                        :key="i"
                        :src="
                            getImageUrl(item.Title === '委托' ? 'user/xing.jpg' : 'user/zuan.jpg')
                        "
                        alt=""
                    />
                </div>
                <div class="info" v-if="item.Level != 0"> {{ item.Level }} </div>
            </div>
            <div class="text">
                <p>成长值: {{ item.GrowthValue }}</p>
                <p>保级还需: {{ item.ProtectionValue }}</p>
                <p>晋级还需: {{ item.PromotionValue }}</p>
            </div>
            <div class="time"> 会员有效期至 {{ item.EffectiveDate }} </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.show-grand {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 80px 60px;
    background-color: #fff;
    .card-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 471px;
        height: 253px;
        background-size: 100% 100%;
        padding: 32px 60px 35px;
        cursor: pointer;
        &.active {
            color: #634020;
        }
        h5 {
            font-size: 22px;
        }
        .icons {
            margin: 7px 0;
            img {
                width: 20px;
                height: 17px;
            }
        }
        .info {
            font-size: 16px;
        }
        .text {
            p {
                margin: 7px 0;
            }
        }
        .time {
        }
    }
}
</style>
