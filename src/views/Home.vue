<template>
  <div class="Home" :style="contentStyleObj">
        <a-card>
          <div id="kline" style="width: 100%;height: auto"></div>
          <a-card-meta
                  title="K线图">
          </a-card-meta>
        </a-card>
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
  created() {
    this.contentStyleObj.width = window.screen.width / 2 - 200 + 'px';
  },
}
</script>
