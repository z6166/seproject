<template>
  <div class="Home" :style="contentStyleObj">
      <div id="kline" style="width: 800px; height: 600px; margin: auto;"></div>
        <Search :canbuy="0" style="padding-top: 20px"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "../components/Search.vue";

export default {
  name: 'home',
  components: {
    Search
  },
  data(){
    return{
      contentStyleObj: {
        width: '',
        "margin": "auto",
        "padding-top": "40px",
        "padding-bottom": "40px"
      },
    }
  },
  mounted() {
      this.init();
    this.contentStyleObj.width = window.screen.width / 2 + 'px';
  },
    methods:{
      init(){
          let kline = new this.Kline("600055");
          kline.showyear();
      }
    },
}
</script>
