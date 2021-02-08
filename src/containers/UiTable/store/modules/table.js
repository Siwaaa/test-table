import { getProducts } from '../../request.js';
import { getColumns } from '../../dataLayer.js';
import { sortingByOrder } from '../../../../lib/utils/sort.js'

const state = () => ({
  products: [],
  tableHeader: [],
  activeColumn: '',
  pageSizeLimit: 10,
});

const getters = {
  products: state => state.products,
  total: state => state.products.length,
  pageSizeLimit: state => state.pageSizeLimit,
};

const actions = {
  async getAllProducts({ commit }) {
    commit('setProducts', await getProducts());
  },
  getAllHeaderCells({ commit }) {
    commit('setHeaderCells', getColumns());
  },
  changePageSizeLimit({ commit }, pageSize) {
    commit('changePageSizeLimit', pageSize);
  },
};

const mutations = {
  setProducts(state, products) {
    state.products = products;
  },

  changePageSizeLimit(state, newPageSizeLimit) {
    console.log(newPageSizeLimit);
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
      state.tableHeader.sort(sortingByOrder);
      
      return;
    }

    state.tableHeader = state.tableHeader.filter(column => column.order !== payload.order);
  },
  updateTableBody() {
    console.log('products');
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};