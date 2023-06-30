<template>
    <div v-if="account">
        <h2>{{ $t('title-account') }}</h2>
        <div>
            <div class="form-group">
                <label>{{ $t('field-name') }}</label>
                <input
                        v-model="account.name"
                        v-bind:class="{'form-control':true, 'is-invalid' : !validName}">
                <div class="invalid-feedback">{{ $t('field-name') }}{{ $t('error-required') }}</div>
            </div>

            <div class="form-group">
                <label>{{ $t('field-email') }}</label>
                <input
                        v-model="account.email"
                        v-bind:class="{'form-control':true, 'is-invalid' : !validEmail}">
                <div class="invalid-feedback">{{ $t('field-email') }}{{ $t('error-required') }}</div>
            </div>

            <div class="form-group">
                <label>{{ $t('field-accessCode') }}</label>
                <div class="form-control no-border">
                    <span>{{account._id}}</span>
                </div>
            </div>

            <div class="form-group">
                <label>{{ $t('field-language') }}</label>
                <br />
                <div class="form-check-inline">
                    <label class="form-check-label">
                        <input
                                class="form-check-input"
                                type="radio"
                                id="en"
                                name="language"
                                v-model="account.language"
                                value="en"
                        />
                        {{ $t('language-en') }}
                    </label>
                </div>
                <div class="form-check-inline">
                    <label class="form-check-label">
                        <input
                                class="form-check-input"
                                type="radio"
                                id="nl"
                                name="language"
                                v-model="account.language"
                                value="nl"
                        />
                        {{ $t('language-nl') }}
                    </label>
                </div>

                <div class="invalid-feedback">{{ $t('field-language') }}{{ $t('error-required') }}</div>
            </div>

            <button type="submit" class="btn btn-success float-right" v-on:click.stop.prevent="submit">
                {{ $t('button-update') }}
            </button>

        </div>

        <div v-if="debug">{{account}}</div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";

    export default {
        name: "accountPage",
        data () {
            return {
                debug : true,
                valid : false,
                validEmail : true,
                validName : true,
                validLanguage : true
            }
        },
        computed: mapState({
            isAuthenticated : state => state.account.authenticated,
            account : state => state.account.current
        }),
        created() {
            if(!this.isAuthenticated){
                this.$router.push('/login')
            }
        },
        methods: {
            ...mapActions('account', [
                'update'
            ]),
            ...mapActions('i18n', [
                'setLanguage'
            ]),
            validate : function(){
                this.validEmail = this.validateEmail(this.account.email);
                this.validName = this.validField(this.account.name);
                this.validLanguage = this.validField(this.account.language);

                if(this.validEmail &&
                    this.validName &&
                    this.validLanguage
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
                    this.update(this.account)

                }
            }
        },
        watch: {
            account (current){
                if(current){
                    this.setLanguage(current.language)
                    this.$router.push('/events')
                }
            }

        }
    }
</script>

<style scoped>

</style>
