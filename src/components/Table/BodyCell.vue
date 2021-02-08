<template>
  <div
    class="body-cell"
    @click="$emit('click')"
  >
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .body-cell {
    &:first-child {
      width: 70px;
    }
    
    &:nth-child(2) {
      width: 190px;
    }

    width: 160px;
  }
</style>
