<template>
  <div class="radar-wrapper">
    <div id="radar"></div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/radar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    value:{
      type:Array,
      default:""
    },
    indicator:{
      type:Array,
      default:""
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("radar"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.title,
        },
        legend: {
            data: ['门派场数', '实际开销（Actual Spending）']
        },
        radar: {
          name: {
            textStyle: {
              color: "#6eabf0",
            }
          },
          indicator: this.indicator
        },
        series: [
          {
            type: "radar",
            areaStyle: {normal: {}},
            data: [
              {
                value: this.value,
                name: "门派场数"
              }
            ]
          }
        ]
      });
    }
  },
   watch:{
    indicator(){
      this.drawLine();
    },
    value(){
      this.drawLine();
    }
  }
};
</script>


<style lang="scss" scoped>
.radar-wrapper {
  /* padding: 0 20px; */
  width: 100%;
  overflow: hidden;
  #radar {
    width: 400px;
    height: 400px;
    /* border: 1px solid red; */
    margin: 0 auto;
  }
}
</style>
