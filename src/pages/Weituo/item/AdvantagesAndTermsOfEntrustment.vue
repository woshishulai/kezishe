<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getMenuListAPi } from '@/request/weituo/index';
const route = useRoute();
onMounted(async () => {
    let params = {
        id: route.query.id,
        coltype: 'single'
    };
    let res = await getMenuListAPi(params);
    document.title = res.Data.seoData.seoTitle;
    console.log(res);
});

const list = [
    {
        title: '在线委托竞买优势：',
        labels: [
            {
                label: ' 1．10万全球高净值用户；  '
            },
            {
                label: ' 2．年交易60万项，成交率98%；'
            },
            {
                label: ' 3．低收费高回报；'
            },
            {
                label: '4．短至10天回款；'
            },
            {
                label: '5．服务网点全覆盖；'
            },
            {
                label: '6．免费估价'
            }
        ]
    },
    {
        title: '委托需知',
        labels: [
            {
                label: '1、委托方承诺其对所委托藏品拥有绝对的所有权或享有合法的处分权，对该藏品的竞买不会侵害任何第三方的合法权益，亦不违反相关法律、法规的规定。'
            },
            {
                label: '2、委托方须尽其所知，就该藏品的来源和瑕疵向壳子社进行了全面、详尽的披露和说明，不存在任何隐瞒或虚构之处。如委托人违反上述保证，致使竞买人蒙受损失时，委托人应负责赔偿竞买人因此所遭受的一切损失，并承担因此而发生的一切费用和支出。'
            },
            {
                label: '3、壳子社认为出现下列情况之一时，有权在竞买未结标之前任何时间撤回任何藏品：1）对藏品的归属或真实性有怀疑；2）对委托方所作的说明或保证的准确性有怀疑；3）存在任何其他合理或合法的下架原因。'
            },
            {
                label: '4、壳子社对收藏品的图片制作，藏品描述，竞买条件及交易时间安排等事宜拥有完全的决定权。'
            },
            {
                label: '5、委托方对其所委托的藏品在竞买开始前可要求壳子社更改价格或将藏品下架，但需以书面形式告知壳子社，并需承担所产生的费用。壳子社有权对委托人要求调整后价格不合理的藏品下架。'
            }
        ]
    }
];
</script>

<template>
    <div class="advantage">
        <div class="title"> 委托优势与条款 </div>
        <div class="cen-box">
            <div class="element-wrap" v-for="(item, index) in list" :key="index">
                <div class="element-title">
                    {{ item.title }}
                </div>
                <p class="element-label" v-for="(i, iIndex) in item.labels" :key="iIndex">
                    {{ i.label }}
                </p>
            </div>
            <p class="label">
                目前中邮评级鉴定中心只接受市场价值在100元人民而以上的邮票、邮政用品和信封，包括成套邮票、单枚邮票、小型张、邮政用品和实寄封。中
                邮评级鉴定中心有权拒绝一切我们认为不适合评级的藏品。
            </p>
            <p class="label"> 对于送评的邮品，无论出分还是不出分，均要按收费标准收取鉴定费用。 </p>
            <p class="label">
                目前征集的可以评级的业务范围包括:清代邮票、民国邮票、解放区邮票、纪特邮票、“文”字邮票、编号邮票、JT邮票、编年邮票、普航改
                欠军包邮票、小型张、单枚邮票、组合邮票、错变体票等，还有邮政用品和实寄封。
            </p>
            <p class="label">
                对于尺寸过大，不方便封装的邮品，我们会出具由专家组精心制作的鉴定证书，
            </p>
        </div>
    </div>
</template>

<style scoped lang="less">
.advantage {
    background-color: #fff;

    .cen-box {
        .element-wrap {
            color: #313131;
            .element-title {
                margin: 20px 0;
                font-size: 16px;
            }
        }
        p {
            margin: 10px 0;
            line-height: 30px;
        }
        .label {
            text-indent: 2em;
        }
    }
}
</style>
