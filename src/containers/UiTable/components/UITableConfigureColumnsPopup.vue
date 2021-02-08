<template>
  <div class="configure-columns-popup">
    <primary-select
      :placeholder="selectedColumnsCount"
      :styles="inlineStyles"
      width="130%"
    >
      <select-option
        v-for="columnTitle in defaultColumnsPopup"
        :key="`configure_${columnTitle.id}`"
        justify-content="flex-start"
      >
        <checkbox
          v-model="columnTitle.checked"
          :label="columnTitle.id"
          :additional-info="columnTitle.additionalInfo"
          :bold-font="columnTitle.bold"
          :order="columnTitle.order"
          :key-value="columnTitle.key"
          @change-checkbox-state="changePopupState"
        />
      </select-option>
    </primary-select>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import PrimarySelect from '../../../components/Select/Select.vue';
import SelectOption from '../../../components/Select/Option.vue';
import Checkbox from '../../../components/Checkbox.vue';

export default {
  components: {
    PrimarySelect,
    SelectOption,
    Checkbox,
  },
  created() {
    this.$store.dispatch('getAllColumns');
  },
  computed: {
    ...mapGetters({
      defaultColumnsPopup: 'defaultColumns',
    }),
    selectedColumnsCount() {
      const selectedColumnsCount = this.defaultColumnsPopup.filter(column => column.checked === true && column.id !== 'Select All').length;
      return `${selectedColumnsCount} columns selected`;
    },
    inlineStyles() {
      return {
        general: {
          background: '#fff',
          border: '1px solid #D5DAE0',
          color: '#5B5E77',
          'padding-left': '20px',
        },
      };
    },
  },
  methods: {
    changePopupState(payload) {
      console.log(payload);
      let selectedColumns = 0;

      if (payload.id === this.defaultColumnsPopup[0].id) {
        this.defaultColumnsPopup.forEach(item => item.checked = payload.isChecked);
        this.$store.dispatch('updateUi', { allChecked: payload.id, isChecked: payload.isChecked });
        return;
      }

      this.defaultColumnsPopup.forEach(item => {
        if (item.checked === true) {
          selectedColumns++;
        }

        if (item.id === payload.id) {
          item.checked = payload.isChecked;
          this.$store.dispatch('updateUi', payload);
        }
      });

      if (this.defaultColumnsPopup.length - 1 !== selectedColumns) {
        this.defaultColumnsPopup[0].checked = false;
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .configure-columns-popup__label {
    display: flex;
    align-items: center;
  }
</style>
