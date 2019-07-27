<template>
  <div class="rank-wrapper"  :style="bgImage">
    <div class="search-wrapper">
      <select @change="regionItem" :value="region">
        <option :value="region" v-for="(region,index) in regionList" :key="region">{{region}}</option>
      </select>
      <select @change="pkType" :value="pk_type_arr[pk_type-1]">
        <option value ="排位赛">排位赛</option>
        <option value ="进阶赛">进阶赛</option>
      </select>
      <div class="search">
        <search-box @search="search" @clear="clearInput" ref="search"></search-box>
      </div>
    </div>
    <div class="rank-list">
      <table class="rank-table">
        <tbody>
          <tr>
            <th>排行</th>
            <th>赛区</th>
            <th>队伍名字</th>
            <th>积分</th>
            <th>胜场</th>
            <th>总耗时</th> 
          </tr>
          <tr v-for="(item,index) in rankList" :key="index+item.team_id">
            <td>{{item.rank}}</td>
            <td>{{item.pk_region}}</td>
            <td>{{item.team_name}}</td>
            <td>{{item.score}}</td>
            <td>{{item.win_count}}</td>
            <td>{{item.win_total_time}}</td>
          </tr>
        </tbody>
      </table>
      <div class="page" v-show="!query">
        <span @click="prev">上一页</span>
        <span @click="next">下一页</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getRankList} from '@/api/rank'
import SearchBox from '@/components/search-box'
import bgImage from '@/common/images/rank.jpg'

export default {
  data(){
    return {
      rankList:[],
      team_name:'',
      region:'浙江赛区',
      page_no: 1,
      num_per_page: 25,
      total_page:-1,
      pk_type:1,
      period:'2019',
      pk_type_arr:['排位赛','进阶赛'],
      query:'',
      regionList:['两广赛区','闽赣赛区','中西赛区','东北华北赛区','浙江赛区','山东赛区','豫皖赛区','苏沪赛区']
    }
  },
  computed:{
    bgImage(){
      return `background-image:url(${bgImage})`
    }
  },
  created(){
    this._getRankList({region:this.region,num_per_page:this.num_per_page,period:this.period})
  },
  methods:{
    prev(){
      let page_no = --this.page_no
      if(page_no <= this.total_page){
        return this._getRankList({ page:page_no,region:this.region,num_per_page:this.num_per_page,period:this.period})
      }else{
        this.page_no = 1
      }
      
    },
    next(){
      let page_no = ++this.page_no
      if(page_no <= this.total_page){
        return this._getRankList({ page:page_no,region:this.region,num_per_page:this.num_per_page,period:this.period})
      }else{
        this.page_no = this.total_page
      }
    },
    search(query){
      this.query = query
      this._getRankList({ team_name:query,region:this.region,pk_type:this.pk_type,num_per_page:this.num_per_page,period:this.period})
    },
    clearInput(){
      this.query = ''
    },
    regionItem(e){
      this.region = e.target.value
      this.$refs.search.clearInput()
      this._getRankList({ region:e.target.value,pk_type:this.pk_type,num_per_page:this.num_per_page,period:this.period})
    },
    pkType(e){
      this.pk_type = e.target.value == '排位赛' ? 1 : 2
      console.log(e.target.value)
      this._getRankList({ region:this.region,pk_type:this.pk_type,num_per_page:this.num_per_page,team_name:this.query,period:this.period})
    },
    _getRankList(info){
      getRankList(info).then(res=>{
        if(res.success){
          this.rankList = res.data
          if(this.total_page === -1){
            this.total_page = res.total_page
          }
        }
      })
    }
  },
  components:{
    SearchBox
  }
}
</script>



<style lang="scss" scoped>

.rank-wrapper {
  height: auto;
  min-height: 92vh;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
}


.search-wrapper {
  display: flex;
  justify-content: space-around;
  color:#fff;
  color: #ffba5b;
  select {
    color:inherit;
    margin: 10px 0 10px 10px;
    border: 1px solid #ffba5b;
    background: transparent;
    text-align: center;
     text-align-last: center;
  }
  .search{
    width: 100%;
    margin: 10px;
    box-sizing: border-box;
    background: transparent;
    border: 1px solid #ffba5b;
    border-radius: 5px;
    /* box-shadow:2px 2px 5px #e5e5e5; */
  }
}



.rank-list {
  margin-bottom: 80px;
  color:#c8defb;
}

.rank-table {
  width: 95%;
  margin: 10px auto;
  tr {
    font-size: 13px;
    text-align: center;
    border: 1px solid #fff;
  }
  th {
    font-weight: 600;
    border: 1px solid #fff;
    padding: 8px;
  }
  td {
    border: 1px solid #fff;
    padding: 5px 0;
  }
}

.page {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  span {
    position:relative;
    &::before {
      content:'';
      position:absolute;
      top: -10px;
      right: -10px;
      bottom: -10px;
      left: -10px;
    }
  }
}
</style>
