<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo"></div>
      <a-menu
              theme="dark"
              mode="horizontal"
              :defaultSelectedKeys="['1']"
              :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1"><router-link to="/">首页</router-link></a-menu-item>
        <a-menu-item key="3"><router-link to="/about">关于</router-link></a-menu-item>

        <a-dropdown style="float: right;">
          <a class="ant-dropdown-link" href="#">
            <a-icon type="user" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a v-if="!this.$cookies.isKey('token')" @click="showModal">登录</a>
              <a v-if="this.$cookies.isKey('token')" @click="logout">退出</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a v-if="this.$cookies.isKey('token')"><router-link to="/user">个人中心</router-link></a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-menu>
    </a-layout-header>


    <a-layout-content style="padding: 0 50px">
      <br/>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <router-view></router-view>
      </div>
    </a-layout-content>


    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant ZSJ
    </a-layout-footer>
    <Login @closelogin="closeModal" v-show = "this.isshow" />
  </a-layout>
</template>

<script>
  import Login from "@/components/Login";
  export default {
    name: "app",
    components: {Login},
    data() {
      return {
        isshow:false,
        isLogin: false,
        userInfo: {
          //保存用户信息

        }
      };
    },
    methods: {
      logout(){
        this.$cookies.remove('token');
        this.$cookies.remove('username');
        this.$router.go(0);
      },
      showModal() {
        this.isshow = true
      },
      closeModal() {
        this.isshow = false
      },
      //请求用户的一些信息
    }
  };
</script>

<style>
  #components-layout-demo-top .logo {
    width: 120px;
    height: 31px;
    background: rgba(255,255,255,.2);
    margin: 16px 24px 16px 0;
    float: left;
  }
</style>
