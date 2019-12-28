<template>
  <div id="app">
    <router-link to="/login"></router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {}
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
