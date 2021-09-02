<template>
    <div>
        <div class="nv-navber">
            <ul class="nav">
                <li><router-link :to="{name: 'blogs'}" >Blogs</router-link></li>
                <li><router-link :to="{name: 'users'}" >Users</router-link></li>
                <li><router-link :to="{name: 'comments'}" >Comments</router-link></li>
                <li><router-link :to="{name: 'login'}" >Login</router-link></li>
                <li><router-link :to="{name: 'blogs'}" >Blogs</router-link></li>
                <li><a v-on:click.prevent="logout" href="#">Logout</a></li>
            </ul>
            <div class="clearfix"></div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.nv-navber {
    background-color:palegoldenrod;
    width: 100%;
    padding:10px 0px 10px 0px;
}

.nv-navber {
    list-style: none;
    margin:0;
    padding:0;
    float:left;
}

.nv-navber .nav li {
    float:left;
}

.nv-navber .nav li a:hover {
    padding:10px;
    text-decoration: none;
    color:gray;
    font-weight: bold;
}

.nv-navber .nav li a.router-link-active {
    background-color:gold;
    color:darkslategrey;
}

.clearfix {
    clear: left;
}

</style>