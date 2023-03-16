<template>
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :default-active="path == '/home' ? '/' : path"
    :collapse="isCollapse"
    :router="true"
  >
    <h3>{{ !isCollapse ? "后台管理系统" : "后台" }}</h3>
    <el-menu-item
      v-for="item in noChildren"
      :key="item.name"
      :index="item.path"
      @click="clickMenu(item)"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>

    <el-submenu index="1" v-for="item in hasChildren" :key="item.name">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">其他</span>
      </template>
      <el-menu-item-group v-for="it in item.children" :key="it.name">
        <el-menu-item :index="it.path" @click="clickMenu(it)">{{
          it.label
        }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getMenu } from "@/api";

export default {
  data() {
    return {
      menuData: [],
    };
  },
  methods: {
    clickMenu(item) {
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    noChildren() {
      return this.menuData.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menuData.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    path() {
      return this.$route.path;
    },
  },
  mounted() {
    // 获取菜单数据，并根据当前用户的身份来显示不同的菜单
    getMenu().then((res) => {
      // 输出菜单数据

      // 根据当前用户的身份来设置菜单数据和身份标识
      if (localStorage.getItem("token") == "admin-token") {
        // 如果当前用户是管理员，则使用 adminMenuData
        this.menuData = res.data.data.adminMenuData;
      } else {
        // 如果当前用户是普通用户，则使用 userMenuData
        this.menuData = res.data.data.userMenuData;
      }
    });
  },
};
</script>

<style lang="less">
.el-menu {
  height: 100vh;
  border: 0;
  h3 {
    line-height: 56px;
    font-size: 14px;
    text-align: center;
    color: #fff;
    font-weight: 400;
  }
}
</style>