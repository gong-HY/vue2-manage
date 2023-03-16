<template>
  <div>
    <el-row>
      <el-col :span="8" style="padding-right: 10px">
        <common-tag></common-tag>
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/1.jpg" alt="" />
            <div class="user-info">
              <p id="name">龚浩源</p>
              <p id="access">
                {{ identify == "admin-token" ? "管理员" : "普通用户" }}
              </p>
            </div>
          </div>
          <div class="login-info">
            <p id="time">上次登录时间：<span>2021-7-19</span></p>
            <p id="address">上次登录地点：<span>武汉</span></p>
          </div>
        </el-card>
        <el-card class="table">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            max-height="305px"
          >
            <el-table-column prop="name" label="品牌"> </el-table-column>
            <el-table-column prop="todayBuy" label="日销"> </el-table-column>
            <el-table-column prop="monthBuy" label="月销"> </el-table-column>
            <el-table-column prop="totalBuy" label="总销"> </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16" style="padding-left: 10px">
        <div class="num">
          <el-card
            v-for="item in countData"
            :key="item.name"
            :body-style="{ padding: '0px', display: 'flex' }"
          >
            <i
              :class="`el-icon-${item.icon} icon`"
              :style="{ background: item.color }"
            ></i>
            <div class="info">
              <p id="value">￥{{ item.value }}</p>
              <p id="title">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 260px; margin-top: 15px">
          <div id="echart1" ref="echart1"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 210px">
            <div id="echart2" ref="echart2"></div>
          </el-card>
          <el-card style="height: 210px">
            <div id="echart3" ref="echart3"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getHomeData } from "@/api/index";
import CommonTag from "@/components/CommonTag.vue";
export default {
  data() {
    return {
      tableData: [
        {
          name: "小米",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "三星",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "魅族",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "vivo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "oppo",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
        {
          name: "苹果",
          todayBuy: 100,
          monthBuy: 300,
          totalBuy: 800,
        },
      ],
      countData: [
        {
          name: "今日支付订单",
          value: 1334,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 1334,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1334,
          icon: "s-goods",
          color: "skyblue",
        },
        {
          name: "本月支付订单",
          value: 1334,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1334,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1334,
          icon: "s-goods",
          color: "skyblue",
        },
      ],
      userData: [],
      binData: [], // 饼图数据
    };
  },
  computed: {
    todayBuys() {
      return this.tableData.map((obj) => obj["todayBuy"]);
    },
    monthBuys() {
      return this.tableData.map((obj) => obj["monthBuy"]);
    },
    totalBuys() {
      return this.tableData.map((obj) => obj["totalBuy"]);
    },
    identify() {
      return localStorage.getItem("token");
    },
  },

  mounted() {
    const phoneEchart = echarts.init(this.$refs.echart1);
    const userEchart = echarts.init(this.$refs.echart2);
    const binEchart = echarts.init(this.$refs.echart3);

    getHomeData().then((res) => {
      this.tableData = res.data.tableData;
      this.countData = res.data.countData;
      this.userData = res.data.userData;
      this.binData = res.data.binData;
      // 配置图表参数
      const phoneOption = {
        grid: {
          left: "5%",
          top: "6%",

          width: "92%",
          height: "80%",
        },
        tooltip: {},
        legend: {
          data: ["日销量", "月销量", "总销量"],
        },
        xAxis: {
          data: ["小米", "三星", "魅族", "vivo", "oppo", "苹果"],
        },
        yAxis: {},
        series: [
          {
            name: "日销量",
            type: "line",
            data: this.todayBuys,
          },
          {
            name: "月销量",
            type: "line",
            data: this.monthBuys,
          },
          {
            name: "总销量",
            type: "line",
            data: this.totalBuys,
          },
        ],
      };
      const userOption = {
        tooltip: {},
        legend: {
          data: ["新增用户", "活跃用户"],
        },
        grid: {
          left: "0%",
          top: "0%",

          width: "92%",
          height: "80%",
        },
        xAxis: {
          type: "category",
          data: this.userData.map((item) => item.name),
        },
        yAxis: { min: 0, max: 1000 },
        series: [
          {
            name: "新增用户",
            type: "bar",
            data: this.userData.map((item) => item.value1),
          },
          {
            name: "活跃用户",
            type: "bar",
            data: this.userData.map((item) => item.value2),
          },
        ],
      };
      const binOption = {
        title: {
          text: "品牌占比",
          left: "center",
        },
        tooltip: {},
        legend: {
          orient: "vertical",
          left: 10,
          data: ["三星", "小米", "魅族", "苹果", "vivo", "oppo"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.binData,
          },
        ],
      };

      // 渲染图表
      phoneEchart.setOption(phoneOption);
      userEchart.setOption(userOption);
      binEchart.setOption(binOption);
    });
  },
  components: {
    CommonTag,
  },
};
</script>

<style lang='less' scoped>
.box-card {
  .user {
    padding: 0 0 20px 0;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #bfbfbf;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    .user-info {
      margin-left: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      #name {
        font-size: 30px;
        margin-bottom: 20px;
      }
      #access {
        font-size: 14px;
      }
    }
  }
  .login-info {
    font-size: 14px;
    #time {
      padding-top: 20px;
      color: #5d5d5d;
      span {
        padding-left: 40px;
        color: #000;
      }
    }
    #address {
      padding-top: 10px;
      color: #5d5d5d;
      span {
        padding-left: 40px;
        color: #000;
      }
    }
  }
}
.table {
  margin-top: 30px;
}
.num {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
  row-gap: 16px;
  column-gap: 10px;
  .icon {
    width: 65px;
    height: 65px;
    color: #fff;
    font-size: 33px;
    text-align: center;
    line-height: 70px;
  }
  .info {
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    #value {
      font-size: 24px;
      padding-bottom: 8px;
    }
    #title {
      font-size: 14px;
      color: #7a7a7a;
    }
  }
}
#echart1 {
  width: 800px;
  height: 250px;
}
.graph {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
    #echart2 {
      width: 400px;
      height: 200px;
    }
    #echart3 {
      width: 400px;
      height: 200px;
    }
  }
}
</style>