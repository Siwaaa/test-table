<template>
  <label class="checkbox" :style="`justify-content:${align}`">
    <div class="checkbox--unchecked"> 
      <ui-icon
        v-if="isChecked"
        name="checkbox"
        :styles="inlineStyles"
      />
    </div>
    <input
      type="checkbox"
      class="checkbox__default-icon"
      :name="labelName"
      :checked="isChecked"
      @change="$emit('change-checkbox-state', 
      {
        isChecked: $event.target.checked,
        id: labelName,
        order,
        additionalInfo,
        keyValue,
      })"
    >
    <p
      v-if="label"
      class="checkbox__label"
      :class="{ 'checkbox__label--bold' : boldFont }"
    >
      {{ displayLabel }}
    </p>
  </label>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
    label: {
      type: String,
    },
    keyValue: {
      type: String,
    },
    additionalInfo: String,
    boldFont: {
      type: Boolean,
      default() {
        return false;
      },
    },
    align: {
      type: String,
      default() {
        return 'flex-start';
      },
    },
    order: {
      type: Number,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      labelName: '',
      isChecked: false,
    };
  },
  computed: {
    inlineStyles() {
      return { transform: 'translate(-1.5px, -2.5px)' };
    },
    displayLabel() {
      const isEmptyValue =  this.additionalInfo === null;
      return isEmptyValue ? `${this.labelName}` : `${this.labelName} (${this.additionalInfo})`;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.isChecked = val;
      },
    },
    label: {
      immediate: true,
      handler(val) {
        return this.labelName = val;
      },
    },
  },
}
</script>

<style lang="scss" scoped>
  .checkbox {
    display: flex;
    align-items: center;
    width: 100%;
    cursor: pointer;
    
    &--unchecked {
      width: 12px;
      height: 12px;
      border: 1px solid #ccc;
      border-radius: 1px;
    }

    &__default-icon {
      display: none !important;
    }

    &__label {
      margin-left: 13px;

      &--bold {
        font-weight: 600;
      }
    }
  }
</style>
