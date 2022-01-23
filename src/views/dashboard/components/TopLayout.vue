<!--
 * @Descripttion: 
 * @version: 
 * @Author: Lqi
 * @Date: 2022-01-20 16:00:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-20 17:34:20
-->
<template>
  <el-row :gutter="24">
    <el-col :span="6" :xs="24" :md="12" :sm="12" :lg="6">
      <CusCard>
        <template #header>
          <div class="header">
            <span>总销售额</span>
            <a class="ops">
              <i class="el-icon-more"></i>
            </a>
          </div>
        </template>
        <div class="body">
          <div class="money">
            <div>
              <span class="CNY">￥</span><span class="num">7,985,255</span>
            </div>
            <div class="order">
              <span>共 26954 笔订单</span>
            </div>
          </div>
          <div id="data1" ref="chartData1" class="chart-wrap"></div>
        </div>
        <div class="cus-card-footer">
          <span class="footer-text"
            >周同比： 21.6%<i class="el-icon-caret-top num-up"></i>
          </span>
          <span class="footer-text"
            >日同比： 4.2%<i class="el-icon-caret-bottom num-down"></i>
          </span>
        </div>
      </CusCard>
    </el-col>
    <el-col :span="6" :xs="24" :md="12" :sm="12" :lg="6">
      <CusCard>
        <template #header>
          <div class="header">
            <span>访问量</span>
            <a class="ops">
              <i class="el-icon-more"></i>
            </a>
          </div>
          <div class="body" style="height: 134px">
            <div class="money">
              <div>
                <span class="num">2,785,298</span>
              </div>
            </div>
            <div
              id="data2"
              ref="chartData2"
              class="chart-wrap"
              style="margin-top: 26px"
            ></div>
          </div>
          <div class="cus-card-footer">
            <span class="footer-text">日访问量： 14,264<i></i> </span>
            <span class="footer-text"
              >日同比： 2.6%<i class="el-icon-caret-top num-up"></i>
            </span>
          </div>
        </template>
      </CusCard>
    </el-col>
    <el-col :span="6" :xs="24" :md="12" :sm="12" :lg="6">
      <CusCard>
        <template #header>
          <div class="header">
            <span>新增用户</span>
            <a class="ops">
              <i class="el-icon-more"></i>
            </a>
          </div>
        </template>
        <div class="body" style="height: 134px">
          <div class="flex-column">
            <div class="money">
              <span class="num">1,233</span>
            </div>
            <div
              id="data3"
              ref="chartData3"
              class="chart-wrap"
              style="margin-top: 26px"
            ></div>
          </div>
        </div>
        <div class="cus-card-footer">
          <span class="footer-text"
            >周同比： 7.6%<i class="el-icon-caret-bottom num-down"></i>
          </span>
          <span class="footer-text"
            >日同比： 1.2%<i class="el-icon-caret-top num-up"></i>
          </span>
        </div>
      </CusCard>
    </el-col>
    <el-col :span="6" :xs="24" :md="12" :sm="12" :lg="6">
      <CusCard>
        <template #header>
          <div class="header">
            <span>运营活动效果</span>
            <a class="ops">
              <i class="el-icon-more"></i>
            </a>
          </div>
        </template>
        <div class="body" style="height: 134px">
          <div class="flex-column">
            <div class="money">
              <span class="num">14,822</span>
            </div>
          </div>
          <div class="chart-wrap" style="margin-top: 32px">
            <el-progress
              :text-inside="true"
              :stroke-width="18"
              :percentage="80"
              status="success"
            ></el-progress>
          </div>
        </div>
        <div class="cus-card-footer">
          <span class="footer-text"
            >周同比： 21.6%<i class="el-icon-caret-top num-up"></i>
          </span>
          <span class="footer-text"
            >日同比： 4.2%<i class="el-icon-caret-top num-up"></i>
          </span>
        </div>
      </CusCard>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch, nextTick, ref } from "vue";
import CusCard from "@/components/CusCard/CusCard.vue";
import * as echarts from "echarts";
import { useAppStore } from "@/store/modules/app";

const useApp = useAppStore();
let data1: any = null;
let data2: any = null;
let data3: any = null;
const chartData1: any = ref<HTMLElement | null>(null);
const chartData2: any = ref<HTMLElement | null>(null);
const chartData3: any = ref<HTMLElement | null>(null);
const data1Ops = {
  color: "#409EFF",
  grid: {
    x: "0", // x 偏移量
    y: "7%", // y 偏移量
    width: "100%", // 宽度
    height: "79%", // 高度
  },
  xAxis: {
    type: "category",
    data: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10", "T11"],
    show: false,
  },
  yAxis: {
    type: "value",
    show: false,
  },
  series: [
    {
      data: [120, 130, 113, 80, 100, 136, 170, 200, 230, 211, 200, 184, 50],
      type: "bar",
    },
  ],
};

const data2Ops = {
  grid: {
    x: "0",
    y: "7%",
    width: "100%",
    height: "79%",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9", "t10"],
    show: false,
  },
  yAxis: {
    type: "value",
    show: false,
  },
  series: [
    {
      name: "Line 5",
      type: "line",
      stack: "总量",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      label: {
        show: true,
        position: "top",
      },
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(128, 255, 165)",
          },
          {
            offset: 1,
            color: "rgba(1, 191, 236)",
          },
        ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [220, 302, 181, 234, 210, 290, 150, 300, 310, 336],
    },
  ],
};

const data3Ops = {
  grid: {
    x: "1%",
    y: "7%",
    width: "98%",
    height: "79%",
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    show: false,
  },
  yAxis: {
    type: "value",
    show: false,
  },
  series: [
    {
      name: "样例3",
      type: "line",
      itemStyle: {
        width: 2,
        type: "solid",
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#0000FF",
          },
        ]),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "rgba(80,141,255,0.39)",
          },
          {
            offset: 0.34,
            color: "rgba(56,155,255,0.25)",
          },
          {
            offset: 1,
            color: "rgba(38,197,254,0.00)",
          },
        ]),
      },
      data: [450, 432, 401, 454, 590, 530, 642],
    },
  ],
};
onMounted(() => {
  data1 = echarts.init(chartData1.value);
  data2 = echarts.init(chartData2.value);
  data3 = echarts.init(chartData3.value);
  reDraw();
  window.addEventListener("resize", () => {
    data1.resize();
    data2.resize();
    data3.resize();
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", data1.resize());
  window.removeEventListener("resize", data1.resize());
  window.removeEventListener("resize", data1.resize());
});
watch(
  () => useApp.sidebar.opened,
  () => {
    nextTick(() => {
      reDraw();
    });
  }
);
const reDraw = () => {
  data1.setOption(data1Ops);
  data2.setOption(data2Ops);
  data3.setOption(data3Ops);
};
</script>
<style lang="scss" scoped>
.cus-card-footer {
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 4px;
  .footer-text {
    font-size: 14px;
    line-height: 22px;
    margin-right: 12px;
    color: rgba(0, 0, 0, 0.85);
    white-space: nowrap;
    i {
      &.num-up {
        color: #f56c6c;
      }
      &.num-down {
        color: #67c23a;
      }
    }
  }
}
</style>
