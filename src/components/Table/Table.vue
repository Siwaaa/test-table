<template>
  <div class="ui-table">
    <ui-sticky-container v-if="stickyColumns" :styles="{ 'z-index': 12 }">
      <div class="ui-table__header">
        <header-cell
          v-for="(col, col_index) in columnsList"
          :key="`header_${col_index}`"
          :key-value="col.key"
          class="ui-table__header-cell"
          :active="col.key === activeColumn"
        >
          <template v-if="Object.prototype.hasOwnProperty.call(col, 'component')">
            <ui-checkbox
              v-model="isChecked"
              align="center"
              @change-checkbox-state="someLogic"
            />
          </template>

          <p v-else>{{ getDisplayValue(col) }}</p>
        </header-cell>
      </div>
    </ui-sticky-container>

    <div class="ui-table__body">
      <div v-if="hasData">
        <row
          v-for="(row, row_index) in columnsData"
          :key="`row_${row_index}_${hash}`"
          :static-columns="row"
          :columns-list="columnsList"
          @select-row="selectRow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import HeaderCell from './HeaderCell.vue';
import Row from './Row.vue';

import { generateRandomString } from '../../lib/utils/string.js';
import { clearOrSelectAllRows } from '../../containers/UiTable/helper.js';

export default {
  components: {
    HeaderCell,
    Row,
  },
  props: {
    columnsList: {
      type: Array,
      default() {
        return [];
      },
    },
    columnsData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    this.$store.dispatch('getAllHeaderCells');
  },
  data() {
    return {
      hash: generateRandomString(),
      isChecked: false,
    };
  },
  computed: {
    ...mapState({
      stickyColumns: state => state.tableHeader,
      activeColumn: state => state.activeColumn,
    }),
    hasData() {
      return this.columnsList.length > 0;
    },
  },
  methods: {
    getDisplayValue(currentColumn) {
      return currentColumn.additionalInfo !== null ? `${currentColumn.id} (${currentColumn.additionalInfo})` : currentColumn.id;
    },
    someLogic(payload) {
      const rows = this.$store.getters.rows.rows;
      
      this.isChecked = payload.isChecked;
      
      if (payload.isChecked) {
        clearOrSelectAllRows(rows, payload.isChecked);
        return;
      }

      clearOrSelectAllRows(rows);
    },
    selectRow(isChecked, row) {
      if (isChecked) {
        this.$store.commit('changeDeleteCount', isChecked);
        this.$store.commit('setSelectedRows', { id: row.id, isChecked });
      } else {
        this.$store.commit('changeDeleteCount', isChecked);
        this.$store.commit('setSelectedRows', { id: row.id, isChecked });
      }
    },
  },
}
</script>
  
<style lang="scss" scoped>
  .ui-table {
    margin-top: 31px;

    &__header {
      position: relative;
      display: flex;
      font-size: 1.4rem;
      font-weight: 600;
      border-bottom: 1px solid #EDEDED;
      padding: 16px 0;
    }

    &__body {
      font-size: 1.4rem;
    }
  }
</style>
