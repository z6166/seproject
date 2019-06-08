<template>
    <div class="Userinfo">
        <a-avatar :size="128" :src="this.face"/>
        <br/>
        <br/>
        <p>用户名：{{ this.username }}</p>
        <br/>
        <p>用户id：{{ this.userid }}</p>
        <br/>
        <p>资金：{{ this.money }}</p>
    </div>
</template>

<script>
    export default {
        name: "Userinfo",
        data() {
            return {
                userid:null,
                username:null,
                face:null,
                money:null
            }
        },
        mounted() {
            this.getuserinfo();
        },
        methods: {
            getuserinfo() {
                this.$http
                    .get("http://localhost:8080/json/userinfo.json")
                    .then(
                        response => {
                            console.log(response.data.data);
                            if (response.data.code === 0) {
                                this.userid = response.data.data.userid;
                                this.username = response.data.data.username;
                                this.face = response.data.data.face;
                                this.money = response.data.data.money;
                            } else {
                                this.$message.error("获取用户信息失败!");
                            }
                        }
                    );
                console.log(this.face);
            }
        }
    }
</script>

<style scoped>
</style>
