import { getColumns } from '../../dataLayer.js';
import { sortingByOrder } from '../../../../lib/utils/sort.js'

const state = () => ({
  columns: [],
  sortableTabs: [],
  shownColumns: ['id', 'product', 'calories', 'fat', 'carbs', 'protein', 'iron'],
  offset: 0,
});

const getters = {
  defaultColumns: state => state.columns,
  sortableTabs: state => state.sortableTabs,
  shownColumns: state => state.shownColumns,
  offset: state => state.offset,
};

const actions = {
  getAllColumns({ commit }) {
    commit('setDefaultColumns', getColumns());
  },

  updateColumnsOrder({ commit }, payload) {
    commit('updateSortableTabs', payload);
    commit('setShownColumns', payload);
    commit('changeColumnsOrder', payload);
    commit('table/activateChangedColumn', payload, { root: true });
  },

  getShownColumns({ commit }, payload) {
    commit('setShownColumns', payload);
  },

  updateUi({ commit }, payload) {
    commit('updateSortableTabs', payload);
    commit('table/updateTableHeader', payload, { root: true });
    commit('setShownColumns', payload);
    commit('table/updateTableBody', payload, { root: true });
  },

  updateOffset({ commit }, pageSize) {
    console.log(pageSize, 'pageSize');
    commit('changeOffset', pageSize);
  },
};

const mutations = {
  setDefaultColumns(state, defaultColumns) {
    state.columns = defaultColumns;
    state.sortableTabs = defaultColumns
  },

  changeOffset(state, newOffset) {
    if (newOffset > state.offset) {
      state.offset = newOffset;
      return;
    }

    state.offset = state.offset - newOffset;
    console.log(state.offset, 'state.offset');
  }, 

  changeColumnsOrder(state, selectedColumn) {
    const currentElementIdx = state.columns.findIndex(el => el.key === selectedColumn);
    const currentElement = state.columns.find(el => el.key === selectedColumn);

    state.columns.splice(currentElementIdx, 1);
    state.columns.splice(1, 0, currentElement);
  },

  setShownColumns(state, payload) {
    if (payload.allChecked) {
      if (payload.isChecked) {
        state.shownColumns = ['id', 'product', 'calories', 'fat', 'carbs', 'protein', 'iron'];
      } else {
        state.shownColumns = ['id'];
      }

      return;
    }

    if (payload.isChecked) {
      state.shownColumns.push(payload.keyValue);
    } else {
      state.shownColumns = state.shownColumns.filter(column => column !== payload.keyValue);
    }
  },

  updateSortableTabs(state, payload) {
    if (payload.allChecked) {
      if (payload.isChecked) {
        state.sortableTabs = state.columns;
      } else {
        state.sortableTabs = [];
      }

      return;
    }

    if (payload.isChecked) {
      const checkedColumn = state.columns.find(column => column.id === payload.id);

      state.sortableTabs.push(checkedColumn);
      state.sortableTabs.sort(sortingByOrder);

      return;
    }
    
    state.sortableTabs = state.sortableTabs.filter(tab => tab.id !== payload.id);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};