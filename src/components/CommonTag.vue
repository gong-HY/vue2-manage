<template>
  <div class="text">
    <el-tag style="margin-right: 10px">首页</el-tag>
    <el-tag
      style="margin-right: 10px"
      closable
      v-for="(item, index) in metaRoutes"
      :key="item.meta.title"
      @close="closeHandle"
      :effect="index == metaRoutes.length - 1 ? 'dark' : ''"
    >
      {{ item.meta.title }}
    </el-tag>
  </div>
</template>

<script>
export default {
  computed: {
    routes() {
      return this.$route.matched;
    },
    metaRoutes() {
      return this.routes.filter((item) => item.meta.title);
    },
  },
  methods: {
    closeHandle() {
      const path = this.routes[this.routes.length - 2].path;
      if (path == "" || path == "/other") this.$router.push("/home");
      else this.$router.push(path);
    },
  },
};
</script>

<style>
.text {
  transform: translateY(-10px);
}
</style>