//登录

<template>
    <div class="Search" id="Search" style="text-align: center">
        <a-input-group compact>
            <a-select v-model="searchselect" defaultValue="0">
                <a-select-option value="0">股票名称</a-select-option>
                <a-select-option value="1">股票代码</a-select-option>
            </a-select>
            <a-input v-model="searchcontent" @pressEnter="searchevent" style="width: 60%">
                <a-icon slot="suffix" type="search" @click="searchevent"></a-icon>
            </a-input>
        </a-input-group>
        <br/>
        <a-table :columns="columns" :dataSource="Searchresult" :pagination="pagination">
            <span slot="action" slot-scope="text, record">
                <router-link :to="'/stock/'+ record.id">查看详情</router-link>
                <a-divider v-if="canbuy === 1" type="vertical"/>
                <a v-if="canbuy === 1" href="javascript:" @click="handleBuy(record.id)">Buy</a>
            </span>
        </a-table>
    </div>
</template>

<script>
    const columns = [{
        title: "股票代码",
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '股票名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '当前价格',
        dataIndex: 'price_now',
        key: 'price_now',
    }, {
        title: '最高成交价格',
        dataIndex: 'highest_buy_order',
        key: 'highest_buy_order',
    }, {
        title: '最低成交价格',
        dataIndex: 'lowest_sell_order',
        key: 'lowest_sell_order',
    }, {
        title: '当日最高价格',
        dataIndex: 'highest_price_today',
        key: 'highest_price_today',
    }, {
        title: '当日最低价格',
        dataIndex: 'lowest_price_today',
        key: 'lowest_price_today',
    }, {
        title: 'K线图',
        dataIndex: 'k_url',
        key: 'k_url',
    }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        scopedSlots: {customRender: 'action'}
    }];
    var Searchresult = [];
    export default {
        name: "Search",
        props:["canbuy"],
        data() {
            return {
                searchselect: '0',
                Searchresult:[],
                columns,
                searchcontent: '',
                pagination: {
                    pageSize: 6, // 默认每页显示数量
                    showSizeChanger: true, // 显示可改变每页数量
                    pageSizeOptions: ['5', '10', '20', '30'], // 每页数量选项
                    showTotal: total => `Total ${total} items`, // 显示总数
                    showSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
                }
            };
        },
        components: {},
        methods: {
            searchevent() {
                if (this.searchcontent !== "") {
                    this.tosearch();
                } else {
                    this.$message.error("请输入搜索内容！")
                }
            },
            handleBuy(id){
                let data={
                    id:id,
                    page:'2'
                };
                this.$emit('changeview',data);
            },
            tosearch() {
                /*
                this.$axios
                    .get("",{
                        params:{
                            "type":this.searchselect,
                            "entity":this.searchcontent
                        }
                    })
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.Searchresult = response.data.data.stock
                            } else {
                                this.$message.error(response.data.msg)
                            }
                        }
                    );
                */

                this.$axios
                    .get("http://localhost:8080/json/info.json").then(
                    response => {
                        console.log(response.data);
                        if (response.data.code === 0) {
                            this.Searchresult = response.data.data.stock
                        } else {
                            this.$message.error(response.data.msg)
                        }
                    }
                );
            },
        }
    };
</script>

<style scoped>
    .Search {
        height: 70%;
    }
</style>
