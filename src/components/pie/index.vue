<template>
  <div class="radar-wrapper">
    <div id="pie"></div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/pie");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    data: {
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
      let myChart = echarts.init(document.getElementById("pie"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.title,
          // subtext: "出战率(%)",
          x: "center",
          textStyle: {
            color: "#6eabf0",
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : 出战数{c}， 出战率({d}%)"
        },
        series: [
          {
            name: "出战统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: this.data,
            itemStyle: {
              emphasis: {
                shadowBlur: 5,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  },
   watch:{
    data(){
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
  #pie {
    width: 400px;
    height: 400px;
    /* border: 1px solid red; */
    margin: 0 auto;
  }
}
</style>
