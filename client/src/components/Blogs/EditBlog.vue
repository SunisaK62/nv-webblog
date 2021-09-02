<template>
    <div>
        <h1> Edit Blog</h1>
        <from v-on:submit.prevent = "editBlog">
            <p>title: <input type="text" v-model="blog.title"></p>
            <p>content: <input type="text" v-model="blog.content"></p>
            <p>category: <input type="text" v-model="blog.category"></p>
            <p>status: <input type="text" v-model="blog.status"></p>
            <p>
                <button type="submit">update blog</button>
                <button v-on:click="navigateTo('/blogs)">กลับ</button>
            </p>
        </from>
    </div>
</template>

<script>
import BlogsService from '@/sercices/BlogsService'
export default {
    data () {
        return {
            blog: {
                title: '',
                thumbnail: 'null',
                pictures: 'null',
                content: '',
                category: '',
                status: ''
            }
        }
    },
    methods: {
        aync editBlog (){
            try {
                await BlogsService.put(this.blog)
                this.$router.push({
                    name: 'blogs'
                })
            } catch (err) {
                console.log(err)
            }
        }
    },
    async create () {
        try {
            let blogId = this.$route.params.blogId
            this.blog = (await BlogsService.show(blogId)).data
        } catch (err) {
            console.log(err)
        }
    }
}
</script>
<style scoped>

</style>