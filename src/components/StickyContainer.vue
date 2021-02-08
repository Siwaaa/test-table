<template>
  <div
    :style="inlineStyles"
    class="sticky"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    styles: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    inlineStyles() {
      return Object.assign(
        {
          position: ['sticky', '-webkit-sticky'],
        },
        this.styles,
      );
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
