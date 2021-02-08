<template>
  <div class="error-block">
    <ui-icon name="server-error"/>
    <h3>{{ status.msg }}</h3>
    <p>Try reloading the page</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      status: 'status',
    }),
  }
}
</script>

<style lang="scss" scoped>
  .error-block {
    text-align: center;
    font-size: 5rem;
  }
</style>