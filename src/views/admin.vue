//登录

<template>
    <div class="Search" id="Search" style="text-align: center;padding: 0 10px">
        <a-input-group compact>
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
        title: 'user_id',
        dataIndex: 'user_id',
        key: 'user_id',
    }, {
        title: 'name',
        dataIndex: 'name',
        key: 'name',
    },{
        title: 'type',
        dataIndex: 'type',
        key: 'type',
    },{
        title: 'acc_type',
        dataIndex: 'acc_type',
        key: 'acc_type',
    },{
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
                this.$axios
                    .post(this.baseurl + "/api/" + this.actions[id], data)
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
                if (!this.$cookies.isKey('admin')) {
                    this.$message.error("请先登录系统！");
                    this.$router.push('/');
                }
                let data = new FormData();
                data.append("offset",'0');
                data.append("amount",'100');
                this.$axios
                    .post(this.baseurl + "/api/admin_get_account_by_limit",data)
                    .then(
                        response => {
                            if (response.data.code === 0) {
                                this.Searchresult = response.data.data;
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
