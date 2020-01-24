<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style lang="scss">
@import "./assets/scss/style";

#app {
  margin-top: 60px;
}
</style>
