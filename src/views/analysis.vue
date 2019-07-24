<template>
  <div class="analysis">
    <h2>队伍信息查询</h2>
    <div class="search">
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
      per_page:20
    }
  },
  methods:{
    search(query){
      // console.log(query)
      this.query = query
    },
    clickTeam(){
      const query = this.query
      this._getVideoList(query)
        .then(data=>{
          this.query = query
          this.setAnalysisList(data)
          console.log(data)
          this.$router.push({
            path:`/analysis-details/${query}`
          })
          // alert('搜索成功，正在跳转分析！')
        })
        .catch(err=>{
          this.query = query
          alert('搜索失败！')
        })
      this.query = ''
    },
    _getVideoList(query){
      return new Promise((resolve,reject)=>{
        getVideoList(query,this.page,this.per_page).then(res=>{
          if(res.status & res.data.length>0){
            // console.log(res.data)
            const data = this._normalVideos(res.data)
            resolve(data)
          }else{
            reject('搜索结果失败')
          }
        })
      })
    },
    _normalVideos(list){
      const ret = []
      list.forEach(videoData=>{
        if(videoData.etc_info && videoData.video){
          ret.push(createVideo(videoData))
        }
      })
      return ret
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
  .search {
    width: 80%;
    height: 45px;
    border: 1px solid #ffba5b;
    color:#ffba5b;
  }
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
