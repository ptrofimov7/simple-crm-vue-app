import { createStore } from 'vuex'
import auth from './auth'
import info from './info'
import category from './category'
import record from './record'

export default createStore({
  state: {
    error: null,
  },
  getters: {
    error: s => s.error
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
  },

  actions: {
    async fetchCurrency() {

      const API_KEY = process.env.VUE_APP_FIXER;
      console.log({KEY: API_KEY});
      const res = await fetch(`https://data.fixer.io/api/latest?access_key=${API_KEY}&symbols=USD,EUR,UAH`)
      return res.json();
    }
  },

  modules: {
    auth, info, category, record
  }
})
