<template>
  <div
    class="status-indicator"
    :class="{
      'status-indicator--active': status.active,
      error: status.status === 'error',
      success: status.status === 'success',
    }"
  >
    <ui-icon :name="getIconName" />
    {{ status.msg }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      status: 'status',
    }),
    getIconName() {
      return this.status.status === 'success' ? 'success' : 'error'
    },
  },
}
</script>

<style lang="scss" scoped>
  .status-indicator {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    text-transform: uppercase;
    right: 30px;
    top: 30px;
    padding: 10px 10px 10px 4px;
    font-size: 1.5rem;
    opacity: 0;
    visibility: hidden;
    z-index: 105;
    border-radius: 3px;
    transition: .3s all;

    &--active {
      opacity: 1;
      visibility: visible;
    }

    &.success {
      background: #c4edbb;
      border: 1px solid #849b87;
      width: 11rem;
    } 

    &.error {
      background: #edbbbb;
      border: 1px solid #e15b64;
      width: 15rem;
    } 
  }
</style>