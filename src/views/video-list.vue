<template>
  <div>
    <div class="header-bg">
      <search-box></search-box>
    </div>
    <ul class="list-wrapper">
      <li @click="selectItem(video)" v-for="video in videoList" :key="video.id">
        <div class="img-wrapper">
          <img :src="video.cover" alt="">
          <span class="video-time">{{video.videoTime}}</span>
        </div>
        <p class="text">{{winner(video.watching_team,video.winner)}} vs {{winner(video.other_team,video.winner)}}</p>
        <p class="time">{{video.match_time}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {getVideoList} from '@/api/video-list.js'
import {ERR_OR} from '@/api/config'
import {createVideo} from '@/common/js/video'
import SearchBox from '@/components/search-box'
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data(){
    return {
      videoList:[]
    }
  },
  computed:{
    ...mapGetters([
      'video'
    ])
  },
  created(){
    this._getVideoList()
  },
  methods:{
    selectItem(item){
      console.log(item)
      this.$router.push({
        path:`/video`
      })
      this.setVideo(item)
      this.recommendListAction({list:this.videoList,currentVideo:item})
    },
    winner(name,winner){
      return name===winner?`${name}(胜)` : name
    },
    _getVideoList(){
      getVideoList().then(res=>{
        if(res.status){
          this.videoList = this._normalVideos(res.data)
          this.setVideoList(this._normalVideos(res.data))
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
    SearchBox
  }
}
</script>


<style lang="scss" scoped>

.header-bg {
  /* padding-top: 18%; */
  /* height: 100px; */
  width: 100%;
  /* background:url(https://xyq.res.netease.com/pc/zt/20190614111811//img/page1_1_329f120.jpg) no-repeat; */
  background-size: contain;
}


.list-wrapper {
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background: #f1f1f1;
}


.list-wrapper li{
  width: 47%;
  margin-bottom: 15px;
  padding: 5px;
  box-sizing:border-box;
  background: #fff;
  border-radius:2px;
}

.img-wrapper {
  position: relative;
}

.list-wrapper li img{
  width: 100%;
  border-radius:2px;
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
</style>
