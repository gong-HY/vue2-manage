<template>
  <el-container>
    <el-aside width="auto"><CommonAside /></el-aside>
    <el-container>
      <el-header><common-header /></el-header>
      <el-main><router-view /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from "@/components/CommonHeader.vue";

export default {
  components: {
    CommonAside,
    CommonHeader,
  },
};
</script>

<style lang="less">
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-header {
  padding: 0;
}
</style>