<template>
  <div>
    <h1>Get all blogs</h1>
    <h4>จำนวน blog {{ blogs.length }}</h4>
    <p><button v-on:click="navigateTo('/blog/create')">Create Blog</button></p>
    <div v-for="blog in blogs" v-bind:key="blog.id">
      <p>id: {{ blog.id }}</p>
      <p>title: {{ blog.title }}</p>
      <p>content: {{ blog.content }}</p>
      <p>category: {{ blog.category }}</p>
      <p>status: {{ blog.status }}</p>
      <p>
        <button v-on:click="navigateTo('/blog/' + blog.id)">Check Blog</button>
        <button v-on:click="navigateTo('/blog/edit/' + blog.id)">
          Edit Blog
        </button>
        <button v-on:click="deleteBlog(blog)">Delete Blog</button>
      </p>
    </div>
    <p><button v-on:click="logout">Logout</button></p>
  </div>
</template>
<script>
import BlogService from "@/services/BlogService";
export default {
  data() {
    return {
      blogs: [],
    };
  },
  async created() {
    this.blogs = (await BlogService.index()).data;
  },
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUser", null);
      this.$router.push({
        name: "login",
      });
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    async deleteBlog(blog) {
      let result = confirm("Want to delete?");
      if (result) {
        try {
          await BlogService.delete(blog);
          this.refreshData();
        } catch (err) {
          console.log(err);
        }
      }
    },
    async refreshData() {
      this.blogs = (await BlogService.index()).data;
    },
  },
};
</script>
<style scoped>
</style>