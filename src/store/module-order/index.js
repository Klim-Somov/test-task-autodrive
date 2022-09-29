const state = () => ({
  city: [
    {
      id: 1,
      name: "Москва",
    },
    {
      id: 2,
      name: "Санкт-Петербург",
    },
    {
      id: 3,
      name: "Казань",
    },
  ],
  showModal: false,
  currentCity: "",
  info: {},
  responseMessage: "",
});

const getters = {
  getShowModal: (state) => state.showModal,

  getCurrentCity: (state) => state.currentCity,

  getCitys: (state) => state.city,

  getResponseMessage: (state) => state.responseMessage,
};

const mutations = {
  setShowModal(state, payload) {
    state.showModal = payload;
  },
  setCurrentCity(state, value) {
    state.currentCity = value;
  },
  setInfo(state, value) {
    state.info = value;
  },
  setResponseMessage(state, value) {
    state.responseMessage = value;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
