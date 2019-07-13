<template>
  <div class="search-wrapper">
    <input ref="query" type="text" :placeholder="placeholder" v-model="query">
    <i class="iconfont icon" @click="clearInput" v-show="query">&#xe68a;</i>
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
    clearInput(){
      this.query = ''
      this.$emit('clear','')
    }
  }
}
</script>


<style lang="scss" scoped>
.search-wrapper {
  position: relative;
  padding: 5px;
  box-sizing: border-box;
  /* box-shadow:2px 2px 5px #e5e5e5; */
}
.search-wrapper input{
  width: 100%;
  height: 35px;
  color:inherit;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: transparent;
  border: 1px solid transparent
}

.icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: inherit;
  &::before {
    content:'';
    position: absolute;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: -10px;
  }
}
</style>

