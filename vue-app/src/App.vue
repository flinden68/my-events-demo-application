<template>
  <div id="app" class="col-12">
    <div id="language-bar" class="language-bar">
      <ul class="language-list">
        <li>
          <a href="#" v-on:click="switchLanguage('en')" v-link="{locale : 'en', activeClass: 'active', exact: true}">EN</a>
        </li>
        <li>
          <a href="#" v-on:click="switchLanguage('nl')" v-link="{locale : 'nl', activeClass: 'active', exact: true}">NL</a>
        </li>
      </ul>
    </div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="">{{ $t('nav-home') }}</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav mr-auto">
          <li v-link="{path : '/events', activeClass: 'active', exact: true}"><router-link to="/events" class="nav-link">{{ $t('nav-all-events') }}</router-link></li>
          <li v-link="{path : '/event/add', activeClass: 'active', exact: true}"><router-link to="/event/add" class="nav-link">{{ $t('nav-add-event') }}</router-link></li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-link nav-item">Anonymous</li>
          <li v-link="{path : '/account', activeClass: 'active', exact: true}"><router-link to="/account" class="nav-link">{{ $t('nav-account') }}</router-link></li>
          <li v-link="{path : '/login', activeClass: 'active', exact: true}"><router-link to="/login" class="nav-link">{{ $t('nav-logout') }}</router-link></li>
          <li v-link="{path : '/logout', activeClass: 'active', exact: true}"><router-link to="/logout" class="nav-link">{{ $t('nav-logout') }}</router-link></li>
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
            //console.log('locale: ' + locale);
            this.setLanguage(locale);
            this.$i18n.locale = locale;
        },
        ...mapActions('i18n', [
            'setLanguage'
        ])
    },
    computed: mapState({
        locale : state => state.i18n.locale
    }),
}
</script>

<style>
  .language-bar{
    text-align: right;
    height: 20px;
  }

  ul.language-list {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  ul.language-list > li {
    display: inline;
    cursor: pointer;
  }

  ul.language-list > li:first-child:before {
    content: '';
  }

  ul.language-list > li:before {
    content: ' | ';
  }

  ul.language-list > li > a.active {
    font-weight: 900;
    cursor: default;
  }
</style>
