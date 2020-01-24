<template>
  <button @click="click" :class="classes">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "vBtn",
  props: {
    link: Boolean,
    secondary: Boolean,
    disabled: Boolean //написать стили для disabled
  },
  methods: {
    click() {
      if (this.disabled) return;
      this.$emit("click");
    }
  },
  computed: {
    classes() {
      return {
        button: true,
        "button--secondary": this.secondary,
        "button--link": this.link
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.button {
  border-radius: 4px;
  background: #55bb06;
  font-size: 18px;
  padding: 8px 8px;
  cursor: pointer;
  text-align: center;
  border: none;
  outline: none;
  color: #ffffff;

  &:hover {
    box-shadow: 0 1px 5px 0 #5ca268;
    transition: all 200ms ease-in-out;
  }

  &--secondary {
    padding: 2px 5px;
    background: #eaf0fa;
    border-radius: 2px;
    font-weight: 600;
    font-size: 0.6rem;
    line-height: 16px;
    text-align: center;
    color: #5763b3;

    &:hover {
      box-shadow: 0 1px 5px 0 #99d9ff;
      transition: all 200ms ease-in-out;
    }

    a {
      color: inherit;
    }
  }

  &--link {
    padding: 2px 5px;
    background: transparent;
    font-size: 0.8rem;
    line-height: 16px;
    text-align: center;
    color: #7284e4;
    text-decoration-line: underline;
    text-decoration-style: dashed;

    &:hover {
      box-shadow: none;
    }

    a {
      color: inherit;
    }
  }
}
</style>
