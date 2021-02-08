<template>
  <div class="icon">
    <img
      :src="getImgPath"
      :style="inlineStyles"
      alt="icon"
      class="icon__image"
    >
  </div>
</template>

<script>
export default {
  props: {
    direction: {
      type: String,
      default() {
        return 'down'
      },
    },
    name: {
      type: String,
      required: true,
    },
    styles: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    getIconDirection() {
      switch (this.direction) {
        case 'up':
          return { transform: 'rotate(180deg)' };
        case 'right':
          return { transform: 'rotate(-90deg)' };
        case 'left':
          return { transform: 'rotate(90deg)' };
        default:
          return { transform: 'rotate(0)' }
      }
    },
    getImgPath() {
      return require(`../assets/Icon/${this.name}.svg`);
    },
    inlineStyles() {
      return Object.assign({}, this.getIconDirection, this.styles);
    },
  },
}
</script>

<style lang="scss" scoped>
  .icon {
    &__image {
      transition: .2s all;
    }
  }
</style>
