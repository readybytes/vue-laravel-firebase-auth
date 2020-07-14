import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";
import * as firebase from "firebase";
import createPersistedState from "vuex-persistedstate"


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },

  getters: {
    user(state){
      return state.user;
    }
  },

  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    reset(state) {
      state.user.loggedIn = false;
      state.user.data = null;
    }
  },
  

  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          displayName: user.displayName,
          email: user.email
        });
      } else {
        commit("SET_USER", null);
      }
    },

    logout({commit}){
      commit('reset')
      return router.push("/");
    },

    authUser({dispatch}, data){
      firebase.auth().onAuthStateChanged(user => {   
        user.getIdToken().then(function(accessToken) {
          data['accessToken'] = accessToken;
          return axios
                  .post ("http://localhost:8000/api/authUser", data)
                  .then (response => {
                    console.log(response);
                    dispatch("fetchUser", user); 
                    return router.push("/dashboard");
                  })
                  .catch (function ( error ) {
                    throw error ;
                  })
          })
      });  
    }
  },

  plugins: [
    createPersistedState({
      key: 'vue_laravel_firebase_auth'
    })
  ]

});