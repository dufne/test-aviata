<template>
  <div class="filter">
    <div class="filter__title">
      {{ title }}
      <span v-if="checked.length" class="filter__button" @click="clear"
        ><clear-icon
      /></span>
    </div>
    <div class="filter__checkbox-wrapper">
      <checkbox
        class="filter__checkbox"
        v-for="(item, index) in items"
        :val="item.value"
        @input="chenge"
        v-model="checked"
        :key="index"
        >{{ item.label }}
      </checkbox>
    </div>
  </div>
</template>

<script>
import checkbox from "../checkbox/checkbox";
import clearIcon from "../icon/clear";

export default {
  props: {
    title: String,
    items: Array,
    value: Array
  },

  components: {
    checkbox,
    clearIcon
  },
  data() {
    return {
      checked: this.value
    };
  },
  methods: {
    chenge(e) {
      this.$emit("input", e);
    },
    clear(e) {
      this.checked = [];
      this.$emit("clear");
    },
    clear1(e) {
      this.checked = [];
      this.$emit("clear1");
    }
  },
  watch: {
    value() {
      this.checked = this.value;
    }
  }
};
</script>

<style lang="scss" scope>
.filter {
  min-width: 14vw;
  max-height: 340px;
  overflow: hidden;
  border-radius: 4px;
  background: #f5f5f5;

  &__title {
    display: flex;
    padding: 12px 12px;
    font-size: 14px;
    line-height: 20px;
    color: #202123;
  }

  &__button {
    margin-left: auto;
    line-height: 0;
    fill: #b9b9b9;

    &:hover {
      fill: #7284e4;
    }
  }

  &__checkbox-wrapper {
    max-height: 250px;
    overflow-y: auto;
  }

  &__checkbox {
    padding: 10px 12px;
    display: flex;
    align-items: center;

    &:hover {
      background: #ebebeb;
    }
  }
}
</style>
