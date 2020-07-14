import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";

Vue.config.productionTip = false;

// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyB6PGz7IgEQpx0bcW1i7iDOhAM8wahknXI",
  authDomain: "vue-laravel-firebase-auth.firebaseapp.com",
  databaseURL: "https://vue-laravel-firebase-auth.firebaseio.com",
  projectId: "vue-laravel-firebase-auth",
  storageBucket: "vue-laravel-firebase-auth.appspot.com",
  messagingSenderId: "84927371345",
  appId: "1:84927371345:web:1b804a8f0f1f1f07a30070",
  measurementId: "G-Z6CPCL51QG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
