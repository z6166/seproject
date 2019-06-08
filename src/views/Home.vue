<template>
  <div class="Home">
    <a-row  type="flex" justify="center" align="top">
      <a-col :span="11">
        <a-card>
          <img slot="cover" src="https://pic1.zhimg.com/v2-451a6af74df99e662aea49782ebd0567_1200x500.jpg" alt="K线图"/>
          <a-card-meta
                  title="K线图">
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :span="2">
      </a-col>
      <a-col :span="11">
        <Search style="padding-top: 20px"/>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "../components/Search.vue";

export default {
  name: 'home',
  components: {
    Search
  }
}
</script>
