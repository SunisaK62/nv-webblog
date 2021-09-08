<template>
  <div>
    <h1>Edit Blog</h1>
    <form v-on:submit.prevent="editBlog">
      <p>title: <input type="text" v-model="blog.title" /></p>

      <p><strong>Content:</strong></p>
      <p>
        <vue-ckeditor
          v-model.lazy="blog.content"
          :config="config"
          @blur="onBlur($event)"
          @focus="onFocus($ecent)"
        />
      </p>

      <p>category: <input type="text" v-model="blog.category" /></p>
      <p>status: <input type="text" v-model="blog.status" /></p>
      <p>
        <button type="submit">Update Blog</button>
        <button v-on:click="navigateTo('/blogs')">Back</button>
      </p>
    </form>
  </div>
</template>
<script>
import BlogService from "@/services/BlogService";
import VueCkeditor from "vue-ckeditor2";
export default {
  data() {
    return {
      blog: {
        title: "",
        thumbnail: "null",
        pictues: "null", 
        content: "",
        category: "",
        status: "",
      },
      config: {
        /* toolbar: [
          ["Bold", "Italic", "Underline", "Strike", "Subscript", "Superscript"],
        ], */
        height: 300
      },
    };
  },
  methods: {
    async editBlog() {
      try {
        await BlogService.put(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },
    onBlur(editor) {
      console.log(editor);
    },
    onfocus(editor) {
      console.log(editor);
    },
  },
  async created() {
    try {
      let blogId = this.$route.params.blogId;
      this.blog = (await BlogService.show(blogId)).data;
      this.config.toolbar = [
        {
          name: "document",
          items: [
            "Source",
            "-",
            "Save",
            "NewPage",
            "Preview",
            "Print",
            "-",
            "Templates"
          ]
        },
        {
          name: "clipboard",
          items: [
            "Cut",
            "Copy",
            "Paste",
            "PasteText",
            "-",
            "Undo",
            "Redo"
          ]
        },
        {
          name : "editing",
          items: ["Find", "Replace", "-", "SelectAll", "-", "Scayt"]
        },
        {
          name: "forms",
          items: [
            "Form",
            "Checkbox",
            "Radio",
            "TextField",
            "Textarea",
            "Select",
            "Button",
            "ImageButton",
            "HiddentField"
          ]
        },
        "/",
        {
          name: "basicstyles",
          items: [
            "Bold",
            "Italic",
            "Underline",
            "Strike",
            "Subscript",
            "SuperScript",
            "-",
            "CopyFormatting",
            "RemoveFormat"
          ]
        },
        {
          name: "basicstyles",
          items: [
            "Bold",
            "Italic",
            "Strike",
            "SubScript",
            "Superscript",
            "-",
            "CopyFormatting",
            "RemoveFormat"
          ]
        },
        {
          name: "paragraph",
          items: [
            "NumberedList",
            "BulletedList",
            "-",
            "Outdent",
            "Indent",
            "-",
            "Blockquote",
            "CreateDiv",
            "-",
            "JustifyLeft",
            "JustifyCenter",
            "JustifyRight",
            "JustifyBlock",
            "-",
            "BidiLtr",
            "BidiRtl",
            "Language"
          ]
        },
        { name : "Links", items: ["Link", "Unlink", "Anchor"]},{
          name: "insert",
          items: [
            "Image",
            "Flash",
            "Table",
            "HorizontalRule",
            "Smiley",
            "Specialchar",
            "PageBreak",
            "Iframe",
            "InsertPre"
          ]
        },
        "/",
        { name : "styles", items: ["Styles", "Format", "Font", "Font", "FontSize"]},
        { name: "colors", items:["TextColor", "BGColor"] },
        { name: "tools", items:["Maximize", "ShowBlocks"] },
        { name: "about", items:["About"]}
      ]
    } catch (error) {
      console.log(error);
    }
  },
  components: {
    VueCkeditor
  },
};
</script>
<style scoped>
</style>