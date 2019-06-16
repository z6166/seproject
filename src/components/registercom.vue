<template>
    <div class="RegisterCom">
        <a-modal
                :visible="visible"
                title='企业注册'
                @cancel="() => { $emit('cancel') }"
                :footer="null"
        >

            <a-form
                    layout="vertical"
                    :form="form"
                    @submit="handleSubmit"
            >
                <a-form-item label="用户名"
                             :validate-status="userNameError() ? 'error' : ''"
                             :help="userNameError() || ''"
                >
                    <a-input
                            v-decorator="['username',{rules: [{ required: true, message: '请正确输入用户名!',min:6,max:20 }]}]"
                            placeholder="用户名"
                    >
                        <a-icon
                                slot="prefix"
                                type="user"
                        />
                    </a-input>
                </a-form-item>
                <a-form-item label="密码"
                             :validate-status="passwordError() ? 'error' : ''"
                             :help="passwordError() || ''"
                >
                    <a-input
                            v-decorator="['password',{rules: [{ required: true, message: '请正确输入密码!',min:6,max:20 }]}]"
                            type="password"
                            placeholder="密码"
                    >
                        <a-icon
                                slot="prefix"
                                type="lock"
                        />
                    </a-input>
                </a-form-item>


                <a-form-item label="企业电话"
                >
                    <a-input
                            v-decorator="[
          'corporate_number',
          {rules: [{ required: true,message: '请正确输入电话!',min:3,max:15 }]}
        ]"
                    >
                        <a-icon
                                slot="prefix"
                                type="user"
                        />
                    </a-input>
                </a-form-item>

                <a-form-item label="营业执照号码">
                    <a-input v-decorator="['license_number',{rules: [{ required: true}]}]">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="法人身份证号">
                    <a-input v-decorator="['representative_ID',{rules: [{ required: true}]}]">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="法人姓名">
                    <a-input v-decorator="['representative_name',{rules: [{ required: true}]}]">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="法人联系电话">
                    <a-input v-decorator="['representative_phone',{rules: [{ required: true}]}]">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="法人联系地址">
                    <a-input v-decorator="['representative_address',{rules: [{ required: true}]}]">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="授权人姓名">
                    <a-input v-decorator="['operator_name']">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="授权人电话">
                    <a-input v-decorator="['operator_phone']">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="授权人地址">
                    <a-input v-decorator="['operator_address']">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>



                <a-form-item>
                    <a-button
                            type="primary"
                            html-type="submit"
                            :disabled="hasErrors(form.getFieldsError())"
                    >
                        注册
                    </a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>

    function hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }



    export default {
        name: "RegisterCom",
        props: ['visible'],
        beforeCreate() {
            this.form = this.$form.createForm(this);
            this.form.hideRequiredMark = true
        },
        data() {
            return {
                hasErrors,
                form: this.$form.createForm(this),
                info:{
                    corporate_number:"",
                    license_number:"",
                    representative_ID:"",
                    representative_name:"",
                    representative_phone:"",
                    representative_address:"",
                    operator_name:"",
                    operator_ID:"",
                    operator_phone:"",
                    operator_address:"",
                }
            };
        },
        mounted() {
            this.$nextTick(() => {
                // To disabled submit button at the beginning.
                this.form.validateFields();
            });
        },
        methods: {
            NameError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('name') && getFieldError('name');
            },
            userNameError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('username') && getFieldError('username');
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
                        data.append("request", "register");
                        data.append("name", values.username);
                        data.append("password", values.password);
                        data.append("acc_type", "1");
                        this.info.corporate_number = values.corporate_number;
                        this.info.license_number = values.license_number;
                        this.info.representative_ID = values.representative_ID;
                        this.info.representative_name = values.representative_name;
                        this.info.representative_phone = values.representative_phone;
                        this.info.representative_address = values.representative_address;
                        this.info.operator_name = values.operator_name;
                        this.info.operator_ID = values.operator_ID;
                        this.info.operator_phone = values.operator_phone;
                        this.info.operator_address = values.operator_address;
                        data.append("info",JSON.stringify(this.info));
                        this.$axios
                            .post("", data)
                            .then(
                                response => {
                                    if (response.data.code === 0) {
                                        this.$message.success("注册成功！");
                                        this.$emit("cancel");
                                        this.$router.push('/');
                                    } else {
                                        this.$message.error(response.data.msg)
                                    }
                                }
                            )
                    }
                });
            },
        }
    }
</script>

<style scoped>
</style>
