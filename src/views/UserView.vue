<template>
  <!-- 管理页面的容器 -->
  <div class="manage">
    <!-- 公共标签组件 -->
    <common-tag></common-tag>
    <!-- 新增按钮 -->
    <el-row
      type="flex"
      align="middle"
      justify="space-between"
      style="margin-top: 20px"
    >
      <el-button type="primary" @click="dialogVisible = true">新增 </el-button>
      <el-input
        id="ipt"
        v-model="keyword"
        placeholder="请输入搜索内容"
      ></el-input>
    </el-row>

    <!-- 更新用户的对话框 -->
    <el-dialog
      title="更新用户"
      :visible.sync="dialogVisible"
      width="45%"
      :before-close="handleClose"
    >
      <!-- 用户信息表单 -->
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        inline
        :rules="rules"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model.number="form.age"
            placeholder="请输入年龄"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="女" value="女"></el-option>
            <el-option label="男" value="男"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="date">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <!-- 对话框底部的按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-card style="margin-top: 20px">
      <el-table
        :data="
          searchData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        stripe
        style="width: 100%"
        max-height="500px"
      >
        <el-table-column prop="name" label="姓名" width="170" sortable>
        </el-table-column>
        <el-table-column prop="gender" label="性别" width="170" sortable>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="170" sortable>
        </el-table-column>
        <el-table-column prop="date" label="出生日期" width="170" sortable>
        </el-table-column>
        <el-table-column prop="address" label="地址" width="320">
        </el-table-column>
        <el-table-column prop="do" label="操作">
          <template slot-scope="scope">
            <el-button
              style="margin-right: 15px"
              @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              confirm-button-text="好的"
              cancel-button-text="不用了"
              icon="el-icon-info"
              icon-color="red"
              title="这一行数据确定删除吗？"
              @confirm="handleDelete(scope.$index, scope.row)"
            >
              <el-button slot="reference" type="danger">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :total="total"
        style="margin-top: 20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
// 引入 CommonTag 组件
import CommonTag from "@/components/CommonTag.vue";
import { getUserData } from "@/api";

export default {
  data() {
    // 定义组件数据
    return {
      dialogVisible: false, // 控制对话框的显示和隐藏
      form: {
        id: null,
        // 表单数据
        name: "",
        age: null,
        gender: "",
        date: "",
        address: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        age: [
          {
            type: "number",
            required: true,
            message: "请输入年龄",
            trigger: "blur",
          },
        ],
        gender: [{ message: "请输入性别", trigger: "change" }],
        date: [{ required: true, message: "请选择时间", trigger: "change" }],
        address: [
          { required: false, message: "请输入地址", trigger: "change" },
        ],
      },
      tableData: [
        {
          name: "薛超",
          age: 48,
          gender: "male",
          date: "1995-06-18",
          address: "河南省 新乡市 原阳县",
        },
        {
          name: "姚刚",
          age: 34,
          gender: "male",
          date: "1990-08-15",
          address: "江苏省 连云港市 赣榆县",
        },
        {
          name: "刘艳",
          age: 35,
          gender: "male",
          date: "1985-11-09",
          address: "云南省 西双版纳傣族自治州 其它区",
        },
        {
          name: "文明",
          age: 30,
          gender: "male",
          date: "1988-05-29",
          address: "海外 海外 -",
        },
        {
          name: "董勇",
          age: 38,
          gender: "female",
          date: "1987-09-21",
          address: "陕西省 西安市 灞桥区",
        },
        {
          name: "苏涛",
          age: 29,
          gender: "female",
          date: "2006-10-04",
          address: "四川省 巴中市 南江县",
        },
        {
          name: "廖芳",
          age: 21,
          gender: "male",
          date: "1988-02-25",
          address: "江西省 鹰潭市 贵溪市",
        },
        {
          name: "康敏",
          age: 42,
          gender: "male",
          date: "2014-01-11",
          address: "山东省 日照市 东港区",
        },
        {
          name: "邱磊",
          age: 48,
          gender: "female",
          date: "1982-09-08",
          address: "香港特别行政区 九龙 观塘区",
        },
        {
          name: "傅杰",
          age: 38,
          gender: "female",
          date: "2010-09-18",
          address: "陕西省 榆林市 神木县",
        },
        {
          name: "龙勇",
          age: 50,
          gender: "male",
          date: "1979-11-01",
          address: "甘肃省 庆阳市 合水县",
        },
        {
          name: "史霞",
          age: 49,
          gender: "male",
          date: "2005-01-29",
          address: "澳门特别行政区 离岛 -",
        },
        {
          name: "郝平",
          age: 38,
          gender: "female",
          date: "1970-11-29",
          address: "香港特别行政区 九龙 观塘区",
        },
        {
          name: "毛霞",
          age: 44,
          gender: "male",
          date: "2003-04-11",
          address: "湖北省 荆州市 荆州区",
        },
        {
          name: "魏超",
          age: 23,
          gender: "female",
          date: "2013-06-06",
          address: "甘肃省 甘南藏族自治州 其它区",
        },
        {
          name: "黄磊",
          age: 46,
          gender: "female",
          date: "2009-07-24",
          address: "天津 天津市 河西区",
        },
        {
          name: "宋芳",
          age: 31,
          gender: "female",
          date: "1972-05-10",
          address: "四川省 泸州市 叙永县",
        },
        {
          name: "廖娜",
          age: 29,
          gender: "male",
          date: "2021-03-19",
          address: "重庆 重庆市 黔江区",
        },
      ],
      currentPage: 1, // 当前页码，默认为第一页
      pageSize: 6, // 每页显示的数据量，默认为 6
      keyword: "", // 搜索关键字
    };
  },
  computed: {
    total() {
      // 总共的数据量，通过计算属性计算得出
      return this.searchData.length;
    },
    searchData() {
      return this.tableData.filter(
        (item) =>
          item.gender.includes(this.keyword) ||
          item.name.includes(this.keyword) ||
          item.address.includes(this.keyword) ||
          item.date.includes(this.keyword) ||
          item.age.toString().includes(this.keyword)
      );
    },
  },
  methods: {
    onSubmit() {
      // 表单提交函数，验证表单是否合法，合法则清空表单并隐藏对话框
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.tableData.some((item) => {
            if (item.id == this.form.id) item = this.form;
          });
          this.form = {
            // 表单数据
            name: "",
            age: null,
            gender: "",
            date: "",
            address: "",
            id: null,
          }; // 重置表单数据
          this.dialogVisible = false; // 隐藏对话框
        }
      });
    },
    handleClose() {
      // 对话框关闭函数，清空表单并隐藏对话框

      this.form = {
        // 表单数据
        name: "",
        age: null,
        gender: "",
        date: "",
        address: "",
        id: null,
      };
      this.dialogVisible = false; // 隐藏对话框
    },
    handleEdit(index, row) {
      this.form = row;
      this.dialogVisible = true;
    },
    handleDelete(index, row) {
      this.tableData.some((item, index) => {
        if (item.id == row.id) {
          this.tableData.splice(index, 1); // 使用 splice() 直接删除该元素
          return true; // 返回 true，表示找到了符合条件的元素
        }
      });
    },
  },
  mounted() {
    getUserData().then((res) => {
      console.log(res);
      this.tableData = res.data;
    });
  },
  components: { CommonTag }, // 注册 CommonTag 组件
};
</script>

<style lang="less" scoped>
.el-row {
  .el-input {
    width: 20%;
  }
}
</style>