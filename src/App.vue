<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  a {
    text-decoration: none;
  }
  .router-link-active {
    text-decoration: none;
  }
}
</style>
