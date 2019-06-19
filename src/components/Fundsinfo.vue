<template>
    <div>
        <Changefundpassword
                v-if="isshow[0]"
                :visible="isshow[0]"
                :id = "nowshow"
                @cancel="closeModal(0)"/>

        <a-modal
                title="注销账户"
                :visible="isshow[1]"
                @ok="handleOk"
                @cancel="closeModal(1)"
        >
            <a-input v-model="password"></a-input>
        </a-modal>

        <a-modal
                title="创建账户"
                :visible="isshow[3]"
                @ok="newaccount"
                @cancel="closeModal(3)"
        >
            <a-input v-model="password"></a-input>
        </a-modal>

        <a-modal
                title="挂失账户"
                :visible="isshow[2]"
                @ok="handleGuashi"
                @cancel="closeModal(2)"
        >
            <p style="color: red">您确定要挂失该资金账户吗？</p>
        </a-modal>

        <a-button type="primary" @click="showModal(3,0)">创建资金账户</a-button>
        <a-list
                itemLayout="horizontal"
                :dataSource="data"
        >
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card :bordered=true :title="'ID: ' + item.id" style="width: 100%;">
                    <a-card-grid style="width:50%;textAlign:'center'">
                        <p style="font-weight: bolder">当前可用资金: {{ item.available }}</p>
                    </a-card-grid>
                    <a-card-grid style="width:50%;textAlign:'center'">
                        <p style="font-weight: bolder">当前冻结资金: {{ item.frozen }}</p>
                    </a-card-grid>
                    <a-card-grid style="width:100%;textAlign:'center'">
                        <a-button type="primary" @click="showModal(0,item.id)">修改资金账户密码</a-button>
                        <a-divider type="vertical"/>
                        <a-button type="danger" @click="showModal(2,item.id)">挂失</a-button>
                        <a-divider type="vertical"/>
                        <a-button type="danger" @click="showModal(1,item.id)">注销账户</a-button>
                    </a-card-grid>
                </a-card>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    import Changefundpassword from "@/components/Changefundpassword"
    export default {
        name: "Fundsinfo",
        components:{Changefundpassword},
        data() {
            return {
                password:null,
                nowshow:null,
                isshow:[
                    false,
                    false
                    ],
                data:[],
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            handleGuashi(){
                let data = new FormData();
                data.append("account_id", this.nowshow);
                this.$axios
                    .post("", data)
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.$message.success("挂失成功！");
                                this.closeModal(2);
                                this.init();
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        }
                    )
            },
            newaccount(){
                if (this.password === "") {
                    this.$message.error("密码不能为空！")
                }
                let data = new FormData();
                data.append("user_id",this.$cookies.get("user_id"));
                data.append("password", this.password);
                this.$axios
                    .post("", data)
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.$message.success("创建成功！新的资金账户id为:"+response.data.id);
                                this.closeModal(3);
                                this.init();
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        }
                    )
            },
            handleOk() {
                if (this.password === "") {
                    this.$message.error("密码不能为空！")
                }
                let data = new FormData();
                data.append("account_id", this.nowshow);
                data.append("password", this.password);
                this.$axios
                    .post("", data)
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.$message.success("注销成功！");
                                this.closeModal(1);
                                this.init();
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        }
                    )
            },
            showModal(i,id) {
                this.nowshow = id;
                this.$set(this.isshow,i,true)
            },
            closeModal(i) {
                this.$set(this.isshow,i,false)
            },
            init() {
                /*
                this.$axios
                    .get(this.baseurl + "/api/fund",{
                        params:{
                            "user_id":this.$cookies.get("user_id")
                        }
                    })
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.data = response.data.data.fund;
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        }
                    );
                */

                this.$axios
                    .get("http://localhost:8080/json/fundinfo.json")
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.data = response.data.data.fund;
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        }
                    );
            },
        }
    }
</script>

<style scoped>
</style>
