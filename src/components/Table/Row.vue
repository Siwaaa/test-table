<template>
  <div class="ui-table-body-row">
    <body-cell
      v-for="(col, index) in columnsList"
      :key="`body_${index}_${hash}`"
    >
      <template v-if="col.key === 'id'">
        <ui-checkbox
          v-model="isChecked"
          align="center"
          @change-checkbox-state="changeCheckboxState"
        />
      </template>

      <p v-else class="body-cell__text">{{ getDisplayedValue(staticColumns, col) }}</p>
    </body-cell>

    <div
      class="ui-table-body-row__delete"
      @click="openConfirmModal"
    >
      <ui-icon name="trash"/>
      <p class="ui-table-body-row__delete-text">delete</p>
    </div>

    <ui-modal
      v-if="isShown"
      @close-modal="closeModal"
      @delete-item="deleteItem"
      :title="modalTitle"
    />
  </div>
</template>

<script>
import BodyCell from './BodyCell.vue';

import { generateRandomString } from '../../lib/utils/string.js';

export default {
  components: {
    BodyCell,
  },
  props: {
    staticColumns: {
      type: Object,
      default() {
        return {};
      },
    },
    columnsList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    this.rows = this.$parent.$children;
    this.$store.commit('setRows', { rows: this.rows });
  },
  data() {
    return {
      hash: generateRandomString(),
      isChecked: false,
      rows: [],
      isShown: false,
      modalTitle: 'Are you sure you want to <b>delete item</b>?',
    };
  },
  methods: {
    getDisplayedValue(row, col) {
      return row[col.key];
    },
    changeCheckboxState(payload) {
      this.isChecked = payload.isChecked;
    },
    openConfirmModal() {
      this.isShown = true;
    },
    deleteItem() {
      this.$store.dispatch('deleteItem', this.staticColumns.id);
      this.isShown = false;
    },
    closeModal() {
      this.isShown = false;
    },
  },
  watch: {
    isChecked: {
      handler(val) {
        this.$emit('select-row', val, this.staticColumns);
      },
    },
  },
}
</script>

<style lang="scss" scoped>
  .ui-table-body-row {
    position: relative;
    display: flex;
    padding: 12px 0 13px;
    transition: .2s all;
    cursor: pointer;

    &:nth-child(even) {
      background: #F8F9FA;
    }

    &:hover {
      background: #edf1ef;
    }

    &:hover &__delete {
      opacity: 1;
      visibility: visible;
      z-index: 1;
    }

    &__delete {
      position: absolute;
      top: 50%;
      right: 32px;
      transform: translateY(-50%);
      display: flex;
      align-items: center;
      opacity: 0;
      visibility: hidden;
      z-index: -1;
      transition: .2s all;

      &-text {
        margin-left: 6px;
      }
    }
  }

  .body-cell__text {
    width: 160px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
