<template>
  <div
    class="tab"
    :class="{ 'tab--active' : isActiveTab, 'tab--hidden' : !tabTitle }"
  >
    <label class="tab__label">
        <input
          type="radio"
          name="radio"
          class="tab__input"
          v-model="tabTitle"
        >
        {{ title }}
        <span v-if="additionalInfo">{{ `(${additionalInfo})` }}</span>
      </label>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    title: String,
    additionalInfo: String,
    keyValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    tabTitle: {
      get: function() {
        return this.title;
      },
      set() {
        this.$emit('change', this.keyValue)
      }
    },
    isActiveTab() {
      return this.keyValue === this.value;
    },
  },
}
</script>

<style lang="scss" scoped>
  .tab {
    padding: 10px 5px;
    border-radius: 2px;

    &__label {
      cursor: pointer;
    }

    &__input {
      display: none;
    }

    &--active {
      background: #00A11E;
      color: #fff;
    }

    &--hidden {
      display: none;
    }
  }
</style>