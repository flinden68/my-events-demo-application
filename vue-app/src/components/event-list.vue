
<template>
        <div>
                <h2>{{ $t('title-my-events') }}</h2>
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
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: "eventList",
        methods: {
            ...mapActions('events', [
                'getAllEventsByUserId',
                'deleteEvent'
                ])
        },

        computed: mapState({
            events : state => state.events.all
        }),

        created (){
            this.getAllEventsByUserId('5be564d50f085f2cc19e3fef');
        }

    }
</script>

<style scoped>

</style>
