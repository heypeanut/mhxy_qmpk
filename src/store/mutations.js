import * as types from './mutation-types'

const matutaions = {
  [types.SET_VIDEO](state, video){
    state.video = video
  },
  [types.SET_VIDEO_LIST](state,list){
    state.videoList = list
  },
  [types.SET_RECOMMEND_VIDEO_LIST](state, recommendList){
    state.recommendList = recommendList
  },
  [types.SET_ANALYSIS_LIST](state, list){
    state.analysis = list
  },
}


export default matutaions
