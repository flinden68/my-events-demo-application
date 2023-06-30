<template>
    <div>
        <h2>{{ $t('title-edit-event') }}</h2>
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
                            <VueDatePicker
                                    v-model="startDate"
                                    lang="en"
                                    type="date"
                                    format="dd-MM-yyyy">
                            </VueDatePicker>
                            <div class="invalid-feedback">{{ $t('field-start-date') }}{{ $t('error-required') }}</div>
                        </div>
                        <div class="col-6">
                            <label style="margin-right: 10px">{{ $t('field-end-date') }}</label>
                            <VueDatePicker
                                    v-model="endDate"
                                    lang="en"
                                    type="date"
                                    format="dd-MM-yyyy">
                            </VueDatePicker>
                            <div class="invalid-feedback">{{ $t('field-end-date') }}{{ $t('error-required') }}</div>
                        </div>
                    </div>
                </div>
                <router-link to="/events" class="btn btn-primary">{{ $t('button-back') }}</router-link>
                <button type="submit" class="btn btn-success float-right" v-on:click.stop.prevent="submit">
                    {{ $t('button-save') }}
                </button>
            </div>


        <div >{{event}}</div>
    </div>
</template>

<script>
    import {mapActions, mapGetters, mapState} from "vuex";
    import VueDatePicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css';

    export default {
        name: "editEvent",
        components: { VueDatePicker },
        data () {
            return {
                debug : true,
                eventId: 0,
                valid : false,
                submitted : false,
                validTitle : true,
                validDescription : true,
                validLocation : true,
                validStartDate : true,
                validEndDate : true
            }
        },
        methods: {
            updateEvent(event) {
                this.updateEvent(event)
            },
            ...mapActions('events', [
                'updateEvent'
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
                return value !== ''
            },
            submit : function(){
                this.validate();
                if(this.valid){
                    this.submitted = true;
                    this.updateEvent(this.event)
                        .then(
                            this.$router.push("/events")
                        )

                }
            }
        },
        created() {
            this.eventId = this.$route.params.id;
            if(!this.isAuthenticated){
                this.$router.push('/login')
            }
        },
        computed: {
            ...mapGetters('events', ['getEventById']),
            event: function () {
                return this.getEventById(this.$route.params.id);
            },
            startDate:{
                get: function () {
                    return new Date(this.getEventById(this.eventId).start)
                },
                set: function (newValue){
                    this.event.start = new Date(newValue).getTime()
                }
            },
            endDate:{
                get: function () {
                    return new Date(this.getEventById(this.eventId).end)
                },
                set: function (newValue){
                    this.event.end = new Date(newValue).getTime()
                }
            },
            ...mapState({
                isAuthenticated : state => state.account.authenticated,
                account : state => state.account.current,
                locale : state => state.i18n.locale
            }),
        }
    }
</script>

<style scoped>

</style>
