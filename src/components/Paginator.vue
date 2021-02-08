<template>
  <div class="paginator">
    <ui-select
      :placeholder="currentPageSize"
      trigger-click
      class="paginator__select"
      :styles="inlineStyles"
    >
      <ui-option
        v-for="pageSize in availablePageSizes"
        :key="`paginator_${pageSize}`"
        :displayValue="pageSize"
        hovered
        @click="changeInternalPageSize"
      >
      </ui-option>
    </ui-select>

    <ui-button
      :disabled="internalValue === 1"
      type="default"
      @click="internalValue = internalValue - 1"
    >
      <ui-icon direction="left" name="arrow"/>
    </ui-button>
    <div class="paginator__shown-range">
      {{ rangeText }}
    </div>
    <ui-button
      :disabled="internalValue === pagesCount"
      type="default"
      @click="internalValue = internalValue + 1"
    >
      <ui-icon
        direction="right"
        name="arrow"
      />
    </ui-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { clearOrSelectAllRows } from '../containers/UiTable/helper.js';

export default {
  props: {
    pageSize: {
      type: Number,
    },
    availablePageSizes: {
      type: Array,
      default() {
        return [10, 15, 20]
      },
    },
  },
  data() {
    return {
      internalPageSize: this.pageSize,
      internalValue: 1,
    };
  },
  computed: {
    ...mapGetters({
      total: 'total',
      offset: 'offset',
    }),
    currentPageSize() {
      return `${this.internalPageSize} Per Page`;
    },
    currentElements() {
      const from = (this.internalValue - 1) * this.internalPageSize;
      const to = this.internalValue * this.internalPageSize;

      return {
        from,
        to: to > this.total ? this.total : to,
      };
    },
    rangeText() {
      const range = `${this.currentElements.from + 1} - ${this.currentElements.to}`;
      const total = this.total;

      return `${range} of ${total}`;
    },
    pagesCount() {
      const rest = this.total % this.internalPageSize;
      const count = parseInt(this.total / this.internalPageSize);

      return rest === 0 ? count : count + 1;
    },
    changedOffset() {
      return this.offset + this.pageSize;
    },
    inlineStyles() {
      return {
        general: {
          'padding-left': '15px',
        },
      };
    },
  },
  methods: {
    changeInternalPageSize(newPageSize) {
      this.internalPageSize = newPageSize;
      this.$store.dispatch('changePageSizeLimit', newPageSize);
      this.$store.commit('resetOffset', newPageSize);
      this.internalValue = 1;
      this.$store.dispatch('updateOffset', this.internalPageSize * this.internalValue);

      const rows = this.$store.getters.rows.rows;
      clearOrSelectAllRows(rows);
    },
  },
  watch: {
    internalValue: {
      immediate: true,
      handler(val) {
        this.$store.dispatch('updateOffset', this.internalPageSize * val);

        const rows = this.$store.getters.rows.rows;
        clearOrSelectAllRows(rows);
      },
    },
  },
}
</script>

<style lang="scss" scoped>
  .paginator {
    display: flex;
    align-items: stretch;
    margin: 0 16px 0 12px;

    &__select {
      margin-right: 16px;
      display: flex;
      align-items:stretch;
    }

    &__shown-range {
      font-size: 1.4rem;
      align-self: center;
      margin: 0 8px;
    }
  }
</style>