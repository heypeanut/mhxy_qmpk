<template>
  <div class="search-wrapper">
    <input ref="query" type="text" :placeholder="placeholder" v-model="query">
  </div>
</template>

<script>

import {debounce} from '@/common/js/util'
export default {
  props:{
    placeholder:{
      type:String,
      default:"请输入队伍名"
    },
  },
  data(){
    return {
      query:''
    }
  },
  created(){
    this.$watch('query',debounce((newQuery)=>{
      this.$emit('search',newQuery)
    },500))
  },
  methods:{
    setQuery(query){
      this.query = query
    },
  }
}
</script>


<style lang="scss" scoped>
.search-wrapper {
  padding: 5px;
  box-shadow:2px 2px 5px #e5e5e5;
}
.search-wrapper input{
  width: 100%;
  height: 35px;
  padding-left: 20px;
  box-sizing: border-box;
}
</style>

