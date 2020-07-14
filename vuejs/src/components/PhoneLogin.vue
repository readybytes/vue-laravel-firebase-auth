<template>
  <div class="container">
    <div class="row justify-content-center">    <div id="recaptcha-container"></div><br>

      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{error}}</div>
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Phone No</label>

                <div class="col-md-6">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <div class="input-group-text">+91</div>
                      </div>
                      <input
                        id="number"
                        type="number"
                        class="form-control"
                        name="number"
                        value
                        required
                        autofocus
                        v-model="phNo"
                        :disabled='otpSent'
                      />
                     </div>
                </div>
              </div>
              <div class="form-group row" v-if='otpSent'>
                <label for="password" class="col-md-4 col-form-label text-md-right">OTP</label>

                <div class="col-md-6">
                  <input
                    id="otp"
                    type="number"
                    class="form-control"
                    name="otp"
                    required
                    v-model="otp"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                    <div v-if='otpSent'>
                        <button @click="verifyOtp" class="btn btn-outline-primary"> 
                          <i v-if='processing' class="fa fa-refresh fa-spin"></i> 
                          Login 
                        </button> &nbsp;
                        <a  @click="otpSent = false" class="text-primary ">
                          Change Number ?
                        </a>
                    </div>
                    <div v-else>
                        <button  @click="sendOtp()" class="btn btn-outline-primary"> 
                          <i v-if='processing' class="fa fa-refresh fa-spin"></i> 
                           Send OTP 
                        </button>
                    </div>
                </div>
              </div>
            
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
   import firebase from 'firebase'
  export default {
    data(){
      return{
        phNo: '',
        appVerifier : '',
        otp : '',
        error: null,
        otpSent: false,
        processing: false
      }
    },
    methods :{
      sendOtp(){
        if(this.phNo.length != 10){
          this.error = 'Invalid Phone Number Format !';
        }
        else{  
          let countryCode = '+91'
          let phoneNumber = countryCode + this.phNo
          let appVerifier = this.appVerifier
          this.processing = true;

          firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult;
              this.otpSent = true;
              this.processing = false;
            }).catch((error) => {
                console.log(error)
                this.error = 'Error ! SMS not sent';
                this.processing = false;
          });
        }
        
      },
      
      verifyOtp(){
        if(this.phNo.length != 10 || this.otp.length != 6){
          alert('Invalid OTP Format !');
        }
        else{
          let code = this.otp
          this.processing = true;
          window.confirmationResult
            .confirm(code)
            .then(() => {
                this.$store.dispatch('authUser', {serviceProvider : 'phone_number'});
                this.processing = false;
            })
            .catch((error) => {
              console.log(error)
              this.error = 'Error ! Something went wrong';
              this.processing = false;
            });
        }
      },

      initReCaptcha(){
        setTimeout(()=>{
          window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': function(response) {
                console.log(response)
            },
            'expired-callback': function() {

            }
          });
          
          this.appVerifier =  window.recaptchaVerifier
        },1000)
      }
    },
    created(){
      this.initReCaptcha()
    }
  }
</script>

<style scoped>

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
}
input[type=number] {
  -moz-appearance: textfield;
}

</style>