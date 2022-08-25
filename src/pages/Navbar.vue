<template>
    <div class="navbar">
        <div @click="$router.push('/')" style="cursor: pointer">Vue3</div>
        <div class="navbar__btns">
            <MyButton @click="$router.push('/posts')">Posts</MyButton>
            <MyButton style="margin-left: 2px" @click="$router.push('/about')">About</MyButton>
            <MyButton style="margin-left: 2px" @click="$router.push('/store-posts')">Vuex-store</MyButton>
            <MyButton style="margin-left: 2px" @click="$router.push('/composition-api-posts')">Composition-Api</MyButton>
        </div>
    </div>
</template>

<script>
    export default {
    
}
</script>

<style scoped>
.navbar{
    height: 50px;
    background: rgb(179, 209, 209);
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0px 15px;
}

.navbar__btns{
    margin-left: auto;
}

</style>