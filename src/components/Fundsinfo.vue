<template>
    <div>
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
                </a-card>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    export default {
        name: "Fundsinfo",
        data() {
            return {
                data:[],
            }
        },
        mounted() {
            this.init();
        },
        methods: {
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
