<template>
  <div class="bottom-bar">
    <router-link tag="div" class="tab-item" to="video">
      <i class="icon iconfont">&#xe60a;</i>
      <span class="name tab-link">视频</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="rank">
      <i class="icon iconfont">&#xe6c5;</i>
      <span class="name tab-link">排行</span>
    </router-link>
  </div>
</template>


<style lang="scss" scoped>
.bottom-bar {
  position: fixed;
  width: 100%;
  bottom: 0px;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
  background-color: #fff;
  box-shadow: 0px -1px 1px #e8e8e8;
  .tab-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    &.router-link-active {
      .tab-link {
        color: #b02015;
      }
      .icon {
        width: 20px;
        height: 20px;
        color: #b02015;
      }
    }
    .icon {
      width: 20px;
      height: 20px;
      margin-bottom: 2px;
      text-align: center;
      /* background: #f1f1f1; */
    }
    .name {
      font-size: 12px;
    }
  }
}
</style>
