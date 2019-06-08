<template>
  <div class="about">
    <h1 v-if="this.$cookies.isKey('username')">Hello! {{ this.$cookies.get('username') }}</h1>
    <h2>This is an about page</h2>
  </div>
</template>

<script>
  export default {
    name:'About',
  }
</script>
