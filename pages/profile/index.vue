<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
              {{profile.bio}}
            </p>
            <nuxt-link v-if="user.username===profile.username" 
            :to="{
              name:'settings'
            }"
            class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-gear-a"></i> Edit Profile Settings
            </nuxt-link>
            <button v-else :class="{active:profile.following}" 
            :disabled="feedUserFlag"
            @click="toggleUser(profile)"
            class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              Follow Eric Simons 
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link 
                class="nav-link" 
                :class="{active:$route.params.favorited}"
                :to="{
                  name:'profile',
                  params:{
                    username: username,
                    favorited: 'author'
                  }
                }"
                exact>My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                 <nuxt-link
                class="nav-link" 
                :class="{active:favorited}"
                :to="{
                  name:'profilef',
                  params:{
                    username: username,
                    favorited: 'favorited'
                  }
                }"
                exact>Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>


        <div 
            class="article-preview"
            v-for="article in articles"
            :key="article.slug"
          >
            <div class="article-meta">
              <nuxt-link :to="{
                name: 'profile',
                params: {
                  username: article.author.username
                }
              }">
              <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                 <nuxt-link class="author" :to="{
                    name: 'profile',
                    params: {
                      username: article.author.username
                    }
                  }">
                  {{article.author.username}}
                 </nuxt-link>
                <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{active:article.favorited}" 
                @click="onFavorite(article)"
                :disabled="article.favoriteDisabled"
                >
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{
              name:'article',
              params:{
                slug: article.slug
              }
            }" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <li 
                class="tag-default tag-pill tag-outline"
                v-for="(tag,index) in article.tagList"
                :key="index"
                >{{tag}}</li>
              </ul>
            </nuxt-link>
          </div>
          <div class="article-preview" v-if="!articles.length">
            {{favorited ? 'No articles are here... yet.' :'Loading articles...'}}
          </div>
        </div>
        
      </div>
        <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li
                class="page-item"
                :class="{
                  active: item === page
                }"
                v-for="item in totalPage"
                :key="item"
              >
                <nuxt-link
                  class="page-link"
                  :to="{
                    name:'profile',
                    params:{
                      username: username,
                    }
                  }"
                >{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
          <!-- /分页列表 -->
    </div>

  </div>
</template>

<script>
import {getUserInfo,feedUser,cancelFeedUser} from '@/api/user'
import {getArticles,addFavorite,deleteFavorite} from '@/api/article'
import {mapState} from 'vuex'
export default {
  middleware: 'authenticated',
  name: 'ProfileIndex',
  data(){
    return {
      feedUserFlag:false
    }
  },
  async asyncData({params}){
    const limit = 4
    const page = Number.parseInt(params.page|| 1)
    const favorited = params.favorited ||null
    let options = {}
    const {username} = params
    if(favorited){
      options.favorited = username
    }else{
      options.author = username
    }
    const [proRes,articleRes] = await Promise.all([
      getUserInfo(username),
      getArticles({
        limit,
        offset: (page - 1) * limit,
        ...options
      })
    ])
    const {profile} = proRes.data
    const {articles, articlesCount} = articleRes.data
    articles.forEach(article => article.favoriteDisabled = false)
    console.log(favorited,'------')
    return {
      profile,
      articles,
      articlesCount,
      limit,
      page,
      favorited,
      username
    }
  },
  computed:{
    ...mapState(['user']),
    totalPage () {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  watchQuery:['author','favorited','page'],
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
    async toggleUser(profile){
      this.feedUserFlag = true
      if(profile.following){
        const {data} = await cancelFeedUser(profile.username)
        profile.following = true
        this.profile = data.profile
      
      } else{
         const {data} = await feedUser(profile.username)
         profile.following = false
         this.profile = data.profile
      }
      this.feedUserFlag = false
    }
  }
}
</script>

<style>

</style>