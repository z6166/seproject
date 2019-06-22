<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <Login
                :visible="isshow[0]"
                @cancel="closeModal(0)"></Login>
        <RegisterPersonal
                :visible="isshow[1]"
                @cancel="closeModal(1)"></RegisterPersonal>

        <RegisterCom
                :visible="isshow[2]"
                @cancel="closeModal(2)"></RegisterCom>
        <Adminlogin
                :visible="isshow[3]"
                @cancel="closeModal(3)"></Adminlogin>
        <a-layout-header>
            <a-menu
                    theme="dark"
                    mode="horizontal"
                    :defaultSelectedKeys="['1']"
                    :style="{ lineHeight: '64px' }"
            >
                <a-menu-item key="0">
                    <router-link to="/">首页</router-link>
                </a-menu-item>

                <a-dropdown style="float: right;">
                    <a class="ant-dropdown-link" href="#">
                        <a-icon style="font-size: 20px" type="user"/>
                    </a>
                    <a-menu slot="overlay" style="width: 100px">
                        <a-menu-item v-if="!this.$cookies.isKey('user_id') && !this.$cookies.isKey('admin')" key="1">
                            <a @click="showModal(0)">登录</a>
                        </a-menu-item>
                        <a-menu-item v-if="this.$cookies.isKey('user_id')" key="2">
                            <router-link to="/user" style="color: rgba(0, 0, 0, 0.65)">个人中心</router-link>
                        </a-menu-item>

                        <a-menu-item v-if="!this.$cookies.isKey('user_id') && !this.$cookies.isKey('admin')" key="3">
                            <a @click="showModal(1)">个人用户注册</a>
                        </a-menu-item>

                        <a-menu-item v-if="!this.$cookies.isKey('user_id') && !this.$cookies.isKey('admin')" key="4">
                            <a @click="showModal(2)">企业用户注册</a>
                        </a-menu-item>

                        <a-menu-item v-if="!this.$cookies.isKey('user_id') && !this.$cookies.isKey('admin')" key="5">
                            <a @click="showModal(3)">管理员登录</a>
                        </a-menu-item>

                        <a-menu-item v-if="this.$cookies.isKey('admin')" key="6">
                            <router-link to="/admin" style="color: rgba(0, 0, 0, 0.65)">管理员界面</router-link>
                        </a-menu-item>
                        <a-menu-item v-if="this.$cookies.isKey('user_id') || this.$cookies.isKey('admin')" key="7">
                            <a @click="logout()">退出</a>
                        </a-menu-item>

                    </a-menu>
                </a-dropdown>
            </a-menu>
        </a-layout-header>


        <a-layout-content style="padding: 0 10px">
            <br/>
            <div :style="{ background: '#fff', minHeight: '280px' }">
                <router-view></router-view>
            </div>
        </a-layout-content>


        <a-layout-footer style="text-align: center">
            Created by Group HJH
        </a-layout-footer>
    </a-layout>
</template>

<script>
    import Login from "@/components/Login";
    import Adminlogin from "@/components/adminlogin"
    import RegisterPersonal from "@/components/registerpersonal"
    import RegisterCom from "@/components/registercom"

    export default {
        name: "app",
        components: {Login,RegisterPersonal,RegisterCom,Adminlogin},
        data() {
            return {
                isshow: [
                    false,
                    false,
                    false,
                    false
                ],
                isLogin: false,
                userInfo: {
                    //保存用户信息

                }
            };
        },
        methods: {
            showModal(id) {
                this.$set(this.isshow,id,true)
            },
            closeModal(id) {
                this.$set(this.isshow,id,false)
            },
            //请求用户的一些信息
        }
    };
</script>

<style>
    #components-layout-demo-top .logo {
        width: 120px;
        height: 31px;
        background: rgba(255, 255, 255, .2);
        margin: 16px 24px 16px 0;
        float: left;
    }
</style>
