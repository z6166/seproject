<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider
                :trigger="null"
                collapsible
                v-model="collapsed"
        >
            <a-menu
                    :defaultSelectedKeys="['1']"
                    :defaultOpenKeys="['sub1']"
                    mode="inline"
                    theme="dark"
                    :selectedKeys="[current]"
                    @click="handleClick"
            >
                <a-menu-item key="0">
                    <a-icon type="user"/>
                    <span>个人信息</span>
                </a-menu-item>
                <a-sub-menu key="sub1">
                    <span slot="title"><a-icon type="bars"/><span>菜单</span></span>
                    <a-menu-item key="1">
                        <a-icon type="search"/>
                        <span>股票查询</span>
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="shopping"/>
                        <span>股票购买</span>
                    </a-menu-item>
                    <a-menu-item key="3">
                        <a-icon type="profile"/>
                        <span>证券账户</span>
                    </a-menu-item>
                    <a-menu-item key="4">
                        <a-icon type="wallet"/>
                        <span>资金账户</span>
                    </a-menu-item>
                    <a-menu-item key="5">
                        <a-icon type="dollar"/>
                        <span>交易历史</span>
                    </a-menu-item>
                </a-sub-menu>
                <a-menu-item key="6">
                    <a-icon type="setting"/>
                    <span>设置</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="()=> collapsed = !collapsed"
                />
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
                <component :canbuy="1" :stockid="this.stockid" @changeview="changeview" :is="currentView"></component>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
    import Userinfo from "../components/Userinfo.vue";
    import Search from "../components/Search.vue";
    import Purchase from "../components/Purchase.vue";
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
            Stockinfo,
            Fundsinfo,
            History,
            Websetting,
        },
        data() {
            return {
                collapsed: false,
                stockid:null,
                current: '0',
                arr: [
                    'Userinfo',
                    'Search',
                    'Purchase',
                    'Stockinfo',
                    'Fundsinfo',
                    'History',
                    'Websetting',
                ],
            }
        },
        mounted() {

            if (!this.$cookies.isKey('user_id')) {
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
    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        height: 32px;
        background: rgba(255,255,255,.2);
        margin: 16px;
    }
</style>
