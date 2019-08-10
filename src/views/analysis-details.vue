<template>
  <div class="analysis">
    <div class="header">
      <div class="title">
        <h2>{{details.name}}</h2>
        <p>队伍综合数据如下</p>
      </div>
      <div class="round">
        <p>综合胜率</p>
        <p>{{details.odds}}</p>
      </div>
    </div>
    <div class="team">
      <h3>门派信息</h3>
      <div>
        <ul>
          <li v-for="(team,index) in details.playSchool" :key="index+team">
            <div class="img">
              <img :src="team.ava" alt="">
            </div>
            <p>{{team.school}}</p>
          </li>
        </ul>
      </div>
      <radar :value="radarData.value" :indicator="radarData.indicator"></radar>
    </div>
    <div class="team">
      <h3>全部阵容</h3>
      <div v-for="(team,index) in details.most_team" :key="index">
        <h4>阵容 {{index+1}}</h4>
        <ul>
          <li v-for="(item,index) in team.school" :key="index+item">
            <div class="img">
              <img :src="item.ava" alt="">
            </div>
            <p>{{item.school}}</p>
          </li>
        </ul>
        <div class="wins">
          <p>上场：{{team.num}} 次</p>
          <p>胜场：{{team.winner}} 次</p>
          <p>胜率：{{Math.round((team.winner/team.num)*100)}}%</p>
        </div>
      </div>
      <pic title="阵容出战数据" :data="mostTeam"></pic>
    </div>
    <div class="pk_time">
      <line-figure 
        title="PK时长分析" 
        subtext="根据PK时长排序该队伍战斗时间（分钟）"
        :xAxisData="lineData.xAxisData"
        :seriesData="lineData.seriesData"
        ></line-figure>
      <div class="time">
        <p>战斗数：{{lineData.timer.length}}场</p>
        <p>最短：{{lineData.timer[0]}}分</p>
        <p>最长：{{lineData.timer[lineData.timer.length-1]}}分</p>
      </div>
    </div>

  </div>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
import { schoolArr, schoolInstance, tactical } from "@/common/js/video";
import Radar from "@/components/radar";
import Pic from "@/components/pie";
import LineFigure from "@/components/line";


export default {
  data() {
    return {
      details: {
        name: "",
        odds: 0
      }
    };
  },
  activated() {
    const { name } = this.$route.params;
    if (!this.analysis.length || !name) {
      this.$router.push("/analysis");
    } else {
      this.details.name = name;
      this.calculate();
    }
  },
  destroyed(){
    console.log('销毁了')
    this.setAnalysisList([]);
  },
  computed: {
    radarData() {
      const playSchool = this.details.playSchool;
      const auxiliary = ["普陀山", "化生寺", "无底洞", "阴曹地府"];
      const sealing = [
        "女儿村",
        "方寸山",
        "盘丝岭",
        "五庄观",
        "天宫",
        "无底洞"
      ];
      const physical = ["大唐官府", "狮驼岭", "五庄观", "凌波城", "花果山"];
      const element = ["龙宫", "魔王寨", "天宫", "神木林"];
      const tomb = ["女魃墓"];
      const machine = ["天机城"];
      const indicator = [
        {
          name: "辅助",
          max: 0
        },
        {
          name: "封系",
          max: 0
        },
        {
          name: "传统物理",
          max: 0
        },
        {
          name: "传统法系",
          max: 0
        },
        {
          name: "女魃墓",
          max: 0
        },
        {
          name: "天机城",
          max: 0
        }
      ];
      if(!playSchool){
        return false
      }
      playSchool.map(item => {
        if (auxiliary.includes(item.school)) {
          indicator[0]["max"] += item.num;
        }
        if (sealing.includes(item.school)) {
          indicator[1]["max"] += item.num;
        }
        if (physical.includes(item.school)) {
          indicator[2]["max"] += item.num;
        }
        if (element.includes(item.school)) {
          indicator[3]["max"] += item.num;
        }
        if (tomb.includes(item.school)) {
          indicator[4]["max"] += item.num;
        }
        if (machine.includes(item.school)) {
          indicator[5]["max"] += item.num;
        }
      });
      let value = [];
      let max = playSchool.sort((a, b) => {
        return a.num < b.num;
      });
      for (let i = 0; i < indicator.length; i++) {
        if (indicator[i].max === 0) {
          value.push(max.max);
        } else {
          value.push(indicator[i].max * 0.8);
        }
      }
      return {
        value,
        indicator
      };
    },
    mostTeam() {
      const most_team = this.details.most_team;
      const ret = [];
      if(!most_team){
        return false
      }
      most_team.map((item, index) => {
        ret.push({
          name: `阵容 ${index + 1}`,
          value: item.num
        });
      });
      return ret;
    },
    lineData(){
      const fighting_timer = this.details.fighting_timer
      const xAxisData = []
      const seriesData = []
      const timer = []
      if(!fighting_timer){
        return false
      }
      fighting_timer.map((item,index)=>{
        timer.push(item.videoTime.videoTime)
        xAxisData.push(parseInt(item.videoTime.videoTime))
        seriesData.push(item.videoTime.original)
      })
      return {
        xAxisData:xAxisData,
        seriesData:seriesData,
        timer:timer
      }
    },
    ...mapGetters(["analysis"])
  },
  methods: {
    calculate() {
      const analysis = this.analysis.slice();
      const { name } = this.details;
      let odds = 0;
      let playSchool = [];
      let year = true;
      analysis.forEach(item => {
        // 统计胜率
        if (item.winner.includes(name)) {
          odds = ++odds;
        }
        year = item.region.includes(2018) || item.region.includes(2019);
        //取出队伍信息
        if (item.other.team.includes(name) && year) {
          playSchool.push({ team: item.other, winner: item.winner });
        }
        if (item.watching.team.includes(name) && year) {
          playSchool.push({ team: item.watching, winner: item.winner });
        }
      });
      // console.log(playSchool)
      //返回数据
      this.details = {
        odds: Math.round(odds / analysis.length * 100) + "%", //总胜率
        name: name, //名字
        playSchool: this._normalPlaySchool(playSchool.slice()), //上场门派
        most_team: this._normalMostTeam(playSchool.slice()), //最常用阵容
        fighting_timer: this._normalFightingTimer(analysis.slice()) //战斗时长统计
        // most_array:squad
      };
      // console.log(this.details);
    },
    _normalPlaySchool(list) {
      //处理上场门派
      const ret = [];
      list.map(item => {
        item.team["school"].forEach(school => {
          if (ret[school] && ret[school]["school"] === school) {
            ret[school] = {
              school: school,
              ava: `http://img.nnh206.vip/${school}.png`,
              num: ++ret[school].num
            };
          } else {
            ret[school] = {
              school: school,
              ava: `http://img.nnh206.vip/${school}.png`,
              num: 1
            };
          }
        });
      });
      const retArr = [];

      for (let key in ret) {
        retArr.push(ret[key]);
      }

      return retArr;
    },
    _normalMostTeam(list) {
      //处理最常用阵容
      const _list = list;
      const school = [];
      let ret = {};
      // 拿出所有的阵容原始数据进行排序
      _list.forEach(item => {
        let _school =
          item.team["_school"] instanceof Array
            ? item.team["_school"].slice()
            : [];
        school.push({
          original: item.team._school,
          school: _school.sort((a, b) => {
            return a - b;
          }),
          tactical: [],
          winner: item.winner
        });
      });
      //进行出战数统计
      school.forEach(item => {
        if (
          ret[item.school.join()] &&
          ret[item.school.join()]._school === item.school.join() &&
          item.school.length !== 0
        ) {
          ret[item.school.join()] = {
            _school: item.school.join(),
            num: ++ret[item.school.join()].num,
            winner: item.winner.includes(this.details.name)
              ? ++ret[item.school].winner
              : ret[item.school].winner,
            original: item.original,
            school: (() => {
              const _school = item.school;
              const newSchool = [];
              _school.map(item => {
                newSchool.push({
                  school: schoolArr[item - 1],
                  ava: `http://img.nnh206.vip/${schoolArr[item - 1]}.png`
                });
              });
              return newSchool;
            })()
          };
        } else if (item.school.length !== 0) {
          ret[item.school.join()] = {
            _school: item.school.join(),
            school: (() => {
              const _school = item.school;
              const ret = [];
              _school.map(item => {
                ret.push({
                  school: schoolArr[item - 1],
                  ava: `http://img.nnh206.vip/${schoolArr[item - 1]}.png`
                });
              });
              return ret;
            })(),
            num: 1,
            original: item.original,
            winner: item.winner.includes(this.details.name) ? 1 : 0
          };
        }
      });

      //转换数据结构
      const retArr = [];
      for (let key in ret) {
        retArr.push(ret[key]);
      }

      //排序
      retArr.sort((a, b) => {
        return a.num - b.num;
      });
      return retArr.reverse();
    },
    _normalFightingTimer(list) {
      const _list = list.sort((a, b) => {
        return a.videoTime.original - b.videoTime.original;
      });
      // console.log(_list);
      return _list
      // _list.map((item,index)=>{
      //   console.log(item.original)
      // })
    },
    ...mapMutations({
      setAnalysisList: "SET_ANALYSIS_LIST"
    })
  },
  components: {
    Radar,
    Pic,
    LineFigure,
  }
};
</script>



<style lang="scss" scoped>
.analysis {
  /* min-height: 100vh  ; */
  background-color: #191827;
  color: #6eabf0;
  /* padding-bottom: 70px; */
  position: fixed;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  z-index: 1000;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  h3 {
    text-align: center;
    font-size: 1.2em;
    padding: 15px;
  }
  h4 {
    text-align: center;
    font-size: 1.2em;
    padding: 0 0 15px;
  }
  .header {
    overflow: hidden;
    background: #1a154e;
    padding: 20px 0 20px;
    .title {
      text-align: center;
      h2 {
        font-size: 1.5em;
        line-height: 2em;
      }
    }
    .round {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 120px;
      margin: 20px auto 0;
      border: 2px solid #6eabf0;
      border-radius: 50%;
      line-height: 1.5em;
    }
  }
  .team {
    /* .type {
      border-bottom: 1px dashed #6eabf0;
      margin-bottom: 15px;
    } */
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 10px;
      font-size: 14px;
      li {
        width: 20%;
        text-align: center;
        /* margin-right: 12px; */
        margin-bottom: 15px;
        .img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          overflow: hidden;
          margin: 0px auto 10px;
          img {
            display: block;
            height: 100%;
          }
        }
      }
    }
    .wins {
      font-size: 14px;
      margin: -10px 0 30px;
      padding: 15px 0;
      display: flex;
      justify-content: space-around;
      /* border-top:1px solid #6eabf0; */
      border-bottom: 1px solid #6eabf0;
    }
  }
  .pk_time {
    margin-top: -50px;
    padding: 0 0 25px;
    /* background: #1a154e; */
    .time {
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      margin-top: -15px;
    }
  }
}
</style>
