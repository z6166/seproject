<template>
    <div class="Changefundpassword">
        <a-modal
                :visible="visible"
                title='修改资金账户密码'
                @cancel="() => { $emit('cancel') }"
                :footer="null"
        >

            <a-form
                    id="components-form-demo-normal-login"
                    layout="vertical"
                    :form="form"
                    @submit="handleSubmit"
                    class="login-form"
            >

                <a-form-item
                        :validate-status="oldpasswordError() ? 'error' : ''"
                        :help="oldpasswordError() || ''"
                >
                    <a-input
                            v-decorator="[
          'oldpassword',
          {rules: [{ required: true, message: 'Please input your old Password!',min:6,max:20 }]}
        ]"
                            type="password"
                            placeholder="请输入旧密码..."
                    >
                        <a-icon
                                slot="prefix"
                                type="lock"
                                style="color:rgba(0,0,0,.25)"
                        />
                    </a-input>
                </a-form-item>

                <a-form-item
                        :validate-status="newpasswordError() ? 'error' : ''"
                        :help="newpasswordError() || ''"
                >
                    <a-input
                            v-decorator="[
          'newpassword',
          {rules: [{ required: true, message: 'Please input your new Password!',min:6,max:20 }]}
        ]"
                            type="password"
                            placeholder="请输入新密码..."
                    >
                        <a-icon
                                slot="prefix"
                                type="lock"
                                style="color:rgba(0,0,0,.25)"
                        />
                    </a-input>
                </a-form-item>
                <a-form-item
                        :validate-status="againnewpasswordError() ? 'error' : ''"
                        :help="againnewpasswordError() || ''"
                >
                    <a-input
                            v-decorator="[
          'againnewpassword',
          {rules: [{ required: true, message: 'Please reinput your new Password!',min:6,max:20 }]}
        ]"
                            type="password"
                            placeholder="请再输入一次新密码..."
                    >
                        <a-icon
                                slot="prefix"
                                type="lock"
                                style="color:rgba(0,0,0,.25)"
                        />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-button
                            type="primary"
                            html-type="submit"
                            class="login-form-button"
                    >
                        提交
                    </a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>

    export default {
        name: "Changefundpassword",
        props: ['visible',"id"],
        data() {
            return {
                form: this.$form.createForm(this),
            };
        },
        methods: {
            oldpasswordError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('oldpassword') && getFieldError('oldpassword');
            },
            newpasswordError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('newpassword') && getFieldError('newpassword');
            },
            againnewpasswordError() {
                const {getFieldError, isFieldTouched} = this.form;
                return isFieldTouched('againnewpassword') && getFieldError('againnewpassword');
            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                        if(values.newpassword !== values.againnewpassword){
                            this.$message.error("两次输入的密码必须相同!");
                            return
                        }
                        let data = new FormData();
                        data.append("account_id", this.id);
                        data.append("ori_pass", values.oldpassword);
                        data.append("new_pass", values.newpassword);
                        console.log(data.toString());
                        this.$axios
                            .post("",data)
                            .then(
                                response => {
                                    if (response.data.code === 0) {
                                        this.$message.success("修改成功！");
                                    } else {
                                        this.$message.error(response.data.msg)
                                    }
                                }
                            )
                    } else {
                        this.$message.error("未知错误")
                    }
                });
            },
        }
    }
</script>

<style scoped>
    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }
    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>
