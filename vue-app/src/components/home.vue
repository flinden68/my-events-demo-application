<template>
    <div class="row">
        <div class="col-2">

        </div>
        <div class="col-8 text-center"  style="text-align: center">
            <h1>{{ $t('title-home') }}</h1>
            <router-link to="/register" class="btn btn-primary">{{ $t('button-register') }}</router-link>
            <br />
            <br />
            <router-link to="/login" class="btn btn-primary">{{ $t('button-login') }}</router-link>
        </div>
        <div class="col-2"></div>
    </div>
</template>

<script>
    export default {
        name: "home"
    }
</script>

<style scoped>

</style>