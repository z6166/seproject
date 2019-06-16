export default{
    install(Vue,options)
    {
        Vue.prototype.logout = function () {
            this.$cookies.remove('token');
            this.$cookies.remove('username');
            this.$cookies.remove('uid');
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
    }
}
