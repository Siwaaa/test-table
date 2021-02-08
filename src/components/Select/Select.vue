<template>
  <ui-positioner
    @toggle-dropdown="toggleDropdown"
    :trigger-click="triggerClick"
    :width="width"
  >
    <ui-button :styles="styles">
      <div class="select__control">
        <div class="select__control-text" v-html="placeholder"></div>
      </div>

      <div class="select__chevron">
        <ui-icon
          :direction="setIconDirection"
          name="arrow"
          :styles="{ opacity: '.5' }"
        />
      </div>
    </ui-button>

    <div slot="content">
      <slot />
    </div>
  </ui-positioner>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
    },
    triggerClick: {
      type: Boolean,
      default() {
        return false;
      },
    },
    styles: {
      type: Object,
      default() {
        return {};
      },
    },
    width: {
      type: String,
      default() {
        return '100%';
      },
    },
  },
  data() {
    return {
      isDropdownVisible: false,
      pageSize: null,
    };
  },
  computed: {
    setIconDirection() {
      return this.isDropdownVisible ? 'up' : 'down';
    },
  },
  methods: {
    toggleDropdown(val) {
      this.isDropdownVisible = val;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.pageSize = val;
      },
    },
  },
}
</script>

<style>
</style>
