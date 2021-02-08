<template>
  <ui-toolbar>
    <ui-sortable-tabs sortable-tabs-title="Sorting by" />
  
    <div slot="right" class="toolbar__right-part">
      <ui-button
        :type="getTypeButton"
        :styles="inlineStyles"
        :disabled="!Boolean(deleteItemsCount)"
        @click="deleteSelectedRows"
      >
        {{ deleteButtonPlaceholder }}
        <span
          v-if="deleteItemsCount"
          class="toolbar__delete-count"
        >
          {{ `(${deleteItemsCount})` }}
        </span>
      </ui-button>
      <ui-paginator
        :page-size="currentPageSize"
        :available-page-sizes="availablePageSizes"
      />
      <configure-columns-popup />
    </div>
  </ui-toolbar>
</template>

<script>
import { mapGetters } from 'vuex';

import ConfigureColumnsPopup from './UITableConfigureColumnsPopup.vue';

import { AVAILABLE_PAGE_SIZES } from '../pageSize.js';

export default {
  components: {
    ConfigureColumnsPopup,
  },
  props: {
    data: Array,
  },
  data() {
    return {
      currentPageSize: AVAILABLE_PAGE_SIZES[0],
      availablePageSizes: AVAILABLE_PAGE_SIZES,
      deleteButtonPlaceholder: 'Delete',
    };
  },
  computed: {
    ...mapGetters({
      products: 'products',
      deleteItemsCount: 'deleteCount',
    }),
    getTypeButton() {
      return this.deleteItemsCount > 0 ? 'primary' : '';
    },
    inlineStyles() {
      return {
        disabled: {
          'padding': '0 15px',
        },
      };
    },
  },
  methods: {
    deleteSelectedRows() {
      this.$store.dispatch('deleteSelectedRows');
    },
  },
}
</script>

<style lang="scss" scoped>
  .toolbar {
    &__right-part {
      align-items: stretch;
    }

    &__delete-count {
      margin-left: 3px;
    }
  }
</style>