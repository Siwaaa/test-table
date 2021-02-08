<template>
  <div class="positioner">
    <div ref="trigger" class="positioner-trigger">
      <slot />
    </div>
    
    <div
      ref="content"
      class="positioner-content"
      :class="{ 'positioner-content--shown' : popupPositioned }"
      :style="{width}"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    triggerClick: {
      type: Boolean,
      default() {
        return false;
      },
    },
    width: {
      type: String,
      default() {
        return '100%';
      },
    },
  },
  mounted() {
    this.setEventHandlers();
  },
  data() {
    return {
      popupPositioned: false,
    };
  },
  methods: {
    togglePopup() {
      this.popupPositioned = !this.popupPositioned;
      this.$emit('toggle-dropdown', this.popupPositioned);
    },
    handleEvent(e) {
      if (this.$refs.trigger.contains(e.target) || this.$refs.content.contains(e.target)) {
        e.stopPropagation();
      }

      this.togglePopup();
    },
    handleClickOutside(e) {
      if (!Object.prototype.hasOwnProperty.call(this.$refs, 'trigger') 
          || !Object.prototype.hasOwnProperty.call(this.$refs, 'content')) {
        return;
      }
      
      const trigger = this.$refs.trigger;
      const content = this.$refs.content;

      if (!trigger || !content || (!trigger.contains(e.target) && !content.contains(e.target))) {
        this.popupPositioned = false;
        this.$emit('toggle-dropdown', this.popupPositioned);
      }
    },
    setEventHandlers() {
      this.$refs.trigger.onclick = this.handleEvent;
      
      if (this.triggerClick) {
        this.$refs.content.onclick = this.handleEvent;
      }
    },
  },
  watch: {
    popupPositioned: {
      immediate: true,
      handler(val) {
        if (val) {
          document.querySelector('body').addEventListener('click', this.handleClickOutside);
        } else {
          document.querySelector('body').removeEventListener('click', this.handleClickOutside);
        }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
  .positioner {
    position: relative;
    height: 100%;

    &-trigger {
      display: flex;
      align-items: stretch;
      height: 100%;
    }

    &-content {
      position: absolute;
      top: 50%;
      left: 0;
      z-index: -1;
      opacity: 0;
      visibility: hidden;
      width: 100%;
      padding: 15px 0;
      background: #fff;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
      border-radius: 4px;
      max-height: 243px;
      overflow-y: auto;
      transition: .2s all;

      &--shown {
        top: calc(100% + 14px);
        opacity: 1;
        z-index: 1;
        visibility: visible;
      }
    }
  }
</style>
