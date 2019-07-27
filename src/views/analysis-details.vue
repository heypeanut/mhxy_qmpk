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
    </div>
    <div class="team">
      <h3>全部阵容</h3>
      <div v-for="(team,index) in details.most_team" :key="index">
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
    </div>
    <!-- <div class="pk_time">
      <h3>战斗时长</h3>
      <div class="time">
        <p>最长：70 : 02</p>
        <p>最短：19 : 28</p>
      </div>
    </div> -->

  </div>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";
import { schoolArr,schoolInstance,tactical } from "@/common/js/video";
// const squadArr = {
//   普通阵: ["无特效", "无特效", "无特效", "无特效", "无特效"],
//   天覆阵: [
//     "物法伤减速",
//     "物法伤减速",
//     "物法伤减速",
//     "物法伤减速",
//     "物法伤减速"
//   ],
//   地截阵: ["物法防", "物法防", "物法防", "物法防", "物法防"],
//   风扬阵: ["物法伤", "物法伤", "物法伤", "速度", "速度"],
//   云垂阵: ["物防减速", "物法防", "物法防", "速度", "速度"],
//   龙飞阵: ["法防", "物防", "法伤减速", "速度", "物法伤"],
//   虎翼阵: ["物法伤", "物法防", "物法防", "物法伤", "物法伤"],
//   鸟翔阵: ["速度", "速度", "速度", "速度", "速度"],
//   蛇蟠阵: ["法术躲避", "法术躲避", "法术躲避", "物法伤", "物法伤"],
//   鹰啸阵: ["物法防", "速度", "速度", "物法伤", "物法伤"],
//   雷绝阵: ["固伤", "固伤", "固伤", "物法伤", "物法伤"]
// };
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
  beforeDestroy() {
    console.log("销毁了");
    this.setAnalysisList([]);
  },
  computed: {
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
        most_team: this._normalMostTeam(playSchool.slice()) //最常用阵容
        // most_array:squad
      };
      console.log(this.details);
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
            tactical: this._tactical(item.original),
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
    _tactical(school) {
      const _school = [];
      let schoolStr = "";
      let results = ''
      // console.log(school);
      school.map(item => {
        _school.push(schoolInstance(schoolArr[item - 1]))
      });
    

      tactical.forEach((item,index)=>{
        // console.log(item)
        // if(index===0){
          results = this._tacticalComparison(item,_school)
          if(results.state){
            return results;
          }
        // }
      })

      return results;
    },
    _tacticalComparison(tactical,school){
      const results = []
      const instance = []
      let defense = 0 //防御
      let wg = 0  //物攻
      let fg = 0  //法攻
      let s = 0   //速度
      let avoid = 0 //躲避
      let fixed = 0 //固伤
      let group = true
      for(let i = 0;i<school.length;i++){
        // console.log('阵法')
        // console.log(tactical[i])
        // console.log('阵容')
        // console.log(school[i])

        wg = (tactical[i].wg - school[i].wg) >= 1 ? true : false
        fg = tactical[i].fg - school[i].fg >= 1 ? true : false
        s = tactical[i].s - school[i].s >= 1 ? true : false 
        defense = tactical[i].defense - school[i].defense >= 1 ? true : false
        avoid = tactical[i].avoid - school[i].avoid >= 1 ? true : false
        fixed = tactical[i].fixed - school[i].fixed >= 1 ? true : false
        tactical[i].group.findIndex(item=>{
          if(school[i].group.includes(item)){
            return group = true
          }else{
            return group = false
          }
        })

        instance.push({
          name:school[i].school,
          tactical:tactical[i].name,
          location:tactical[i].location,
          wg,fg,s,defense,avoid,fixed,group,
        })
      }

      instance.forEach(item=>{
        if(item.wg && item.group || item.fg && item.group && !item.s || item.s && item.group || item.defense && item.group){
          console.log(item)
          results.push(true)
        }else{
          results.push(false)
        }
      })
      let _true = 0
      results.forEach(item => {
        if(item){
          _true = ++_true
        }
      })
      console.log(_true)
      const tacticalName = _true>=3?instance[0].tactical:''
      // console.log(tacticalName)
      if(tacticalName){
        return {
          tacticalName,
          state:true
        }
      }else{
          return {
          tacticalName,
          state:false
        }
      }
     
    },
    ...mapMutations({
      setAnalysisList: "SET_ANALYSIS_LIST"
    })
  },
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
    padding: 0 0 15px;
    background: #1a154e;
    .time {
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
