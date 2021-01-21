<template>
   <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params:{
        username:article.author.username
      }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
        name:'profile',
        params: {
          username:article.author.username
        }
      }">
        {{article.author.username}}
      </nuxt-link>
      <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" :class="{active:article.author.following}">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow Eric Simons <span class="counter">(10)</span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary" @click="onFavorite(article)" :disabled="article.favoriteDisabled" :class="{active:article.favorited}">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>
  </div>
</template>

<script>
import {addFavorite,deleteFavorite} from '@/api/article'
export default {
  name:'articleMeta',
  props:{
    article:{
      type:Object,
      required:true
    }
  },
  created(){
    this.article.favoriteDisabled = false
    console.log(this.article,'----------------')
  },
   methods:{
    async onFavorite(article){
      article.favoriteDisabled = true  //网络请求期间禁用点击
      if(article.favorited){
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style>

</style>