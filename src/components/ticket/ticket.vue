<template>
  <div class="ticket">
    <div class="ticket__left">
      <div class="left">
        <div class="left__header">
          <div class="company">
            <img
              class="company__img"
              :src="
                `https://aviata.kz/static/airline-logos/80x80/${data.validating_carrier}.png`
              "
              alt=""
            />
            <div class="company__name">{{ data.info.carrier_name }}</div>
          </div>
          <div class="date">
            <div class="date__date">{{ depTime.date }}</div>
            <div class="date__time">{{ depTime.time }}</div>
          </div>

          <div class="way">
            <div class="way__header">
              <div class="way__city">
                {{ data.info.segments[0].origin_code }}
              </div>
              <div class="way__time">
                {{ getTravelTime(data.info.traveltime) }}
              </div>
              <div class="way__city">
                {{ data.info.segments[data.info.stops].dest_code }}
              </div>
            </div>
            <div class="way__img">
              <img src="../../assets/img/way.svg" alt="" srcset="" />
            </div>
            <div v-if="data.info.stops === 1" class="way__transfer">
              {{ transfer }}
            </div>
            <div v-else-if="data.info.stops > 1" class="way__transfer">
              {{ `${data.info.stops}  пересадки` }}
            </div>
          </div>
          <div class="date">
            <div class="date__date">
              {{ arrTime.date }}
              <span class="date__plus" v-if="plusDay">{{ "+" + plusDay }}</span>
            </div>
            <div class="date__time">{{ arrTime.time }}</div>
          </div>
        </div>
        <div class="left__footer">
          <v-btn link>Детали перелета</v-btn>
          <v-btn link>Условия тарифа</v-btn>
          <div v-if="!data.refundable" class="left__irrevocable">
            невозвратный
          </div>
        </div>
      </div>
    </div>
    <div class="ticket__right">
      <div class="right">
        <div class="right__price">{{ data.price }} ₸</div>
        <v-btn class="right__btn">Выбрать</v-btn>
        <p class="right__subtitle">Цена за всех пассажиров</p>
        <div class="right__bag-wrapper">
          <span class="right__bag-title">Нет багажа</span>
          <v-btn secondary class="right__bag-button">+ Добавить багаж</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

import vBtn from "../button/button";

export default {
  props: {
    data: Object
  },
  components: {
    vBtn
  },
  computed: {
    arrTime() {
      moment.locale("ru");
      const time = this.data.info.arr_date;
      return {
        date: moment(time).format("DD MMM dd"),
        time: moment(time).format("HH:mm")
      };
    },
    depTime() {
      moment.locale("ru");
      const time = this.data.info.dep_date;
      return {
        date: moment(time).format("DD MMM dd"),
        time: moment(time).format("HH:mm")
      };
    },
    transfer() {
      const temp = this.data.info.layovers[0];
      return `через ${
        this.data.info.segments[0].airport_dest
      }, ${this.getTravelTime(temp)}`;
    },
    plusDay() {
      const startDate = moment(
        this.data.info.dep_date.substring(0, this.data.info.dep_date.length - 5)
      );
      const endDate = moment(
        this.data.info.arr_date.substring(0, this.data.info.arr_date.length - 5)
      );

      return moment.duration(endDate.diff(startDate)).get("day");
    }
  },
  methods: {
    getTravelTime(second) {
      const day = Math.floor(second / (60 * 60 * 24));
      let days = second % (60 * 60 * 24);
      const houre = Math.floor(days / (60 * 60));
      let houres = days % (60 * 60);
      const minute = Math.floor(houres / 60);

      return `${day ? day + "д" : ""} ${houre ? houre + " ч" : ""} ${
        minute ? minute + " м" : ""
      }`;
    }
  }
};
</script>

<style lang="scss" scope>
.ticket {
  display: flex;
  width: 703px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  border-radius: 4px;

  &__left {
    width: 70%;
    background: #ffffff;
  }

  &__right {
    width: 30%;
    background: #f5f5f5;
  }
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 125px;
  padding: 20px;

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__footer {
    align-items: flex-end;
    display: flex;
  }

  &__irrevocable {
    margin-left: 18px;
    font-family: Arial;
    font-size: 0.8rem;
    color: #707276;
  }
}

.company {
  display: flex;
  align-items: center;

  &__img {
    width: 21px;
    height: 21px;
    margin-right: 8px;
  }

  &__name {
    font-family: Open Sans;
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    color: #202123;
  }
}

.date {
  &__date {
    font-size: 0.6rem;
    line-height: 16px;
    color: #202123;
  }

  &__time {
    font-weight: 600;
    font-size: 1rem;
    line-height: 22px;
    color: #202123;
  }

  &__plus {
    color: red;
  }
}

.way {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__city {
    text-transform: uppercase;
    font-size: 10px;
    line-height: 12px;
    text-align: center;
    color: #b9b9b9;
  }

  &__img {
    line-height: 0;
  }

  &__transfer {
    font-size: 0.6rem;
    color: #ff9900;
    text-align: center;
  }

  &__time {
    font-size: 0.7rem;
  }
}

.right {
  background: #f5f5f5;
  padding: 12px 20px 18px;

  &__price {
    margin-bottom: 12px;
    font-family: "Arial";
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #202123;
  }

  &__subtitle {
    margin: 8px 0 12px;
    font-family: "Open Sans";
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #707276;
  }

  &__btn {
    width: 100%;
  }

  &__bag-wrapper {
    display: flex;
    align-items: center;
  }

  &__bag-title {
    margin-right: 6px;
    font-family: "Open Sans";
    font-size: 0.6rem;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #202123;
  }
}
</style>
