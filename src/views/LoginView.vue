<template>
  <div class="login">
    <el-card>
      <h3>系统登录</h3>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="form.password"
            @keyup.native.enter="submit"
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from "@/api";
login;
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    submit() {
      // 通过表单验证
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 获取表单数据
          const data = this.form;
          // 调用登录接口，传递表单数据
          login(data).then((res) => {
            // 将 token 保存到本地存储
            localStorage.setItem("token", res.data.data);

            // 根据接口返回的响应码进行处理
            if (res.data.code == 20000) {
              // 登录成功，显示提示信息并跳转到主页
              if (res.data.data == "admin-token") {
                this.$message({
                  message: "尊敬的管理员用户，欢迎回来",
                  type: "success",
                });
              } else {
                this.$message({
                  message: "用户登录成功，正在转入主页",
                  type: "success",
                });
              }

              this.$router.push("/");
            } else {
              // 登录失败，显示错误信息
              this.$message.error("登录失败!");
            }
          });
        }
      });
    },
  },
};
</script>

<style lang='less' scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-card {
    h3 {
      padding: 20px 10px;
    }
    width: 500px;
    .el-button {
      margin-left: 380px;
    }
  }
}
</style>