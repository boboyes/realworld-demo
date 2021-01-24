<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form @submit.prevent="publish">
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title" required>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description" required>
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body" required></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="Enter tags" v-model="tagContent">
                  <div class="tag-list">
                    <div class="tag-pill tag-default"
                    v-for="item in article.tagList" :key="item">{{item}}</div>
                  </div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="publish">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {createArticle,getArticle} from '@/api/article'
export default { 
  //路由匹配组件渲染之前会先执行中间件
  middleware: 'authenticated',
  name: 'EditorIndex',
  props:['art'],
  data(){
    return {
      "article": {
        "title": "",
        "description": "",
        "body": "",
        "tagList": []
      },
      tagContent:''
    }
  },
  async created(){
    console.log(this.$route.params,'dsfdsafasdfdas')
    const {art:article} = this.$route.params
    if(article){
      const {data} =await getArticle(article.slug)
      this.article = data.article
    }
   
  },
  computed:{
    tagList(){
      return this.tagContent.split(',')
    }
  },
  methods:{
    async publish(){
      console.log('0000000000000000')
      this.article.tagList = this.tagList
      const {data} = await createArticle(this.article)
      this.$router.push({name:'home'})
    }
  }
}
</script>

<style>

</style>