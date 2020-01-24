import data from "./results.json";

const state = {
  tickets: data || []
};

const getters = {
  getСompanies: state => {
    const temp = [];
    for (let [key, value] of Object.entries(state.tickets.airlines)) {
      temp.push({ value: key, label: value });
    }

    return temp;
  },
  getFlights: state => (companies = [], options) => {
    const { bag, refundable, stops } = options.reduce(function(result, item) {
      result[item] = item;
      return result;
    }, {});

    let temp = state.tickets.flights.map(item => ({
      ...item,
      info: item.itineraries[0][0]
    }));

    if (companies.length) {
      temp = temp.filter(item =>
        companies.some(elem => elem === item.validating_carrier)
      );
    }
    if (bag) {
      // проверка на багаж
      temp = temp.filter(item =>
        item.info.segments.find(seg => seg.baggage_options[0].value === 0)
      );
    }
    if (refundable) {
      //проверка на возврат
      temp = temp.filter(item => item.refundable);
    }
    if (stops) {
      //проверка на пересадки
      temp = temp.filter(item => !item.info.stops);
    }

    return temp;
  }
};

const actions = {};
const mutations = {};

export default {
  state,
  mutations,
  actions,
  getters
};
