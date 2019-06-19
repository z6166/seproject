<template>
    <div class="Userinfo" style="text-align: center">
        <div v-for="(value,key) in info[parseInt($cookies.get('acc_type'))]" :key="key">
            <div v-if="!edit[key]">
                <p style="display:inline;">{{infotoname[key]}}:</p>
                <p style="display:inline;font-weight: bolder">{{value}}</p>
                <a-icon @click="editname(key,value)" type="edit"/>
            </div>
            <div v-else>
                <a-input v-model="newcontent" @pressEnter="newnameevent(key)" style="width: 20%">
                    <a-icon slot="suffix" @click="newnameevent(key)" style="color: green" type="check" />
                    <a-icon slot="suffix" @click="cancelnewname" style="color: red;" type="close" />
                </a-input>
            </div>
            <br/>
        </div>
        <br/>
        <div v-if="flag">
            <a-button type="primary" @click="change">确认修改</a-button>
            <br/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Userinfo",
        data() {
            return {
                flag:false,
                newcontent:"",
                userid: null,
                username: null,
                face: null,
                money: null,
                edit: {},
                actions: [
                    "raise",
                    "suspend",
                    "reapply",
                    "cancel",
                ],
                info: [
                    {
                        "name": "",
                        "ID": "",
                        "home_address": "",
                        "job": "",
                        "education_background": "",
                        "company_address": "",
                        "phone": "",
                        "agent_ID": ""
                    },
                    {
                        "corporate_number": "",
                        "license_number": "",
                        "representative_ID": "",
                        "representative_name": "",
                        "representative_phone": "",
                        "representative_address": "",
                        "operator_name": "",
                        "operator_ID": "",
                        "operator_phone": "",
                        "operator_address": ""
                    }
                ],
                infotoname:
                    {
                        "date": "创建日期",
                        "name": "姓名",
                        "ID": "身份证",
                        "home_address": "家庭地址",
                        "job": "职业",
                        "education_background": "教育背景",
                        "company_address": "公司地址",
                        "phone": "电话",
                        "agent_ID": "授权人ID",
                        "corporate_number": "",
                        "license_number": "",
                        "representative_ID": "",
                        "representative_name": "",
                        "representative_phone": "",
                        "representative_address": "",
                        "operator_name": "",
                        "operator_ID": "",
                        "operator_phone": "",
                        "operator_address": ""
                    }
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            newnameevent(id){
                this.$set(this.info[parseInt(this.$cookies.get("acc_type"))],id,this.newcontent);
                this.cancelnewname();
            },
            cancelnewname(){
                for(var key in this.edit){
                    this.$set(this.edit,key,false);
                }
            },
            editname(id,value) {
                this.flag = true;
                this.newcontent = value;
                for(var key in this.edit){
                    console.log(key);
                    this.$set(this.edit,key,false);
                }
                this.$set(this.edit,id,true);
            },
            action(id) {
                let data = new FormData();
                data.append("user_id", parseInt(this.$cookies.get("user_id")));
                data.append("request", this.actions[id]);
                this.$axios
                    .post("", data)
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.$message.success("操作成功！");
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        }
                    )
            },
            change(){
                let data = new FormData();
                data.append("request", "change");
                data.append("user_id", parseInt(this.$cookies.get("user_id")));
                data.append("info",JSON.stringify(this.info[parseInt(this.$cookies.get("acc_type"))]));
                this.$axios
                    .post("/api/change_account_info", data)
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.$message.success("修改成功！");
                                this.init();
                                this.flag = false;
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        }
                    )
            },
            init() {
                /*
                ,{
                        params:{
                            "name":this.$cookies.get("name"),
                            "user_id":this.$cookies.get("user_id")
                        }
                    }
                 */

                //"/api/get_account_info"
                let data = new FormData();
                data.append("user_id", parseInt(this.$cookies.get("user_id")));
                this.$axios
                    .post(this.baseurl + "/api/get_account_info",data)
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                for (var key in response.data.data.info) {
                                    this.info[parseInt(this.$cookies.get("acc_type"))][key] = response.data.data.info[key]
                                }
                                console.log(this.info[parseInt(this.$cookies.get("acc_type"))])
                            } else {
                                this.$message.error("获取用户信息失败!");
                            }
                        }
                    );
            }
        }
    }
</script>

<style scoped>
</style>
