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
                    :validate-status="stock_idError() ? 'error' : ''"
                    :help="stock_idError() || ''"
            >
                <a-input
                        v-decorator="['stock_id',
          {rules: [{ required: true, message: '请正确输入股票id'}]}]"
                />
            </a-form-item>
            <a-form-item
                    label="购入股数"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                    :validate-status="numberError() ? 'error' : ''"
                    :help="numberError() || ''"
            >
                <a-input
                        v-decorator="['number',
          {rules: [{ required: true, message: '请正确输入购入数量'}]}]"
                />
            </a-form-item>
            <a-form-item
                    label="单价"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                    :validate-status="priceError() ? 'error' : ''"
                    :help="priceError() || ''"
            >
                <a-input v-decorator="['price',
          {rules: [{ required: true, message: '请正确输入单价'}]}]"
                />
            </a-form-item>
            <a-form-item
                    label="资金账户"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                    :validate-status="card_idError() ? 'error' : ''"
                    :help="card_idError() || ''"
            >
                <a-select @focus="init" notFoundContent="未找到资金账户"
                          v-decorator="['card_id',
          {rules: [{ required: true}]}]"
                >
                    <a-select-option v-for="(item,index) in data" :key="index" :value="item.id">
                        {{item.id}} 当前剩余资金:{{item.available}}
                    </a-select-option>
                </a-select>
            </a-form-item>


            <a-form-item
                    label="资金账户密码"
                    :label-col="{ span: 5 }"
                    :wrapper-col="{ span: 12 }"
                    :validate-status="passwordError() ? 'error' : ''"
                    :help="passwordError() || ''"
            >
                <a-input v-decorator="['password',
          {rules: [{ required: true, message: '请正确输入资金账户密码'}]}]"
                />
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
                data: [],
                form: this.$form.createForm(this),
            }
        },
        mounted(){
            this.form.setFieldsValue({
                stock_id:this.$props.stockid,
            })
        },
        methods: {
            stock_idError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('stock_id') && getFieldError('stock_id');
            },
            numberError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('number') && getFieldError('number');
            },
            priceError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('price') && getFieldError('price');
            },
            card_idError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('card_id') && getFieldError('card_id');
            },
            passwordError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('password') && getFieldError('password');
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        let data = new FormData();
                        data.append("card_id", values.card_id);
                        data.append("stock_id", values.stock_id);
                        data.append("stock_price", values.price);
                        data.append("buy_amount", values.number);
                        data.append("password",values.password);
                        this.$axios
                            .post(this.baseurl + "/api/buy", data)
                            .then(
                                response => {
                                    if (response.data.code === 0) {
                                        this.$message.success("购买成功！");
                                        this.$router.push('/');
                                    } else {
                                        this.$message.error(response.data.msg)
                                    }
                                }
                            )
                    }
                });
            },
            init() {
                this.$axios
                    .get(this.baseurl + "/api/get_all_capital",{
                        params:{
                            "user_id":this.$cookies.get("user_id")
                        }
                    })
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.data = response.data.data;
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        }
                    )
            },

        }
    }
</script>

<style scoped>
</style>
