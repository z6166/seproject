//登录

<template>
    <div class="Search" id="Search" style="text-align: center;padding: 0 10px">
        <a-input-group compact>
            <a-select v-model="searchselect" defaultValue="0">
                <a-select-option value="0">uid</a-select-option>
                <a-select-option value="1">username</a-select-option>
            </a-select>
            <a-input v-model="searchcontent" @pressEnter="searchevent" style="width: 60%">
                <a-icon slot="suffix" type="search" @click="searchevent"></a-icon>
            </a-input>
        </a-input-group>
        <br/>
        <a-table :columns="columns" :dataSource="Searchresult" :pagination="pagination">
            <span slot="action" slot-scope="text, record">
                <a href="javascript:" @click="action(0,record.user_id)">提升会员</a>
                <a-divider type="vertical"/>
                <a href="javascript:" @click="action(1,record.user_id)">挂失</a>
                <a-divider type="vertical"/>
                <a href="javascript:" @click="action(2,record.user_id)">删除</a>
            </span>
        </a-table>
    </div>
</template>

<script>
    const columns = [{
        title: "uid",
        dataIndex: 'uid',
        key: 'uid',
    }, {
        title: 'user_id',
        dataIndex: 'user_id',
        key: 'user_id',
    }, {
        title: 'username',
        dataIndex: 'username',
        key: 'username',
    },{
        title: 'type',
        dataIndex: 'type',
        key: 'type',
    }, {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        scopedSlots: {customRender: 'action'}
    }];
    export default {
        name: "admin",
        props:[],
        data() {
            return {
                actions: [
                    "raise",
                    "suspend",
                    "cancel",
                ],
                searchselect: '0',
                Searchresult:[],
                columns,
                searchcontent: '',
                pagination: {
                    pageSize: 50, // 默认每页显示数量
                    showSizeChanger: true, // 显示可改变每页数量
                    pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
                    showTotal: total => `Total ${total} items`, // 显示总数
                    showSizeChange: (current, pageSize) => this.pageSize = pageSize, // 改变每页数量时更新显示
                }
            };
        },
        components: {},
        mounted(){
          this.init();
        },
        methods: {
            // /api/raise /api/suspend /api/cancel
            action(id,user_id) {
                let data = new FormData();
                data.append("user_id",user_id);
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
            init(){
                this.$axios
                    .get("http://localhost:8080/json/admin.json")
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.Searchresult = response.data.data.userdata;
                            } else {
                                this.$message.error(response.data.msg);
                            }
                        }
                    )
            },
            searchevent() {
                if (this.searchcontent !== "") {
                    console.log("开始搜索")
                } else {
                    this.$message.error("请输入搜索内容！")
                }
            },
        }
    };
</script>

<style scoped>
    .Search {
        height: 70%;
    }
</style>
