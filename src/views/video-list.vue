<template>
  <div class="video-wrapper" ref="video">
    <div class="header-bg">
      <search-box @search="search" @clear="clearInput"></search-box>
    </div>
    <ul class="list-wrapper" ref="list">
      <li @click="selectItem(video,index)" v-for="(video,index) in videoList" :key="video.id">
        <div class="img-wrapper" >
          <i class="iconfont" :class="video.imgError?'img-error':'img-success'">&#xec0d;</i>
          <img  :src="video.cover" alt="" @error="imgError(index,video)">
          <span class="video-time">{{video.videoTime.videoTime}}</span>
        </div>
        <p class="text">{{winner(video.watching.team,video.winner)}} vs {{winner(video.other.team,video.winner)}}</p>
        <p class="time">{{video.match_time}}</p>
      </li>
    </ul>
    <div class="loading" v-show="loading" ref="loading">
      <loading :text="loadingText"></loading>
    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import {getVideoList} from '@/api/video-list.js'
import {ERR_OR} from '@/api/config'
import {createVideo} from '@/common/js/video'
import { debounce } from '@/common/js/util'
import SearchBox from '@/components/search-box'
import Loading from '@/components/loading'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { setTimeout, clearTimeout } from 'timers';

export default {
  data(){
    return {
      videoList:[],
      team:'',
      page:1,
      per_page:10,
      total_num:0,
      subgroup:'4',
      loading:true,
      loadingText:'加载中'
    }
  },
  computed:{
    ...mapGetters([
      'video'
    ])
  },
  created(){
    this._getVideoList(this.team,this.page,this.per_page)
    setTimeout(this.scroll,200)
  },
  methods:{
    selectItem(item,index){
      this.$router.push({
        path:`/details`
      })
      this.setVideo(item)
      // console.log(this.videoList.slice(0,10))
      this.recommendListAction({list:this.videoList.slice(0,10),currentVideo:item})
    },
    winner(name,winner){
      return name===winner?`${name}(胜)` : name
    },
    imgError(index,video){
      let videoList = this.videoList
      videoList[index].imgError = true
      this.setVideoList(videoList)
      this.recommendListAction({list:this.videoList.slice(0,10),currentVideo:video})
    },
    search(query){
      // console.log(query)
      this.team = query
      this.page = 1
      this.total_num = 0
      this.videoList = []
      this._getVideoList(query.trim())
    },
    clearInput(){
      this.query = ''
    },
    scroll(){
      window.onscroll = ()=>{
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;
          //滚动条到底部的条件
          if(scrollTop+windowHeight==scrollHeight){
            //写后台加载数据的函数
            // console.log("距顶部"+scrollTop+"可视区高度"+windowHeight+"滚动条总高度"+scrollHeight);
            if(Math.ceil((this.total_num / this.per_page) -30) >= this.page){
             debounce(this._getVideoList(this.team,++this.page,this.per_page,this.subgroup),500)
             this.$refs.loading.style.opacity = 1
             this.loading = true
             this.loadingText = '加载中'
            }else{
              this.loadingText = '没有了'
              // this.loading = true
              clearTimeout(this.timer)
              this.timer = setTimeout(()=>{
                this.loading = false
                this.$refs.loading.style.transform = 'translateY(-30px)'
                this.$refs.loading.style.opacity = 0
                this.$refs.video.style.marginBottom = '30px'
              },1000)
            }
          } 
        }
    },
    _getVideoList(team,page,per_page,subgroup){
      getVideoList(team,page,per_page,subgroup).then(res=>{
        if(res.status){
          this.total_num = res.total_num
          this.videoList = this.videoList.concat(this._normalVideos(res.data))
          this.setVideoList(this.videoList)
          // clearTimeout(this.timer)
          // this.timer = setTimeout(()=>{
          //   this.loading = false
          // },2000)
        }else{
          this.loadingText = '加载失败'
          // this.loading = false
        }
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
      setVideo:'SET_VIDEO',
      setVideoList:'SET_VIDEO_LIST',
      setRecommendList:'SET_RECOMMEND_VIDEO_LIST'
    }),
    ...mapActions([
      'recommendListAction'
    ])
  },
  components: {
    SearchBox,Loading
  }
}
</script>


<style lang="scss" scoped>


.video-wrapper {
  margin-bottom: 45px;
  transition: all .5s;
}


.header-bg {
  /* padding-top: 18%; */
  /* height: 100px; */
  width: 100%;
  /* background:url(https://xyq.res.netease.com/pc/zt/20190614111811//img/page1_1_329f120.jpg) no-repeat; */
  background-size: contain;
  color: #666;
}


.list-wrapper {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #f1f1f1;
}


.list-wrapper li{
  width: 48%;
  margin-bottom: 15px;
  padding: 5px;
  box-sizing:border-box;
  background: #fff;
  border-radius:2px;
}

.img-wrapper {
  position: relative;
  overflow: hidden;
}

.list-wrapper li img{
  width: 100%;
  min-width:100%;
  min-height: 7em;
  /* max-height:7em; */
  background: #333;
  border-radius:2px;
}

.img-error {
  position: absolute;
  font-size: 30px;
  color:#fff;
  top: 25%;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
}

.img-success {
  display: none;
}

.list-wrapper li .video-time {
  font-size: 12px;
  transform: scale(0.9);
  color:#fff;
  position: absolute;
  bottom:10px;
  right:10px;
}

.list-wrapper li p {
  text-align: center;
  margin-top: 5px;
}

.list-wrapper li .text {
  font-size: 12px;
  color:#333;
  line-height: 1.5em;
}

.list-wrapper li .time {
  font-size: 12px;
  color:#999;
  transform: scale(0.9);
}

.loading {
  width: 100px;
  margin: 0 auto;
  padding: 15px;
  transition: all .5s;
}

</style>
