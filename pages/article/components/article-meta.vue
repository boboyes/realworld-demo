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
    <template v-if="article.author.username === user.username">
      <nuxt-link 
      :to="{
        name:'editor',
        params:{
          art:article
        }
      }"
      class="btn btn-outline-secondary btn-sm">
        <i class="ion-edit"></i> Edit Article
      </nuxt-link>

      <button class="btn btn-outline-danger btn-sm" @click="deleteArt(article)">
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </template>
    <template v-else>
      <button class="btn btn-sm btn-outline-secondary" @click="onFollowing(profile)" :disabled="followDisabled" :class="{active:profile.following}">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow Eric Simons 
        <!-- <span class="counter">(10)</span> -->
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary" @click="onFavorite(article)" :disabled="article.favoriteDisabled" :class="{active:article.favorited}">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">({{article.favoritesCount}})</span>
      </button>
    </template>

  </div>
</template>

<script>
import {addFavorite,deleteFavorite,deleteArticle,updateArticle} from '@/api/article'
import {getUserInfo,feedUser,cancelFeedUser} from '@/api/user'
import {mapState} from 'vuex'
export default {
  name:'articleMeta',
  props:{
    article:{
      type:Object,
      required:true
    }
  },
  data(){
    return {
      profile:{
        bio: null,
        following: false,
        image: "https://static.productionready.io/images/smiley-cyrus.jpg",
        username: "cdfghjfdhj",
        
      },
      followDisabled:false
    }
  },
  computed:{
     ...mapState(['user'])
  },
  async created(){
    this.article.favoriteDisabled = false
    const {data} = await getUserInfo(this.article.author.username)
    const {profile} = data
    this.profile = profile
    console.log(profile,'888----------------')
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
    },
    async onFollowing(profile){
      this.followDisabled = true  //网络请求期间禁用点击
      if(profile.following){
        await cancelFeedUser(profile.username)
        profile.following = false
      } else {
        await feedUser(profile.username)
        profile.following = true
      }
      this.followDisabled = false
    },
    async deleteArt(article){
      await deleteArticle(article.slug)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>