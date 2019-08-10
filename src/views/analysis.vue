<template>
  <div class="analysis">
    <h2>队伍信息查询</h2>
    <div class="wrapper">
      <select @change="yearItem" :value="year">
        <option :value="year" v-for="(year) in yearList" :key="year">全民pk{{year}}</option>
      </select>
      <search placeholder="请输入需要分析的队伍全名" @search="search"></search>
    </div>
    <button @click="clickTeam" :disabled="query.length<1">点击分析</button>
  </div>
</template>

<script>

import search from '@/components/search-box'
import {getVideoList} from '@/api/video-list'
import {createVideo} from '@/common/js/video'
import {Getter,mapMutations} from 'vuex'
export default {
  data(){
    return {
      query:'',
      page:1,
      per_page:20,
      year:'2019',
      yearList:[
        '2018',
        '2019'
      ]
    }
  },
  methods:{
    search(query){
      // console.log(query)
      this.query = query
    },
    clickTeam(){
      const query = this.query.trim()
      this._getVideoList(query)
        .then(data=>{
          this.query = query
          this.setAnalysisList(data)
          // console.log(data)
          this.$router.push({
            path:`/analysis-details/${query}`
          })
          // alert('搜索成功，正在跳转分析！')
        })
        .catch(err=>{
          this.query = query
          alert(err)
        })
      this.query = ''
    },
    yearItem(e){
      this.year = e.target.value
      // this.$refs.search.clearInput()
    },
    _getVideoList(query){
      return new Promise((resolve,reject)=>{
        getVideoList(query,this.page,this.per_page).then(res=>{
          if(res.status & res.data.length>0){
            // console.log(res.data)
            const data = typeof this._normalVideos(res.data) === 'string'?reject(this._normalVideos(res.data)):resolve(this._normalVideos(res.data))
          }else{
            reject('找不到对应名称，请输入全称重试！')
          }
        })
      })
    },
    _normalVideos(list){
      const ret = []
      list.forEach(videoData=>{
        if(videoData.etc_info && videoData.video && videoData.region1.includes(this.year)){
          ret.push(createVideo(videoData))
        }
      })
      return ret.length === 0?`${this.year}年度PK无对应战队，请重新选择年份或战队名`:ret
    },
    ...mapMutations({
      setAnalysisList:'SET_ANALYSIS_LIST'
    })
  },
  components:{
    search
  }
}
</script>


<style lang="scss" scoped>

.analysis {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #191827;
  min-height: 94vh;
  overflow: hidden;
  h2 {
    font-size: 2em;
    color:#ffba5b;
    margin: 50px 0 35px;
  }
  .wrapper {
    width: 80%;
    display: flex;
    /* justify-content: space-between; */
    color: #ffba5b;
    border: 1px solid #ffba5b;
    select {
      color:inherit;
      padding: 0 5px;
      border: 1px solid transparent;
      border-right: 1px solid #ffba5b;
      border-radius: 0;
      background: transparent;
      text-align: center;
      text-align-last: center;
    }
    .search{
      /* flex: 1; */
      width: 100%;
      margin: 10px;
      box-sizing: border-box;
      background: transparent;
      border: 1px solid transparent;
      /* border: 1px solid #ffba5b; */
      border-radius: 5px;
      /* box-shadow:2px 2px 5px #e5e5e5; */
    }
  }
  /* .search {
    width: 80%;
    height: 45px;
    border: 1px solid #ffba5b;
    color:#ffba5b;
  } */
  button {
    height: 50px;
    width: 215px;
    background: #ffba5b;
    color: #191827;
    border: none;
    border-radius: 4px;
    margin-top: 20px;
    font-size: 16px;
  }
}
</style>
