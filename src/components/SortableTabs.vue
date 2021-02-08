<template>
  <div class="sortable-tabs">
    <p class="sortable-tabs__title sortable-tabs__title--bold">{{ `${sortableTabsTitle}:` }}</p>
    <ui-tab
      v-for="(tab, index) in tabs"
      :key="index"
      :value="selectedTab"
      :keyValue="tab.key"
      :title="getTabTitle(tab)"
      :additional-info="tab.additionalInfo"
      @change="changeTab"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    sortableTabsTitle: String,
  },
  created() {
    this.$store.dispatch('getAllColumns');
  },
  data() {
    return {
      selectedTab: '',
    };
  },
  computed: {
    ...mapGetters({
      tabs: 'sortableTabs',
    }),
  },
  methods: {
    changeTab: function(newTab) {
      console.log(newTab);
      this.selectedTab = newTab;
      this.$store.dispatch('updateColumnsOrder', this.selectedTab);
    },
    getTabTitle(tab) {
      return tab.key === 'id' ? '' : tab.id
    },
  }
}
</script>

<style lang="scss" scoped>
  .sortable-tabs {
    display: flex;
    align-items: baseline;
    font-size: 1.4rem;

    & > *:not(last-child) {
      margin-right: 7px;
    }

    &__title {
      align-self: center;

      &--bold {
        font-weight: 600;
      }
    }
  }
</style>