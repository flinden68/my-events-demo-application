
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
                ])
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
