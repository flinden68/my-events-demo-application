
<template>
        <div>
                <h2>{{ $t('title-all-events') }}</h2>
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
                                </tr>
                        </tbody>
                </table>
                <!--<div v-if="debug" style="border:1px dotted red">
                        {{events}}
                </div>-->
        </div>
</template>

<script>
    import {mapActions, mapState} from 'vuex'
    export default {
        name: "eventList",
        methods: {
            editEvent(event) {
                this.updateEvent(event);
            },

            removeEvent(event) {
                this.deleteEvent(event)
            },
            ...mapActions('events', [
                'getAllEventsByUserId',
                'deleteEvent',
                'updateEvent'
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
