<template>
  <div class="container">
    <div class="option">
      <v-filter
        title="Опции тарифа"
        :items="options"
        :value="selectedOptions"
        v-model="selectedOptions"
        @clear="clearOptions"
      />
      <v-filter
        title="Авиакомпании"
        :items="getСompanies"
        :value="company"
        v-model="company"
        @clear="clear"
      />
      <v-btn @click="clearAllSetting" link class="right__bag-button"
        >Сбросить все фильтры</v-btn
      >
    </div>
    <div class="search__list">
      <v-ticket
        class="search__item"
        v-for="(item, index) in flights"
        :key="index"
        :data="item"
      />
    </div>
  </div>
</template>

<script>
import vFilter from "../components/filter/filter";
import vTicket from "../components/ticket/ticket";
import vBtn from "../components/button/button";
import { mapGetters } from "vuex";

export default {
  components: {
    vFilter,
    vTicket,
    vBtn
  },
  data() {
    return {
      company: [],
      selectedOptions: [],
      options: [
        {
          label: "Только прямые",
          value: "stops"
        },
        {
          label: "Только с багажом",
          value: "bag"
        },
        {
          label: "Только возвратные",
          value: "refundable"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getСompanies", "getFlights"]),
    flights() {
      return this.getFlights(this.company, this.selectedOptions);
    }
  },
  methods: {
    clear() {
      this.company = [];
    },
    clearOptions() {
      this.selectedOptions = [];
    },
    clearAllSetting() {
      this.clearOptions();
      this.clear();
    }
  }
};
</script>

<style lang="scss" scope>
.container {
  width: 1000px;
  padding: 40px 0;
  margin: 0 auto;
  overflow: auto;

  display: flex;

  .option {
    margin: 24px;
    > div {
      margin-bottom: 12px;
    }
  }
}
.search {
  &__list {
    margin: 24px 0;
  }

  &__item {
    margin-bottom: 24px;
  }
}
</style>
