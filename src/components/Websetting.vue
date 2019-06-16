<template>
    <div style="margin: 0 10px">
        <a-button type="primary" style="height: 50px;width: 100%" @click="showModal(0)">修改交易密码</a-button>
        <a-divider/>
        <a-button type="primary" style="height: 50px;width: 100%" @click="showModal(1)">修改取款密码</a-button>
        <ChangePassword1
                :visible='isshow[0]'
                @cancel="closeModal(0)"></ChangePassword1>
        <ChangePassword2
                :visible='isshow[1]'
                @cancel="closeModal(1)"></ChangePassword2>
    </div>
</template>

<script>
    import ChangePassword1 from "./changepassword1"
    import ChangePassword2 from "./changepassword2"

    export default {
        name: "Websetting",
        data() {
            return {
                isshow: [
                    false,
                    false
                ]
            }
        },
        components: {ChangePassword1,ChangePassword2},
        methods: {
            showModal(id) {
                console.log(id);
                this.$set(this.isshow,id,true)
            },
            closeModal(id) {
                console.log(id);
                this.$set(this.isshow,id,false)
            },
        }
    }
</script>

<style scoped>

</style>
