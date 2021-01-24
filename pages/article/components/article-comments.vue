<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea v-model="comment.body" required class="form-control" placeholder="Write a comment..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img src="" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
        Post Comment
        </button>
      </div>
    </form>
    
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name:'profile',
          params:{
            username:comment.author.username
          }
        }" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name:'profile',
          params:{
            username:comment.author.username
          }
        }" class="comment-author">{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
        <span class="mod-options" v-if="comment.author.username===user.username">
          <!-- <i class="ion-edit"></i> -->
          <i class="ion-trash-a" @click="deleteComment(comment.id)"></i>
        </span>
      </div>
    </div>

  </div>
</template>

<script>
import {getComments,addComments,deleteComments} from '@/api/article'
import {mapState} from 'vuex'
export default {
  name:'ArticleComments',
  props:{
    article:{
      type:Object,
      required:true
    } 
  },
  data(){
    return {
      comments:[],
      comment: {
        "body": ""
      }
    }
  },
  async created(){
    const {data} = await getComments(this.article.slug)
    this.comments = data.comments
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    async onSubmit(){
      await addComments({slug:this.article.slug,data:{
        comment:this.comment
      }})
      const {data} = await getComments(this.article.slug)
      this.comments = data.comments
    },
    async deleteComment(id){
      await deleteComments({
        slug:this.article.slug,
        id
      })
      const { data } = await getComments(this.article.slug)
      this.comments = data.comments
    }
  }
}
</script>

<style>

</style>