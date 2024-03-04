<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getImageUrl } from '@/utils';
const router = useRouter();
const route = useRoute();
const props = defineProps({});
onMounted(() => {});
</script>

<template>
    <div class="shougou-details">
        <div class="title">
            <h5>北京艺术品交易中心：开放收购民间藏品，引发业界热议</h5>
            <p>时间 : 2023-07-06</p>
        </div>
        <div class="element">
            <p class="label">
                在北京的的艺术品交易市场，近日掀起了一股波澜。北京艺术品交易中心正式宣布开始发布收购民间藏品的政策，且前期不收取任
                在北京的的艺术品交易市场，近日掀起了一股波澜。北京艺术品交易中心正式宣布开始发布收购民间藏品的政策，且前期不收取任
                在北京的的艺术品交易市场，近日掀起了一股波澜。北京艺术品交易中心正式宣布开始发布收购民间藏品的政策，且前期不收取任</p
            >
            <p class="img-p">
                <img :src="getImageUrl('shougou/list1.jpg')" alt="" />
            </p>
            <p class="label">
                在北京的的艺术品交易市场，近日掀起了一股波澜。北京艺术品交易中心正式宣布开始发布收购民间藏品的政策，且前期不收取任
                在北京的的艺术品交易市场，近日掀起了一股波澜。北京艺术品交易中心正式宣布开始发布收购民间藏品的政策，且前期不收取任
                在北京的的艺术品交易市场，近日掀起了一股波澜。北京艺术品交易中心正式宣布开始发布收购民间藏品的政策，且前期不收取任</p
            >
            <p class="label">
                在这个例子中，我们将一个包含三个属性的对象传递给Object.entries()方法，并将返回的结果存储在entries变量中。entries变量现在是一个包含键值对数组的数组。
            </p>
        </div>
    </div>
</template>

<style scoped lang="less">
.shougou-details {
    flex: 1;
    background-color: #fafafa;
    padding: 0 12px;
    .title {
        text-align: center;
        padding: 50px 0 30px;
        border-bottom: 1px solid #dbdbdb;
        h5 {
            font-size: 24px;
        }
        p {
            margin-top: 30px;
            font-size: 16px;
        }
    }
    .element {
        padding: 20px 40px;
        .label {
            font-size: 18px;
            text-indent: 2em;
            line-height: 30px;
            margin: 20px 0;
            color: #2c2c2c;
        }
        .img-p {
            text-align: center;
            img {
                width: 543px;
            }
        }
    }
}
</style>
