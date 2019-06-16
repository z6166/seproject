<template>
    <div>
        <Stocksell
            :visible="isshow"
            :stockid="nowid"
            v-if="isshow"
            @cancel="closeModal"/>
        <a-list
                itemLayout="horizontal"
                :dataSource="data"
        >
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card
                        :bordered=true
                        style="width: 100%;">
                    <a-card-meta style="margin-bottom: auto">
                        <div slot="title" style="height: fit-content;padding: 0 20px">
                            <h2 style="display:inline;">{{'股票名: ' + item.name + ', 股票代码: ' + item.id}}</h2>
                            <a-divider type="vertical"/>
                            <router-link :to="'/stock/'+ item.id">
                                <a>查看详情 </a>
                            </router-link>
                            <a-divider type="vertical"/>
                            <a @click="showModal(item.id)">出售股票</a>
                        </div>
                    </a-card-meta>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">数量:{{item.amount}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">当前价格:{{item.current_price}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">花费:{{item.cost}}</p>
                    </a-card-grid>
                    <a-card-grid style="width:25%;textAlign:'center'">
                        <p style="font-weight: bolder">收益:{{item.benifit}}</p>
                    </a-card-grid>
                </a-card>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    import Stocksell from "@/components/Stocksell"
    export default {
        name: "Stockinfo",
        components:{Stocksell},
        data() {
            return {
                nowid:null,
                isshow:false,
                data: [],
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            showModal(id) {
                console.log(id);
                this.nowid = id;
                this.isshow = true
            },
            closeModal() {
                this.isshow = false
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
                                this.data = response.data.data.stock;
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        }
                    );
                */

                this.$axios
                    .get("http://localhost:8080/json/stockinfo.json")
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.data = response.data.data.stock;
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
