<template>
  <div
    class="option"
    :class="{ 'option--hovered' : hovered }"
    :style="`justify-content: ${justifyContent}`"
    @click="$emit('click', displayValue)"
  >
    {{ displayValue }}
    <slot v-if="$slots.default" />
  </div>
</template>

<script>

export default {
  props: {
    displayValue: {
      type: Number,
    },
    hovered: {
      type: Boolean,
      default() {
        return false;
      },
    },
    justifyContent: {
      type: String,
      default() {
        return 'center'
      },
    },
  },
}
</script>

<style lang="scss" scoped>
  .option {
    font-size: 1.4rem;
    display: flex;
    justify-content: center;
    padding: 11px 17px;
    cursor: pointer;

    &--hovered:hover {
      background: #edf1ef;
    }
  }
</style>
