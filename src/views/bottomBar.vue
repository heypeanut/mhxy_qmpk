<template>
  <div class="bottom-bar">
    <router-link tag="div" class="tab-item" to="video">
      <i class="icon"></i>
      <span class="name tab-link">赛事视频</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="rank">
      <i class="icon"></i>
      <span class="name tab-link">比分排行</span>
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
    &.router-link-active {
      .tab-link {
        color: #b02015;
      }
      .icon {
        width: 20px;
        height: 20px;
        margin-bottom: 5px;
        background: #b02015;
      }
    }
    .icon {
      width: 20px;
      height: 20px;
      margin-bottom: 5px;
      background: #f1f1f1;
    }
    .name {
      font-size: 12px;
    }
  }
}
</style>
