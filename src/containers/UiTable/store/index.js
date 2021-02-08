import Vue from 'vue';
import Vuex from 'vuex';
import { getProducts, deleteProducts } from '../request.js';
import { getColumns } from '../dataLayer.js';
import { sortingByOrder } from '../../../lib/utils/sort.js'
import { generateSortTableDataKeyGetter, clearOrSelectAllRows } from '../helper.js';

Vue.use(Vuex);

export default new Vuex.Store({

state: {
  products: [],
  tableHeader: [],
  activeColumn: '',
  pageSizeLimit: 10,
  columns: [],
  sortableTabs: [],
  shownColumns: ['id', 'product', 'calories', 'fat', 'carbs', 'protein', 'iron'],
  offset: 0,
  deleteCount: 0,
  selectedRows: [],
  rows: [],
  status: {
    status: null,
    msg: null,
    active: false,
  },
  loading: false,
},

getters: {
  products:       state => state.products,
  total:          state => state.products.length,
  pageSizeLimit:  state => state.pageSizeLimit,
  defaultColumns: state => state.columns,
  sortableTabs:   state => state.sortableTabs,
  shownColumns:   state => state.shownColumns,
  offset:         state => state.offset,
  deleteCount:    state => state.deleteCount,
  selectedRows:   state => state.selectedRows,
  rows:           state => state.rows,
  status:         state => state.status,
  loading:        state => state.loading,
},

actions: {
  async getAllProducts({ commit }) {
    try {
      commit('toggleLoading');
      let products = await getProducts();

      commit('setProducts', products);
      commit('toggleLoading');
    } catch(err) {
      commit('toggleLoading');
      commit('loadDataFailed', err);
    }
  },
  async deleteItem({ commit }, itemId) {
    try {
      let response = await deleteProducts();

      commit('deleteItem', { itemId });
      commit('changeStatus', response);
    } catch(err) {
      commit('deletionProcessFail', { response: err, itemId });
    }
  },
  async deleteSelectedRows({ commit }) {
    try {
      let response = await deleteProducts();

      commit('deleteSelectedRowsSuccess');
      commit('changeStatus', response);
    } catch(err) {
      commit('deletionProcessFail', { response: err });
    }
  },
  getAllHeaderCells({ commit }) {
    commit('setHeaderCells', getColumns());
  },
  changePageSizeLimit({ commit }, pageSize) {
    commit('changePageSizeLimit', pageSize);
  },

  getAllColumns({ commit }) {
    commit('setDefaultColumns', getColumns());
  },

  updateColumnsOrder({ commit }, payload) {
    commit('updateSortableTabs', payload);
    commit('setShownColumns', payload);
    commit('changeColumnsOrder', payload);
    commit('activateChangedColumn', payload, { root: true });
  },

  getShownColumns({ commit }, payload) {
    commit('setShownColumns', payload);
  },

  updateUi({ commit }, payload) {
    commit('updateSortableTabs', payload);
    commit('updateTableHeader', payload, { root: true });
    commit('setShownColumns', payload);
    commit('updateTableBody', payload, { root: true });
  },

  updateOffset({ commit }, pageSize) {
    commit('changeOffset', pageSize);
  },

  sortProducts({ commit }, payload) {
    commit('sortProducts', { payload });
  },
},

mutations: {
  setProducts(state, products) {
    state.products = products;
  },

  toggleLoading(state) {
    state.loading = !state.loading;
  },

  loadDataFailed(state, err) {
    state.status = {
      msg: err.error,
    }
  },

  deleteItem(state, payload) {
    const elementIndex = state.products.findIndex(product => product.id === payload.itemId);

    state.products.splice(elementIndex, 1);
  },

  deleteSelectedRowsSuccess(state) {
    const { rows } = state.rows;

    clearOrSelectAllRows(rows);
    
    state.selectedRows.forEach(item => {
      const elementIndex = state.products.findIndex(product => product.id === item);
      state.products.splice(elementIndex, 1);
    });
  },

  changeStatus(state, response) {
    state.status = {
      status: 'success',
      msg: response.message,
      active: true,
    }
    setTimeout(() => state.status.active = false, 2000);
  },

  deletionProcessFail(state, payload) {
    state.status = {
      status: 'error',
      msg: payload.response.error,
      active: true,
    }
    setTimeout(() => state.status.active = false, 2000);
  },

  setSelectedRows(state, payload) {
    if (payload.isChecked) {
      state.selectedRows.push(payload.id);
      return;
    }

    const selectedRowIdx = state.selectedRows.findIndex(item => item === payload.id);

    state.selectedRows.splice(selectedRowIdx, 1);
  },

  setRows(state, rows) {
    state.rows = rows;
  },

  changeDeleteCount(state, isChecked) {
    if (isChecked) {
      state.deleteCount++;
    } else {
      state.deleteCount--;
    }
  },

  sortProducts(state, { payload }) {
    const valueGetter = generateSortTableDataKeyGetter(payload.key);

    state.products.sort(sortingByOrder(valueGetter, payload.order));
  },

  changePageSizeLimit(state, newPageSizeLimit) {
    state.pageSizeLimit = newPageSizeLimit;
  },

  activateChangedColumn(state, activeColumnKey) {
    state.activeColumn = activeColumnKey;
  },

  setHeaderCells(state, headerCells) {
    state.tableHeader = headerCells;
  },

  updateTableHeader(state, payload) {
    if (payload.allChecked) {
      if (payload.isChecked) {
        state.tableHeader = getColumns();
      } else {
        state.tableHeader = getColumns().filter(column => column.order === 0);
      }

      return;
    }

    if (payload.isChecked) {
      state.tableHeader.push(payload);
      return;
    }

    state.tableHeader = state.tableHeader.filter(column => column.order !== payload.order);
  },
  updateTableBody() {
    console.log('products');
  },
  setDefaultColumns(state, defaultColumns) {
    state.columns = defaultColumns;
    state.sortableTabs = defaultColumns
  },

  resetOffset(state, newOffset) {
    state.offset = newOffset;
  },

  changeOffset(state, newOffset) {
    if (newOffset >= state.offset) {
      state.offset = newOffset;
      return;
    }
    
    state.offset = state.offset - state.pageSizeLimit;
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
      const valueGetter = generateSortTableDataKeyGetter('order');

      state.sortableTabs.push(checkedColumn);
      state.sortableTabs.sort(sortingByOrder(valueGetter, 'desc'));

      return;
    }
    
    state.sortableTabs = state.sortableTabs.filter(tab => tab.id !== payload.id);
  },
},

});