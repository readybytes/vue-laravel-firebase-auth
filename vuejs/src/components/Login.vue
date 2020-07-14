<template>
  <div class="container">
  <!-- Login page tabs -->
      <ul class="nav nav-tabs nav-justified md-tabs indigo" id="myTabJust" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="phone-tab-just" data-toggle="tab" href="#phone-just" role="tab" aria-controls="phone-just"
            aria-selected="true">Phone</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="social-tab-just" data-toggle="tab" href="#social-just" role="tab" aria-controls="social-just"
            aria-selected="false">Social</a>
        </li>
      </ul>

  <!-- Login page components -->
      <div class="tab-content  pt-5" id="myTabContentJust">
        <div class="tab-pane fade show active" id="phone-just" role="tabpanel" aria-labelledby="phone-tab-just">
          <PhoneLogin />
        </div>
        <div class="tab-pane fade" id="social-just" role="tabpanel" aria-labelledby="social-tab-just">
          <SocialLogin />
        </div>
      </div>
    
  </div>
</template>

<script>

import PhoneLogin from './PhoneLogin.vue';
import SocialLogin from './SocialLogin.vue';

export default {
 components: {
   PhoneLogin,
   SocialLogin
 }
};
</script>