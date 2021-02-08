<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :style="inlineStyles"
    :class="classes"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    styles: Object,
    disabled: Boolean,
    type: {
      type: String,
      default() {
        return 'default';
      },
    },
  },
  computed: {
    inlineStyles() {
      return this.disabled ? this.styles ? this.styles.disabled : '' : this.styles ? this.styles.general : '';
    },
    classes() {
      return {
        [this.type]: true,
        disabled: this.disabled,
        active: this.active,
        focus: this.focus,
        'ui-button': true,
      };
    },
  },
}
</script>

<style lang="scss" scoped>
  .ui-button {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    outline: none;
    border: 1px solid transparent;
    border-radius: 2px;
    transition: .2s all;

    &:active {
      transform: scale(.95);
    }

    &:disabled {
      color: #5B5E77;
      border-radius: 2px;
      border: 1px solid #C6CBD4;
      background: #fff;
      opacity: .3;
      cursor: not-allowed;
    }

    &.primary {
      background: #00A11E;
      color: #fff;
      padding: 10px 16px;
    }

    &.default {
      background: #fff;
      border: 1px solid #D5DAE0;
      color: #5B5E77;
    }
  }
</style>