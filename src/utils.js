export default{
    install(Vue,options)
    {
        Vue.prototype.logout = function () {
            this.$cookies.remove('user_id');
            this.$cookies.remove('name');
            this.$cookies.remove('type');
            this.$cookies.remove('acc_type');
            this.$cookies.remove('admin');
            this.$router.go(0);
        };
        Vue.prototype.getTime = function (timestamp) {
            var d = new Date(timestamp);
            return (d.getFullYear()) + "-" +
                (d.getMonth() + 1) + "-" +
                (d.getDate()) + " " +
                (d.getHours()) + ":" +
                (d.getMinutes())
        };
        Vue.prototype.baseurl = "http://10.110.35.30:8088";
    }
}
