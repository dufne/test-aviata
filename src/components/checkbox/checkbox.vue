<template>
  <div class="checkbox">
    <label class="checkbox-container">
      <input :value="val" v-model="model" type="checkbox" />
      <span class="checkmark"></span>
      <div class="text"><slot></slot></div>
    </label>
  </div>
</template>

<script>
export default {
  props: ["value", "val"],
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>

<style lang="scss" scope>
.checkbox-container {
  display: block;
  position: relative;
  cursor: pointer;
  user-select: none;
  padding: 0;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 12px;
  width: 12px;
  background-color: white;
  border: 1px solid #c2c2c2;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: #55bb06;
}
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container .checkmark:after {
  left: 0.2rem;
  top: 1.4px;
  width: 3px;
  height: 6px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
.text {
  padding-left: 25px;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #202123;
}
</style>
