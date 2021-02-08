<template>
  <div class="toolbar">
    <slot />
    
    <div class="toolbar__right-part">
      <slot name="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .toolbar {
    position: relative;
    z-index: 99;
    display: flex;
    margin-top: 20px;

    &__right-part {
      display: flex;
      margin-left: auto;
    }
  }
</style>