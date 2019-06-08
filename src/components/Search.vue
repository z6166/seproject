//登录

<template>
    <div class="Search" id="Search">
        <a-input-group compact>
            <a-select v-model="searchselect" defaultValue="name">
                <a-select-option value="name">股票名称</a-select-option>
                <a-select-option value="id">股票代码</a-select-option>
            </a-select>
            <a-input v-model="searchcontent" @pressEnter="searchevent" style="width: 80%"><a-icon slot="suffix" type="search" @click="searchevent"></a-icon></a-input>
        </a-input-group>
        <br/>
        <a-table :columns="columns" :dataSource="Searchresult" :pagination="pagination">
            <span slot="action" slot-scope="text, record">
              <a href="javascript:">Buy</a>
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
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        scopedSlots: {customRender: 'action'}
    }];
    var Searchresult = [];
    export default {
        name: "Search",
        data() {
            return {
                searchselect:'name',
                Searchresult,
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
                }else {
                    this.$message.error("请输入搜索内容！")
                }
            },
            tosearch() {
                console.log("begin");
                console.log(this.searchselect);

                this.$http.get("http://localhost:8080/json/info.json").then(
                    response => {
                        console.log(response.data);
                        if (response.data.code === 0) {
                            this.Searchresult = response.data.data;
                        }
                    }
                );

                setTimeout(() => {
                    console.log("end");
                }, 3000);
            },
        }
    };
</script>

<style scoped>
    .Search {
        height: 70%;
    }
</style>
