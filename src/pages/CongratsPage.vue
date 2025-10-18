<template>
    <div>
        <h1>CONGRATULATIONS! 🥳🎉</h1>

        <router-link class="congrats__reset-button" to="/">Go again</router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.congrats__reset-button {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: all 0.3s ease;
}

.congrats__reset-button:hover {
    transform: scale(1.05);
    background-color:#46a178
}
</style>