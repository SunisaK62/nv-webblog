<template>
    <div>
        <h1>Blog Create</h1>
        <from v-on:submit.prevent = "createBlog">
            <p>title: <input type="text" v-model="blog.title"></p>
            <p>content: <input type="text" v-model="blog.content"></p>
            <p>category: <input type="text" v-model="blog.category"></p>
            <p>status: <input type="text" v-model="blog.status"></p>
            <p><button type="submit">create blog</button></p>
        </from>
    </div>
</template>
<script>
import BlogsService from '@/sercices/BlogsService'

export default {
    data () {
        return {
            blog : {
                title: '',
                thumbnail: 'null',
                pictures: 'null',
                content: '',
                category: '',
                status: 'saved'
            }
        }
    },
    methods: {
        aync createBlog () {
            try {
                await BlogsService.post(this.blog)
                this.$router.push({
                    name: 'blogs'
                })
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>
<style scoped>

</style>