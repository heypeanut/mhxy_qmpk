<template>
  <div id="app">
   <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <bottom-bar></bottom-bar>
  </div>
</template>


<script>
import BottomBar from './views/bottomBar.vue'
export default {
  components:{
    BottomBar
  }
}
</script>


<style>

</style>
