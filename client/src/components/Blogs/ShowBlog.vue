<template>
  <div>
    <h1>Show Blog</h1>
    <p>id: {{ blog.id }}</p>
    <p>title: {{ blog.title }}</p>
    <p>content: {{ blog.content }}</p>
    <p>category: {{ blog.category }}</p>
    <p>status: {{ blog.status }}</p>

    <p>
      <button v-on:click="navigateTo('/blog/edit/' + blog.id)">
        Edit Blog
      </button>
      <button v-on:click="navigateTo('/blogs')">Back</button>
    </p>
  </div>
</template>

<script>
import BlogService from "@/services/BlogService";
export default {
  data() {
    return {
      blog: null,
    };
  },
  async created() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogService.show(blogId)).data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
<style scoped>
</style>