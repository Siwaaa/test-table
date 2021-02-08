<template>
    <div class="ui-modal">
      <div
        class="ui-modal__overlay"
        @click="$emit('close-modal')"
      />
      <div class="ui-modal__body">
        <h3
          class="ui-modal__title"
          v-html="title"
        />
        <div class="ui-modal__actions">
          <ui-button
            class="ui-modal__cancel"
            type="default"
            :styles="inlineStyles"
            @click="$emit('close-modal')"
          >
            Cancel
          </ui-button>
          <ui-button
            class="ui-modal__delete"
            type="primary"
            @click="$emit('delete-item')"
          >
            Confirm
          </ui-button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default() {
        return '';
      },
    }
  },
  data() {
    return {
      deleteText: 'Are you sure you want to <span class="ui-modal__title--bold">delete item</span>?',
    };
  },
  computed: {
    inlineStyles() {
      return {
        general: {
          padding: '10px 16px'
        },
      };
    },
  },
}
</script>

<style lang="scss" scoped>
  .ui-modal__title--bold {
    font-weight: 600;
  }
  .ui-modal {
    &__overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: transparent;
      z-index: 100;
    }

    &__body {
      position: absolute;
      width: 25.4rem;
      right: -50px;
      bottom: -235%;
      background: #FFFFFF;
      text-align: center;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
      border-radius: 4px;
      padding: 16px;
      z-index: 101;
    }

    &__title {
      position: relative;
      z-index: 999999;

      &--bold {
        font-weight: 600;
      }
    }

    &__actions {
      display: flex;
      justify-content: center;
      margin-top: 12px;
    }

    &__cancel {
      margin-right: 16px;
      border-radius: 4px;
    }

    &__delete {
      border-radius: 4px;
    }
  }
</style>