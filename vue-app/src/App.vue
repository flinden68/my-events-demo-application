<template>
  <div id="app" class="col-12">
    <div id="language-bar" class="language-bar">
      <!--<ul class="language-list">
        <li>
          <a href="#" v-on:click="switchLanguage('en')" v-link="{locale : 'en', activeClass: 'active', exact: true}">EN</a>
        </li>
        <li>
          <a href="#" v-on:click="switchLanguage('nl')" v-link="{locale : 'nl', activeClass: 'active', exact: true}">NL</a>
        </li>
      </ul>-->
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">{{ $t('nav-home') }}</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav ml-auto">
          <li v-bind:active-class="$route.path!== '/events' ? 'active' : ''" v-if="isAuthenticated"><router-link to="/events" class="nav-link">{{ $t('nav-all-events') }}</router-link></li>
          <li v-bind:active-class="$route.path!== '/event/add' ? 'active' : ''" v-if="isAuthenticated"><router-link to="/event/add" class="nav-link">{{ $t('nav-add-event') }}</router-link></li>
        </ul>
      </div>
      <div class=" d-flex justify-content-end" id="navbarNavAltMarkup1">
        <ul class="navbar-nav">
          <li class="nav-link nav-item" v-if="!isAuthenticated">Anonymous</li>
          <li class="nav-link nav-item" v-if="isAuthenticated">{{account.name}}</li>
          <li v-bind:active-class="$route.path!== '/account' ? 'active' : ''" v-if="isAuthenticated"><router-link to="/account" class="nav-link">{{ $t('nav-account') }}</router-link></li>
          <li v-bind:active-class="$route.path!== '/login' ? 'active' : ''" v-if="!isAuthenticated"><router-link to="/login" class="nav-link">{{ $t('nav-login') }}</router-link></li>
          <li v-if="isAuthenticated"><a href="#" class="nav-link" v-on:click="logout">{{ $t('nav-logout') }}</a></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>


<script>
    import {mapActions, mapState} from 'vuex'
export default {
  name: 'app',
    methods: {
        switchLanguage: function(locale){
            this.setLanguage(locale);
            this.$i18n.locale = locale;
        },
        ...mapActions('i18n', [
            'setLanguage'
        ]),
        ...mapActions('account', [
            'logout'
        ])
    },
    computed: mapState({
        locale : state => state.i18n.locale,
        isAuthenticated : state => state.account.authenticated,
        account : state => state.account.current,
    }),

    watch: {
        isAuthenticated (authication) {
            if(!authication){
                this.setLanguage('en');
                this.$router.push('/login');
            }
        },
        locale (newLanguage){
            this.$i18n.locale = newLanguage;
        }
    }
}
</script>

<style>

</style>
