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

        <a-switch checkedChildren="购买记录" unCheckedChildren="出售记录" defaultChecked @change='onChange'/>

        <a-list
                itemLayout="horizontal"
                :dataSource="datashow"
                :pagination="pagination"
        >
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card
                        :bordered=true
                        :title="'ID: ' + item.id"
                        style="width: 100%;">
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">股票名称:{{item.stock_name}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">资金账户:{{item.card_id}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">股票ID:{{item.stock_id}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">交易价格:{{item.price}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">交易数量:{{item.total}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">交易日期:{{item.date}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">交易时间:{{item.time}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">剩余数量:{{item.rest}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">状态:{{item.status}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p v-if="item.type === 0" style="font-weight: bolder">指令类型:购买</p>
                        <p v-else style="font-weight: bolder">指令类型:出售</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'" v-if="item.status === 'waiting'">
                        <a-button type="primary" @click="showModal(item.card_id,item.id,item.type)">撤回该指令</a-button>
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
                buyorsell:0,
                isshow:false,
                password:"",
                nowid: "",
                nowaccount:"",
                nowtype:"",
                data: [],
                datashow:[],
                fund:[],
                pagination: {
                    pageSize: 5, // 默认每页显示数量
                    showSizeChanger: true, // 显示可改变每页数量
                    pageSizeOptions: ['5', '10', '20', '30'], // 每页数量选项
                    showTotal: total => `Total ${total} items`, // 显示总数
                    showSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
                }
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            onChange(checked){
              if(this.buyorsell === 0){
                  this.buyorsell = 1;
              } else {
                  this.buyorsell = 0;
              }
              this.handledata();
            },
            closeModal(i) {
                this.isshow = false;
                this.nowshow = 0;
                this.nowaccount = 0;
                this.nowtype = 0;
            },
            showModal(account_id,id,type) {
                this.nowshow = id;
                this.nowaccount = account_id;
                this.nowtype = type;
                this.isshow = true;
            },
            cancel(){

                let data = new FormData();
                data.append("account_id", this.nowaccount);
                data.append("order_id", this.nowshow);
                data.append("password", this.password);
                data.append("type",this.nowtype);
                this.$axios
                    .post(this.baseurl + "/api/undo", data)
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
            handledata(){
                this.datashow = [];
                for(var i = 0;i<this.data.length;i++){
                    if(this.data[i].type === this.buyorsell){
                        this.datashow.push(this.data[i]);
                    }
                }
                console.log(this.datashow);
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
                                                this.data = response.data;
                                                this.handledata();
                                        }
                                    );
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
