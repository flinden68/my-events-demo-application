<template>

    <div>
        <h2>{{ $t('title-login') }}</h2>
        <div id="no_account" v-if="showRegister">
            <p>
                <span class="no-account-text">{{ $t('message-info-register') }}</span>
                <router-link to="/register" class="btn btn-primary">{{ $t('button-register') }}</router-link>
            </p>
        </div>
            <div>
                <div class="form-group">
                    <label>{{ $t('field-email') }}</label>
                    <input
                            v-model="email"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validEmail}">
                    <div class="invalid-feedback">{{ $t('field-email') }}{{ $t('error-required') }}</div>
                </div>

                <div class="form-group">
                    <label>{{ $t('field-accessCode') }}</label>
                    <input
                            v-model="accessCode"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validAccessCode}">
                    <div class="invalid-feedback">{{ $t('field-accessCode') }}{{ $t('error-required') }}</div>
                </div>

                <button type="submit" class="btn btn-success float-right" v-on:click.stop.prevent="submit">
                    {{ $t('button-login') }}
                </button>

            </div>
    </div>


</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: "login",
        data () {
            return {
                debug : true,
                valid : false,
                validEmail : true,
                validAccessCode : true,
                email : "flinden68@elstarit.nl",
                accessCode : "5be564d50f085f2cc19e3fef",
                showRegister : false
            }
        },
        methods: {
            ...mapActions('account', [
                'fetchAccount'
            ]),
            ...mapActions('i18n', [
                'setLanguage'
            ]),
            validate : function(){
                this.validEmail = this.validateEmail(this.email);
                this.validAccessCode = this.validField(this.accessCode);

                if(this.validEmail &&
                    this.validAccessCode
                ){
                    this.valid = true;
                }else{
                    this.valid = false;
                }
            },
            validField : function(value){
                return value != ''
            },
            validateEmail : function(email){
                const re = /(.+)@(.+){2,}\.(.+){2,}/;
                return re.test(email.toLowerCase());
            },
            submit : function(){
                this.validate();
                if(this.valid){
                    let login = {
                        _id: this.accessCode,
                        email : this.email
                    }
                    this.fetchAccount(login)

                }
            }
        },
        computed: mapState({
            account : state => state.account.current,
        }),
        watch: {
            account (current){
                if(current){
                    this.showRegister = false;
                    this.setLanguage(current.language)
                    this.$router.push('/events')
                }else{
                    this.showRegister = true
                }
            }

        }
    }
</script>

<style scoped>

</style>