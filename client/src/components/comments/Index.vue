<template>
    <div>
        <h2>Get all comments</h2>
        <h4>จำนวนComment {{ comments.length }} </h4>
        <div v-for="comment in comments" v-bind:key="comment.id">
            <p>id: {{ comment.id }} </p>
            <p>blog: {{ comment.blogId }}</p>
            <p>comment: {{ comment.comment}} </p>
            <p>
                <button v-on:click="navigateTo('/comment/'+comment.id)">ดู blog</button>
                <button v-on:click="deleteComment(comment)">ลบข้อมูล</button>
            </p>
            <hr>
        </div>
    </div>
</template>

<script>
import BlogsService from '@/sercices/BlogsService'
export default {
    data() {
        return{
            comments: []
        }
    },
    aync create () {
        this.comments = (await CommentsService.index()).data
    },
    methods: {
        logout () {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setComment', null)
            this.$router.push({
                name: 'login'
            })
        },
        navigateTo (route) {
            this.$router.push(route)
        },
        async deleteComment (comment){
            let result = confirm("Want to delete?")
            if (result) {
                try {
                    awit CommentsService.delete(comment)
                    this.refreshData()
                } catch (err) {
                    console.log(err)
                }
            }
        },
        aync refreshData(){
            this.comments = (await CommentsService.index()).data
        }
    }
}
</script>
<style scoped>

</style>