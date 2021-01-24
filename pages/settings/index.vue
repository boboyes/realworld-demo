<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="update">
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="profile.image">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="profile.username" required>
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="profile.bio"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="email" required>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password" required>
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getUser,getUserInfo,updateUser} from '@/api/user'
import {mapState} from 'vuex'
export default {
  middleware: 'authenticated',
  name: 'SettingsIndex',
  data(){
    return {
      profile:{
        bio: null,
        following: false,
        image: "",
        username: "",
      },
      email:'',
      password:''
    }
  },
  async created(){
    
    const {username} = this.user
    const {data} = await getUserInfo(username)
    const {profile} = data
    this.profile = profile
    // console.log(data,'-----')
  },
  methods:{
    async update(){
      await updateUser({
        ...this.profile,
        email:this.email,
        password:this.password
      })
    }
  },
  computed:{
    ...mapState(['user']),
  }
}
</script>

<style>

</style>