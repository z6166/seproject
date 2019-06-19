<template>
    <div>
        <a-modal
                title="挂失账户"
                :visible="isshow"
                @ok="cancel"
                @cancel="closeModal"
        >
            <p style="color: red">您确定要撤销该指令吗？</p>
            <a-input v-model="password" placeholder="输入您的资金账户密码"></a-input>
        </a-modal>


        <a-list
                itemLayout="horizontal"
                :dataSource="data"
        >
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card
                        :bordered=true
                        :title="'ID: ' + item.sell_id"
                        style="width: 100%;">
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">股票名称:{{item.stock_name}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">股票ID:{{item.stock_id}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">交易价格:{{item.price}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">交易数量:{{item.amount}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">交易日期:{{item.data}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">交易时间:{{item.time}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">剩余数量:{{item.reset}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">状态:{{item.status}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <a-button type="primary" v-if="item.status === 'waiting'" @click="showModal(item,account_id,item.sell_id)">撤回该指令</a-button>
                    </a-card-grid>

                </a-card>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    export default {
        name: "histroy",
        data() {
            return {
                isshow:false,
                password:"",
                nowid: "",
                data: [],
                fund:[]
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            closeModal(i) {
                this.isshow = false;
            },
            showModal(account_id,id) {
                this.nowshow = id;
                this.nowaccount = account_id;
                this.isshow = true;
            },
            cancel(id){

                let data = new FormData();
                data.append("account_id", this.nowaccount);
                data.append("order_id", this.nowshow);
                data.append("password", this.password);
                data.append("type","0");
                this.$axios
                    .post("/api/undo", data)
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.$message.success("撤回成功！");
                                this.init()
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        }
                    )
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
                    .get(this.baseurl + "/api/get_all_capital",{
                        params:{
                            "user_id":this.$cookies.get("user_id")
                        }
                    })
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.fund = response.data.data;
                                console.log(this.fund);
                                let data = new FormData();
                                data.append("type", "offer");
                                data.append("account_id", JSON.stringify(this.fund));
                                this.$axios
                                    .post(this.baseurl + "/api/recent_ops",data)
                                    .then(
                                        response => {
                                            if (response.data.code === 0) {
                                                this.data = response.data.data.history;
                                            } else {
                                                this.$message.error(response.data.msg);
                                            }
                                        }
                                    );
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        }
                    );




                this.$axios
                    .get("http://localhost:8080/json/history.json")
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.data = response.data.data.history;
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
