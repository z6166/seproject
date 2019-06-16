<template>
    <div>
        <a-list
                itemLayout="horizontal"
                :dataSource="data"
        >
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card :title="'ID: ' + item.order_id" style="width: 100%">
                    <p>类型:{{type[parseInt(item.type)]}}</p>
                    <p>状态:{{state[parseInt(item.state)+1]}}</p>
                    <p>股票名称:{{item.stock_name}}</p>
                    <p>股票ID:{{item.stock_id}}</p>
                    <p>交易价格:{{item.price}}</p>
                    <p>交易数量:{{item.amount}}</p>
                    <a-button type="primary" v-if="item.state === '0'" @click="cancel(item.order_id)">撤回该指令</a-button>
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
                nowid: "",
                data: [],
                type:[
                    "购买",
                    "出售"
                ],
                state:[
                    "已撤回",
                    "未撮合",
                    "已撮合"
                ]
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            cancel(id){
                console.log(id);
                /*
                let data = new FormData();
                data.append("user_id", this.$cookies.get("user_id"));
                data.append("order_id", id);
                this.$axios
                    .post("", data)
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
                    */
            },
            init() {

                /*
                this.$axios
                    .get("",{
                        params:{
                            "user_id":this.$cookies.get("user_id")
                        }
                    })
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.data = response.data.data.history;
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        }
                    );
                */

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
