<template>
  <div class="rank-wrapper"  :style="bgImage">
    <div class="search">
      <search-box></search-box>
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
          <tr v-for="item in rankList" :key="item.team_id">
            <td>{{item.rank}}</td>
            <td>{{item.pk_region}}</td>
            <td>{{item.team_name}}</td>
            <td>{{item.score}}</td>
            <td>{{item.win_count}}</td>
            <td>{{item.win_total_time}}</td>
          </tr>
        </tbody>
      </table>
      <div class="page">
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
      num_per_page: 20,
      total_page:-1
    }
  },
  computed:{
    bgImage(){
      return `background-image:url(${bgImage})`
    }
  },
  created(){
    this._getRankList({region:this.region})
  },
  methods:{
    prev(){
      let page_no = --this.page_no
      if(page_no <= this.total_page){
        return this._getRankList({ page:page_no,region:this.region})
      }else{
        this.page_no = 1
      }
      
    },
    next(){
      let page_no = ++this.page_no
      if(page_no <= this.total_page){
        return this._getRankList({ page:page_no,region:this.region})
      }else{
        this.page_no = this.total_page
      }
    },
    _getRankList(info){
      getRankList(info).then(res=>{
        if(res.success){
          this.rankList = res.data
          if(this.total_page === -1){
            this.total_page = res.total_page
          }
          console.log(res.total_page)
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
  height: 100vh;
  background-repeat: no-repeat;
  overflow: hidden;
}

.search{
  margin: 10px;
  box-sizing: border-box;
  background: transparent;
  border: 1px solid #ffba5b;
  /* box-shadow:2px 2px 5px #e5e5e5; */

}


.rank-list {
  margin-bottom: 35px;
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
