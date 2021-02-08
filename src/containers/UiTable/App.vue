<template>
  <div class="test-table">
    <h3 v-if="tableTitle" class="test-table__title">{{ tableTitle }}</h3>
    <ui-table-toolbar
      v-if="hasData"
      :data="getProductsByLimit"
    />
    <ui-table
      v-if="hasData"
      :columns-list="columnsList"
      :columns-data="getProductsByLimit"
    />
    <ui-error-block v-else-if="!loading" />
    <ui-preloader v-if="loading" />
    <ui-status-panel />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import UiTableToolbar from './components/UITableToolbar.vue';

import { getColumns } from './dataLayer.js';

export default {
  components: {
    UiTableToolbar,
  },
  props: {
    tableTitle: String,
  },
  mounted() {
    this.$store.dispatch('getAllProducts');
  },
  data() {
    return {
      limit: this.pageSizeLimit,
    };
  },
  computed: {
    ...mapGetters({
      products: 'products',
      shownColumns: 'shownColumns',
      pageSizeLimit: 'pageSizeLimit',
      offset: 'offset',
      loading: 'loading',
    }),
    columnsList() {
      return getColumns().filter(column => this.shownColumns.includes(column.key));
    },
    getProductsByLimit() {
      return this.products.slice(this.offset - this.pageSizeLimit, this.offset);
    },
    hasData() {
      return this.products.length > 0;
    },
  },
}
</script>

<style lang="scss" scoped>
  .test-table {
    max-width: 1175px;
    margin: 0 auto;
    padding-top: 32px;

    &__title {
      font-size: 3.2rem;
      font-weight: 600;
      border-bottom: 1px solid #EDEDED;
      padding-bottom: 16px;
    }
  }
</style>
