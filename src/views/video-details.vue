<template>
  <transition name="slide">
    <div class="details-wrapper">
      <div class="video-wrapper">
        <span class="back" @click.stop="back"></span>
        <video :src="video.video" autoplay controls webkit-playsinline='true' playsinline='true'></video>
        <div class="video-info">
          <h3>{{winner(video.watching_team,video.winner)}} VS {{winner(video.other_team,video.winner)}}</h3>
          <p class="text">比赛时间：{{video.match_time}}</p>
        </div>
      </div>
      <div class="recommend">
        <h4 class="title">视频推荐</h4>
        <ul>
          <li @click="selectItem(video)" v-for="video in recommendList" :key="video.id">
            <div class="img-wrapper">
              <img :src="video.cover" alt="">
              <span class="video-time">{{video.videoTime}}</span>
            </div>
            <div class="info-wrapper">
              <p class="text">{{winner(video.watching_team,video.winner)}} VS {{winner(video.other_team,video.winner)}}</p>
              <p class="time">{{video.match_time}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>


<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["video", "videoList", "recommendList"])
  },
  created() {
    window.scrollTo(0, 0);
    if (!this.video.video) {
      this.$router.push("/");
      return;
    }
  },
  methods: {
    winner(name, winner) {
      return name === winner ? `${name}(胜)` : name;
    },
    back() {
      this.$router.push("/");
    },
    selectItem(video) {
      this.setVideo(video);
      this.recommendListAction({ list: this.videoList, currentVideo: video });
      window.scrollTo(0, 0);
    },
    ...mapMutations({
      setVideo: "SET_VIDEO"
    }),
    ...mapActions(["recommendListAction"])
  },
  watch: {
    // videoObj(newVideo){
    //   this.videoObj
    // }
  }
};
</script>


<style lang="scss" scoped>
.details-wrapper {
  background: #f1f1f1;
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.video-wrapper {
  position: relative;
  background: #fff;
  border-radius: 0 0 4px 4px;
}

.back {
  position: absolute;
  color: #fff;
  top: 40%;
  transform: translateY(-60%);
  width: 50px;
  height: 50px;
  z-index: 100;
}

.back::before {
  content: "";
  position: absolute;
  top: 14px;
  left: 12px;
  height: 1px;
  width: 12px;
  background: #fff;
  transform: rotate(-40deg);
}

.back::after {
  content: "";
  position: absolute;
  top: 22px;
  left: 12px;
  height: 1px;
  width: 12px;
  background: #fff;
  transform: rotate(40deg);
}

.video-wrapper video {
  width: 100%;
}

.video-info {
  position: relative;
  padding: 10px 0 20px;
  margin: 0 10px;
  /* border-bottom: 1px solid #eee; */
}

.video-info h3 {
  color: #333;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 15px;
}

.video-info .text {
  font-size: 12px;
  color: #999;
}

.recommend {
  margin-top: 5px;
  background: #fff;
  border-radius: 4px;
}

.recommend .title {
  font-size: 14px;
  font-weight: 600;
  padding: 10px;
}

.recommend ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 10px;
}

.recommend li {
  display: flex;
  margin-bottom: 10px;
}

.img-wrapper {
  position: relative;
}

.recommend ul li img {
  width: 150px;
  border-radius: 2px;
  margin-right: 10px;
}

.recommend ul li .video-time {
  font-size: 12px;
  transform: scale(0.9);
  color: #fff;
  position: absolute;
  bottom: 10px;
  right: 15px;
}

.info-wrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 5px 0 10px;
}

.info-wrapper .text {
  font-size: 14px;
}

.info-wrapper .time {
  font-size: 12px;
  color: #666;
}

@media (min-width: 860px) {
  .info-wrapper {
    width: 180px;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(0%, 100%, 0);
}
</style>
