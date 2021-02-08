<template>
  <div
    class="header-cell"
    :class="{'header-cell--active' : active}"
    @click="sortData"
  >
    <slot />
    <ui-icon
      v-if="active"
      name="sort-arrow"
      :direction="iconDirection"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { clearOrSelectAllRows } from '../../containers/UiTable/helper.js';

export default {
  props: {
    active: Boolean,
    keyValue: String,
  },
  data() {
    return {
      iconDirection: 'down',
      sort: 'desc',
    };
  },
  computed: {
    ...mapGetters({
      products: 'products',
    }),
  },
  methods: {
    sortData() {
      if (this.active) {
        const rows = this.$store.getters.rows.rows;
      
        clearOrSelectAllRows(rows);
        
        if (this.sort === 'asc') {
          this.$store.dispatch('sortProducts', { order: this.sort, key: this.keyValue});
          this.sort = 'desc';
          this.iconDirection = 'down';
          
          return;
        }
        
        this.$store.dispatch('sortProducts', { order: this.sort, key: this.keyValue});
        this.sort = 'asc';
        this.iconDirection = 'up';
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .header-cell {
    width: 160px;
    display: flex;
    align-items: center;

    &:nth-child(1) {
      width: 70px;
    }

    &:nth-child(2) {
      width: 190px;
    }

    &--active {
      color: #00A11E;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
