<template>
    <div class="RegisterPersonal">
        <a-modal
                :visible="visible"
                title='注册'
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


                <a-form-item label="姓名"
                        :validate-status="NameError() ? 'error' : ''"
                        :help="NameError() || ''"
                >
                    <a-input
                            v-decorator="[
          'name',
          {rules: [{ required: true,message: '请正确输入姓名!',min:1,max:10 }]}
        ]"
                    >
                        <a-icon
                                slot="prefix"
                                type="user"
                        />
                    </a-input>
                </a-form-item>

                <a-form-item label="身份证号码">
                    <a-input v-decorator="['ID']">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="家庭住址">
                    <a-input v-decorator="['home_address']">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="职业">
                    <a-input v-decorator="['job']">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="学历">
                    <a-input v-decorator="['education_background']">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="工作单位">
                    <a-input v-decorator="['company_address']">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="联系电话">
                    <a-input v-decorator="['phone']">
                        <a-icon slot="prefix" type="user"/>
                    </a-input>
                </a-form-item>

                <a-form-item label="授权人">
                    <a-input v-decorator="['agent_ID']">
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
        name: "RegisterPersonal",
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
                    date:"",
                    name:"",
                    ID:"",
                    home_address:"",
                    job:"",
                    education_background:"",
                    company_address:"",
                    phone:"",
                    agent_ID:"",
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
                        data.append("acc_type", "0");
                        this.info.date = values.date;
                        this.info.name = values.name;
                        this.info.ID = values.ID;
                        this.info.home_address = values.home_address;
                        this.info.job = values.job;
                        this.info.education_background = values.education_background;
                        this.info.company_address = values.company_address;
                        this.info.phone = values.phone;
                        this.info.agent_ID = values.agent_ID;
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
