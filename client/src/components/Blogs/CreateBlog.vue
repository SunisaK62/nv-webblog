<template>
  <div>
    <h1>Create Blog</h1>
    <form v-on:submit.prevent="createBlog">
      <p><strong>Title:</strong> <input type="text" v-model="blog.title" /></p>
      
      <transition name="fade">
      <div class="thumbnail-pic" v-if="blog.thumbnail != 'null'">
        <img :src="BASE_URL + blog.thumbnail" alt="thumbnail" />
      </div>
      </transition>
      
        <form enctype="multipart/form-data" novalidate>
          <div class="dropbox">
            <iput 
              type="file" 
              multiple 
              :name="UploadFieldName"
              :disabled="isSaving"
              @change="
                filesChange($event.target.name, $event.target.files);
                fileCount = $event.target.files.length;
                "
                  accept="image/*"
                  class="input-file"
              />
              <!-- <p v-if="isInitial || isSuccess"> -->
                <p v-if="isInitial">
                    Drge your file(s) here to begin<br />
                    or click to browse
                </p>
                <p v-if="isSaving">Uploading {{fileCount}} files...</p>
                <p v-if="isSuccess">Upload Successful.</p>
                <p v-if="isFailed">Upload Failed.</p>
          </div>
          <div>
            <ul class="pictures">
              <li v-for="picture in pictures" v-bind:key="picture.id">
                <img 
                  style="margin-bottom: 5px"
                  :src="BASE_URL + picture.name"
                  alt="picture image"
                />
                <button v-on:click.prevent="delFile(picture)">"Delete"</button>
                <button v-on:click.prevent="useThumbnail(picture.name)">thumbnail</button>
              </li>
            </ul>
          <div class="clearfix"></div>
        </div>
      </form>
      <p><strong>Content:</strong></p>
      <p>
        <vue-ckeditor
          v-model.lazy="blog.content"
          :config="config"
          @blur="onBlur($event)"
          @focus="onFocus($ecent)"
        />
      </p>

      <p>
        <strong>Category:</strong> <input type="text" v-model="blog.category" />
      </p>
      <p>
        <strong>Status:</strong> <input type="text" v-model="blog.status" />
      </p>
      <p><button type="submit">Create Blog</button></p>
    </form>
  </div>
</template>
<script>
import BlogService from "@/services/BlogService";
import VueCkeditor from "vue-ckeditor2";
import UploadService from '@/services/UploadService';

const STATUS_INITIAL = 0,
    STATUS_SAVING = 1,
    STATUS_SUCCESS = 2,
    STATUS_FAILED = 3;

export default {
  data() {
    return {
      BASE_URL: "http://localhost:8081/assets/uploads/",
        error: null,
        uploadError: null,
        currentStatus: null,
        uploadFieldName: "userPhoto",
        uploadedFileNames: [],
        pictures:[],
        pictureIndex:0,
      blog: {
        title: '',
        thumbnail: 'null',
        pictues: 'null', 
        content: '',
        category: '',
        status: 'saved',
      },
      config: {
         toolbar: [
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
      ],
        height: 300,
      },
    };
  },
  methods: {
    async createBlog() {
      try {
        this.blog.pictues = JSON.stringify(this.pictues);
        await BlogService.post(this.blog);
        this.$router.push({
          name: "blogs",
        });
      } catch (err) {
        console.log(err);
      }
    },
    
    navigateTo (route) {
            console.log(route);
            this.$router.push(route);
        },
        wait(ms) {
            return (x) => {
                return new Promise((resolve) => setTimeout(() => resolve(x), ms));
            };
        },
        reset() {
            this.currentStatus = STATUS_INITIAL;
            this.uploadError = null;
            this.uploadedFileNames = [];
        },
        async save(formData) {
            try {
                this.currentStatus = STATUS_SAVING;
                await UploadService.upload(formData);
                this.currentStatus = STATUS_SUCCESS;

                let pictureJSON = [];
                  this.uploadedFileNames.forEach((uploadedFileName) => {
                    let found = false;
                      for (let i=0; i < this.pictures.length; i++){
                        if(this.pictures[i].name == uploadedFileName){
                        found - true;
                        break;
                      }
                    }
                    if(!found){
                      this.pictureIndex++;
                      let pictureJSON = {
                        id: this.pictureIndex,
                        name: uploadedFileName,
                    };
                    this.pictures.push(pictureJSON);
                    }
                  });
                this.clearUploadResult();
            } catch (error) {
                console.log(error);
                this.currentStatus = STATUS_FAILED;
            }
        },
        filesChange(fieldName, fileList) {
            const formData = new FormData();

            if (!fileList.length) return;

            Array.form(Array(fileList.length).keys()).map(x => {
                formData.append(fieldName, fileList[x], fileList[x].name);
                this.uploadedFileNames.push(fileList[x].name);
            });
            this.save(formData);
        },
        clearUploadResult: function(){
            setTimeout(() => this.reset(), 5000);
        },
        async delFile(Material) {
          let result = confirm("want to Delete?");
          if (result) {
            let dataJSON = {
              fileName: Material.name,
            };
            await UploadService.delete(dataJSON);
            for(var i = 0; i < this.pictues.length; i++) {
              if(this.pictues[i].id === material.id) {
                this.pictues.splice(i, 1);
                this.materialIndex--;
                break;
              }
            }
          }
        },
        useThumbnail(filename) {
          console.log(filename)
          this.blog.thumbnail = filename
        }
  },
  created(){
    this.reset();
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  components: {
    VueCkeditor
  },
};
</script>
<style scoped>
 .dropbox {
        outline: 2px dashed grey; /*the dash box */
        outline-offset: -10px;
        background:lemonchiffon;
        color: dimgray;
        padding: 10px 10px;
        min-height: 200px;
        position: relative;
        cursor: pointer;
    }
    .input-file {
        opacity: 0; 
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }
    .dropbox:hover {
        background:khaki;
    }
    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 0;
    }
    ul.pictures {
      list-style: none;
      padding: 0;
      margin: 0;
      float: left;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    ul.pictures li {
      float: left;
    }
    ul.pictures li img {
      max-width: 180px;
      margin-right: 20 px;
    }
    .clearfix {
      clear: both;
    }
    .thumbnail-pic img{
      width:200px;
    }
</style>