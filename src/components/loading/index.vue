<template>
  <div class="loading-wrapper">
    <span class="text">{{text}}</span>
    <i class="iconfont icon">&#xe65e;</i>
  </div>
</template>


<script>
export default {
  props:{
    text:{
      type:String,
      default:'加载中'
    }
  }
}
</script>


<style lang="scss" scoped>

.loading-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  color:#666;
  font-size: 12px;
  .icon {
    font-size: 14px;
    margin-left: 5px;
    animation: loading linear 1s infinite;
  }
}

@keyframes loading {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
}
</style>
