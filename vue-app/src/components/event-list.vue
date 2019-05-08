
<template>
        <div>
                <h2>{{ $t('title-my-events') }}</h2>
            <div v-if="showNoEvents">
                <p>
                    <span class="no-account-text">{{ $t('message-no-events') }}</span>
                    <router-link to="//event/add" class="btn btn-primary">{{ $t('button-add-event') }}</router-link>
                </p>
            </div>
            <div v-if="!showNoEvents">
                <div id="export-events" class="button-row1">
                    <button class="btn btn-primary float-left" v-on:click="reloadEvents">
                        {{ $t('button-refresh') }}
                    </button>
                    <button type="submit" class="btn btn-success float-right" v-on:click="exportEvents">
                        {{ $t('button-export') }}
                    </button>
                </div>
                <table class="table">
                        <thead>
                        <tr>
                                <th scope="col">{{ $t('column-title') }}</th>
                                <th scope="col">{{ $t('column-description') }}</th>
                                <th scope="col">{{ $t('column-location') }}</th>
                                <th scope="col">{{ $t('column-start-date') }}</th>
                                <th scope="col">{{ $t('column-end-date') }}</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                                <tr v-for="event in events" :key="event._id" >
                                        <td>{{event.title}}</td>
                                        <td>{{event.description}}</td>
                                        <td>{{event.location}}</td>
                                        <td>{{ new Date(event.start) | moment("DD-MM-YYYY") }}</td>
                                        <td>{{ new Date(event.end) | moment("DD-MM-YYYY") }}</td>
                                        <td>
                                                <router-link :to="{ name: 'event_edit', params: { id: event._id }}" class="btn btn-warning">{{ $t('button-edit') }}</router-link>
                                        </td>
                                        <td>
                                                <button type="submit" class="btn btn-danger" v-on:click="deleteEvent(event)">
                                                        {{ $t('button-delete') }}
                                                </button>
                                        </td>
                                </tr>
                        </tbody>
                </table>
            </div>
        </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    import {createIcal} from "../service/calendar";
    import FileSaver from 'file-saver';
    export default {
        name: "eventList",
        data () {
            return {
                showNoEvents : false,
            }
        },
        methods: {
            ...mapActions('events', [
                'getAllEventsByUserId',
                'deleteEvent'
                ]),
            getDomain(){
                let domain = this.account.email.substring(this.account.email.indexOf("@") + 1, this.account.email.length);
                return domain;
            },

            getTimezone(){
                let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                return timezone;
            },
            reloadEvents(){
                this.getAllEventsByUserId(this.account._id);
            },
            exportEvents(){
                let payload = {
                    organizer: this.account.name + " <" + this.account.email + ">",
                    domain : this.getDomain(),
                    timezone : this.getTimezone(),
                    events: this.events
                }

                console.log("Export payload = " + JSON.stringify(payload));
                createIcal(payload).then(response => {
                    let blob = new Blob([response.data], {type: "text/calendar;charset=utf-8"});
                    FileSaver.saveAs(blob, "calendar.ics");
                })
                    .catch(error => {
                        throw(error);
                    });
            }
        },

        computed: {
            ...mapState({
                events : state => state.events.all,
                isAuthenticated : state => state.account.authenticated,
                account : state => state.account.current
            }),
        },


        created (){
            if(!this.isAuthenticated){
                this.$router.push('/login')
            }else{
                this.getAllEventsByUserId(this.account._id);
            }

            this.showNoEvents = this.events.length;
        }

    }
</script>

<style scoped>

</style>
