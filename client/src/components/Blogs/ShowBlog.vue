<template>
    <div>
        <h1>Blog Show</h1>
        <p>id: {{ blog.id }} </p>
        <p>title: {{ blog.title }}</p>
        <p>content: {{ blog.content }} </p>
        <p>category: {{ blog.category }}</p>
        <p>status: {{ blog.status }} </p>
        <p>
            <button v-on:click="navigateTo('/blog/edit/'+blog.id)">แก้ไข blog</button>
            <button v-on:click="navigateTo('/blogs)">กลับ</button>
        </p>
    </div>
</template>

<script>
import BlogsService from '@/sercices/BlogsService'
export default {
    data () {
        return {
            blog: null
        }
    },
    async create () {
        try {
            let blogId = this.$route.params.blogId
            this.blog = (await BlogsService.show(blogId)).data
        }catch (err) {
            console.log(err)
        }
    },
    methods : {
        navigateTo (route) {
            this.$router.push(route)
        },
    }
}
</script>
<style scoped>

</style>