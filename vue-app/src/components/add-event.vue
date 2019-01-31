<template>
    <div>
        <h2>{{ $t('title-add-event') }}</h2>
        <div class="form-wrap container">
            <div>
                <div class="form-group">
                    <label>{{ $t('field-title') }}</label>
                    <input
                            v-model="event.title"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validTitle}">
                    <div class="invalid-feedback">{{ $t('field-title') }}{{ $t('error-required') }}</div>
                </div>

                <div class="form-group">
                    <label>{{ $t('field-description') }}</label>
                    <input
                            v-model="event.description"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validDescription}">
                    <div class="invalid-feedback">{{ $t('field-description') }}{{ $t('error-required') }}</div>
                </div>

                <div class="form-group">
                    <label>{{ $t('field-location') }}</label>
                    <input
                            v-model="event.location"
                            v-bind:class="{'form-control':true, 'is-invalid' : !validLocation}">
                    <div class="invalid-feedback">{{ $t('field-location') }}{{ $t('error-required') }}</div>
                </div>

                <div class="form-group">
                    <div class="row">
                        <div class="col-6">
                            <label style="margin-right: 10px">{{ $t('field-start-date') }}</label>
                            <date-picker
                                    v-model="startDate"
                                    lang="en"
                                    type="date"
                                    format="DD-MM-YYYY">
                            </date-picker>
                            <div class="invalid-feedback">{{ $t('field-start-date') }}{{ $t('error-required') }}</div>
                        </div>
                        <div class="col-6">
                            <label style="margin-right: 10px">{{ $t('field-end-date') }}</label>
                            <date-picker
                                    v-model="endDate"
                                    lang="en"
                                    type="date"
                                    format="DD-MM-YYYY">
                            </date-picker>
                            <div class="invalid-feedback">{{ $t('field-end-date') }}{{ $t('error-required') }}</div>
                        </div>
                    </div>
                </div>
                <router-link to="/events" class="btn btn-primary">{{ $t('button-back') }}</router-link>
                <button type="submit" class="btn btn-success float-right" v-on:click.stop.prevent="submit">
                    {{ $t('button-save') }}
                </button>
            </div>
        </div>


        <div v-if="debug">{{event}}</div>
    </div>
</template>

<script>
    import {mapActions, mapState} from "vuex";
    import DatePicker from 'vue2-datepicker'
    export default {
        name: "addEvent",
        components: { DatePicker },
        data () {
            return {
                debug : true,
                valid : false,
                submitted : false,
                validTitle : true,
                validDescription : true,
                validLocation : true,
                validStartDate : true,
                validEndDate : true,
                event : {
                    title : "",
                    description : "",
                    location : "",
                    start : new Date().getTime(),
                    end : new Date().getTime(),
                    userId : "5be564d50f085f2cc19e3fef"
                }
            }
        },
        methods: {
            addEvent(event) {
                this.addEvent(event)
            },
            ...mapActions('events', [
                'addEvent'
            ]),
            validate : function(){
                this.validTitle = this.validField(this.event.title);
                this.validDescription = this.validField(this.event.description);
                this.validLocation = this.validField(this.event.location);
                this.validStartDate = this.validField(this.event.start);
                this.validEndDate = this.validField(this.event.end);

                if(this.validTitle &&
                    this.validDescription &&
                    this.validLocation &&
                    this.validStartDate &&
                    this.validEndDate
                ){
                    this.valid = true;
                }else{
                    this.valid = false;
                }
            },
            validField : function(value){
                return value != ''
            },
            submit : function(){
                this.validate();
                if(this.valid){
                    this.submitted = true;
                    this.addEvent(this.event)
                        .then(
                            this.$router.push("/events")
                        )

                }
            }
        },
        created() {
            if(!this.isAuthenticated){
                this.$router.push('/login')
            }
        },
        computed: {
            ...mapState({
                isAuthenticated : state => state.account.authenticated,
                account : state => state.account.current,
                locale : state => state.i18n.locale
            }),
            startDate:{
                get: function () {
                    return new Date()
                },
                set: function (newValue){
                    this.event.start = new Date(newValue).getTime()
                }
            },
            endDate:{
                get: function () {
                    return new Date()
                },
                set: function (newValue){
                    this.event.end = new Date(newValue).getTime()
                }
            }
        }
    }
</script>

<style>
</style>