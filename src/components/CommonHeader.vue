<template>
  <div class="header">
    <div class="left">
      <el-button icon="el-icon-menu" size="mini" @click="handleMenu" />
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="(route, index) in $route.matched.filter(
            (item) => item.meta.title
          )"
          :key="index"
          :to="{ path: route.path }"
        >
          {{ route.meta.breadcrumb }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <img src="../assets/1.jpg" alt="" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleMenu() {
      this.$store.commit("collapseMenu");
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: rgb(68, 68, 68);
  .left {
    color: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    /deep/ .el-breadcrumb__item {
      .el-breadcrumb__inner {
        padding-left: 10px;
        color: #ffffff5e;
        font-weight: 800;
      }
      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
          font-weight: 800;
        }
      }
    }
  }
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>