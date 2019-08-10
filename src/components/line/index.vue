<template>
  <div class="line-wrapper">
    <div id="line"></div>
  </div>
</template>


<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/line");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    subtext:{
      type: String,
      default: ""
    },
    xAxisData: {
      type: Array,
      default: ""
    },
    seriesData: {
      type: Array,
      default: ""
    }
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
      let myChart = echarts.init(document.getElementById("line"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.title,
          subtext: this.subtext,
          x: "center",
          textStyle: {
            color: "#6eabf0",
            fontSize: 18,
            fontWeight:400
          }
        },
        textStyle: {
          fontSize:12,
          color: '#6eabf0'
        },
        xAxis: {
          type: "category",
          splitNumber:0,
          axisLabel:{
            margin:10,
          },
          data: this.xAxisData,
        },
        yAxis: {
          show:false,
          type: "value",
        },
        series: [
          {
            data: this.seriesData,
            type: "line",
            smooth: true
          }
        ]
      });
    }
  },
  watch:{
    xAxisData(){
      this.drawLine();
    },
    seriesData(){
      this.drawLine();
    }
  }
};
</script>


<style lang="scss" scoped>
.line-wrapper {
  /* padding: 0 20px; */
  width: 100%;
  overflow: hidden;
  #line {
    width: 400px;
    height: 400px;
    /* border: 1px solid red; */
    margin: 0 auto;
  }
}
</style>
