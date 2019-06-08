<template>
    <div class="User">
        <div class="left">
            <a-menu
                    style="width: 256px"
                    :defaultSelectedKeys="['1']"
                    :defaultOpenKeys="['sub1']"
                    mode="inline"
                    theme="light"
                    :selectedKeys="[current]"
                    @click="handleClick"
            >
                <a-menu-item key="0">
                    <a-icon type="user"/>
                    个人信息
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="bars"/><span>菜单</span></span>
                    <a-menu-item key="1">
                        <a-icon type="search"/>
                        股票查询
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="shopping"/>
                        股票购买
                    </a-menu-item>
                    <a-menu-item key="3">
                        <a-icon type="shopping"/>
                        股票出售
                    </a-menu-item>
                    <a-menu-item key="4">
                        <a-icon type="profile"/>
                        个人股票
                    </a-menu-item>
                    <a-menu-item key="5">
                        <a-icon type="wallet"/>
                        个人资产
                    </a-menu-item>
                    <a-menu-item key="6">
                        <a-icon type="dollar"/>
                        交易历史
                    </a-menu-item>
                </a-sub-menu>
                <a-menu-item key="7">
                    <a-icon type="setting"/>
                    设置
                </a-menu-item>
            </a-menu>
        </div>
        <div class="right">
            <component :stockid="this.stockid" @changeview="changeview" :is="currentView"></component>
        </div>
    </div>
</template>
<script>
    import Userinfo from "../components/Userinfo.vue";
    import Search from "../components/Search.vue";
    import Purchase from "../components/Purchase.vue";
    import Sell from "../components/Sell.vue";
    import Stockinfo from "../components/Stockinfo.vue";
    import Fundsinfo from "../components/Fundsinfo.vue";
    import History from "../components/History.vue";
    import Websetting from "../components/Websetting.vue";

    export default {
        name: 'user',
        components: {
            Userinfo,
            Search,
            Purchase,
            Sell,
            Stockinfo,
            Fundsinfo,
            History,
            Websetting,
        },
        data() {
            return {
                stockid:null,
                current: '0',
                arr: [
                    'Userinfo',
                    'Search',
                    'Purchase',
                    'Sell',
                    'Stockinfo',
                    'Fundsinfo',
                    'History',
                    'Websetting',
                ],
            }
        },
        mounted() {
            if (!this.$cookies.isKey('token')) {
                this.$message.error("请先登录系统！");
                this.$router.push('/');
            }
        },
        computed: {
            currentView() {
                return this.arr[parseInt(this.current)];
            }
        },
        methods: {
            handleClick(e) {
                console.log('click ', e);
                this.stockid = null;
                this.current = e.key;
            },
            changeview(data){
                this.current = data.page;
                this.stockid = data.id;
            }
        },
    }

</script>

<style>
    .User {
        display: flex;
    }

    .right {
        padding: 0 30px;
        flex: 1;
    }
</style>
