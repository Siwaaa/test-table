<template>
  <div class="preloader">
    <div class="preloader__base">
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preloader {
  width: 300px;
  height: 300px;
  display: inline-block;
  overflow: hidden;
  background: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__base {
    width: 100%;
    height: 100%;
    position: relative;
    transform: translateZ(0) scale(2);
    backface-visibility: hidden;
    transform-origin: 0 0;

    & div {
      position: absolute;
      border-width: 1.3px;
      border-style: solid;
      opacity: 1;
      border-radius: 50%;
      box-sizing: content-box;
      animation: pulse 0.6024096385542168s cubic-bezier(0,0.2,0.8,1) infinite;

      &:nth-child(1) {
        border-color: #26a500;
      }
      &:nth-child(2) {
        border-color: #5ae20d;
        animation-delay: -0.3012048192771084s;
      }
    }
  }
}

@keyframes pulse {
  0% {
    top: 63.7px;
    left: 63.7px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 24.05px;
    left: 24.05px;
    width: 79.3px;
    height: 79.3px;
    opacity: 0;
  }
}
</style>