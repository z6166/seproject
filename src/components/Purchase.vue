<template>
    <div class="Purchase">
        <a-form
                :form="form"
                @submit="handleSubmit"
        >
            <a-form-item
                    label="股票代码"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
            >
                <a-input v-model="stock_id"/>
            </a-form-item>
            <a-form-item
                    label="购入股数"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
            >
                <a-input v-model="number"/>
            </a-form-item>
            <a-form-item
                    label="单价"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
            >
                <a-input v-model="price"/>
            </a-form-item>
            <a-form-item
                    :wrapper-col="{ span: 12, offset: 5 }"
            >
                <a-button @click="handleSubmit">确定</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    export default {
        name: "Purchase",
        props: ["stockid"],
        data() {
            return {
                stock_id: this.stockid,
                number: null,
                price: null,
                form: this.$form.createForm(this),
            }
        },
        watch: {
            stockid() {
                this.stock_id = this.stockid;
            }
        },
        methods: {
            handleSubmit() {
                console.log(this.stock_id);
            }

        }
    }
</script>

<style scoped>
</style>
