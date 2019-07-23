import Vue from 'vue'
import Router from 'vue-router'
import VideoList from '@/views/video-list.vue'
import VideoDetails from '@/views/video-details.vue'
import Rank from '@/views/rank'
import Analysis from '@/views/analysis'
import AnalysisDetails from '@/views/analysis-details'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      redirect:'/video'
    },
    {
      path: '/video',
      component: VideoList,
    },
    {
      path: '/details',
      component: VideoDetails,
    },
    {
      path: '/rank',
      component: Rank,
    },
    {
      path: '/analysis',
      component: Analysis,
    },
    {
      path: '/analysis-details/:name',
      component: AnalysisDetails,
    },
    
    
  ]
})
