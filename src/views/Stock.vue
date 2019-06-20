<template>
    <div class="Stock" :style="contentStyleObj">
        <div id="kline" style="width: 800px; height: 600px; margin: auto;"></div>
        <h1>ID: {{ id }}    Name: {{ name }}</h1>
        <p>当前价格: {{price_now}}</p>
        <p>最高成交价格: {{highest_buy_order}}</p>
        <p>最低成交价格: {{lowest_sell_order}}</p>
        <p>当日最高价格: {{highest_price_today}}</p>
        <p>当日最低价格: {{lowest_price_today}}</p>
        <p>本周最高价格: {{highest_price_week}}</p>
        <p>本周最低价格: {{lowest_price_week}}</p>
        <p>本月最高价格: {{highest_price_month}}</p>
        <p>本月最低价格: {{lowest_price_month}}</p>
        <p>重要公告: {{important_announcement}}</p>
    </div>
</template>

<script>
    export default {
        name: "Stock",
        data() {
            return {
                name:"",
                id:"",
                price_now:"",
                highest_buy_order:"",
                lowest_sell_order:"",
                highest_price_today:"",
                lowest_price_today:"",
                highest_price_week:"",
                lowest_price_week:"",
                highest_price_month:"",
                lowest_price_month:"",
                k_url:"",
                important_announcement:"",
                contentStyleObj:{
                    width:'',
                    "margin":"auto",
                    "padding-top":"40px",
                    "padding-bottom":"40px",
                    "text-align": "center"
                },
                imgStyle: {
                    height: "",
                    "width":"100%",
                },
            }
        },
        created(){
            this.contentStyleObj.width=window.screen.width/2-200+'px';
            this.imgStyle.height = (window.screen.width / 2) / 4 + 'px';
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                let kline = new this.Kline(this.$route.params.id,this.$cookies.get("type"));
                kline.show();
                let data = new FormData();
                data.append("id",this.$route.params.id);
                this.$axios
                    .post(this.baseurl + "/api/search_stock_accurate",data)
                    .then(
                        response => {
                            if (response.data.code === 1) {

                                this.name = response.data.data.name;
                                this.id = response.data.data.id;
                                this.price_now = response.data.data.price_now;
                                this.highest_buy_order = response.data.data.highest_buy_order;
                                this.lowest_sell_order = response.data.data.lowest_sell_order;
                                this.highest_price_today = response.data.data.highest_price_today;
                                this.lowest_price_today = response.data.data.lowest_price_today;
                                this.highest_price_week = response.data.data.highest_price_week;
                                this.lowest_price_week = response.data.data.lowest_price_week;
                                this.highest_price_month = response.data.data.highest_price_month;
                                this.lowest_price_month = response.data.data.lowest_price_month;
                                this.k_url = response.data.data.k_url;
                                this.important_announcement = response.data.data.important_announcement;

                            } else {
                                this.$message.error(response.data.msg);
                            }

                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>
