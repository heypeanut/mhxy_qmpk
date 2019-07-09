import Vue from 'vue'
import Router from 'vue-router'
import videoList from '@/views/video-list.vue'
import videoDetails from '@/views/video-details.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: videoList,
    },
    {
      path:'/video',
      component:videoDetails
    }
  ]
})
