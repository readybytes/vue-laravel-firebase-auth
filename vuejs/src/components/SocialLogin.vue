<template>
  <div class="container">
  
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
              <div class="text-center social-btn">
              <!--  <a href="#" class="btn btn-primary btn-block"><i class="fa fa-facebook"></i> Sign in with <b>Facebook</b></a>
                <a href="#" class="btn btn-info btn-block"><i class="fa fa-twitter"></i> Sign in with <b>Twitter</b></a> -->
			          <a href="#" @click="gmailLogin" class="btn btn-danger btn-block"><i class="fa fa-google"></i> Sign in with <b>Google</b></a>
             </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      error: null
    };
  },
  methods: {

    gmailLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
      .then(() => {
         this.$store.dispatch('authUser', {serviceProvider : 'email'});
      })
      .catch(function(error){
        console.log(error);
        })
    },
  }
};
</script>