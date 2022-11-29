<template>
  <div id="app">
    <TopMenu></TopMenu>
    <router-view></router-view>
    <!-- <bottom-info></bottom-info> -->
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import Main from './components/main/Main.vue'
import BoardMain from './components/board/BoardMain.vue'
import TopMenu from './components/common/TopMenu.vue'
// import BottomInfo from './components/common/BottomInfo.vue'
import BoardRead from './components/board/board_read.vue'
import BoardModify from './components/board/board_modify.vue'
import BoardWrite from './components/board/board_write.vue'
import BoardLogin from './components/user/login.vue'
import BoardJoin from './components/user/join.vue'
import UserModify from './components/user/user_modify.vue'
import axios from 'axios';
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
Vue.use(VueRouter)

var store = new Vuex.Store({
  state : {
    user_login_chk : false,
    user_id : '',
    user_name : '',
    user_idx : 0
  }
})

const router = new VueRouter({
    routes : [
        {
            path : '/',
            component : Main
        },
        {
            path : '/board_main/:board_idx/:page',
            component : BoardMain
        },
        {
            path : '/board_read/:board_idx/:page/:content_idx',
            component : BoardRead
        },
        {
            path : '/board_modify/:board_idx/:page/:content_idx',
            component : BoardModify
        },
        {
            path : '/board_delete/:board_idx/:page/:content_idx',
            beforeEnter(to,from,next){
              axios.post('api/server/delete_content', {contentIdx : from.params.content_idx})
                .then((response) => {
                  console.log(response)
                  alert("삭제되었습니다")
                  next('/board_main/' + to.params.board_idx + '/' + to.params.page)
                })
            }
        },
        {
            path : '/board_write/:board_idx',
            component : BoardWrite
        },
        {
            path : '/board_login',
            component : BoardLogin
        },
        {
            path : '/join',
            component : BoardJoin
        },
        {
            path : '/user_modify',
            component : UserModify
        },
        {
            path : '/logout',
            beforeEnter(to,from,next){
              alert('로그아웃되었습니다.')
              store.state.user_login_chk = false
              store.state.user_id = ''
              store.state.user_name = ''
              store.state.user_idx = 0

              sessionStorage.clear()
              next('/')
            }
        },
    ],
    scrollBehavior() {
      return {
        x:0,
        y:0
      }
    }
})

export default {
  name: 'app',
  components: {
    TopMenu,
    // BottomInfo
  },
  router : router,
  store : store ,
  beforeCreate : function() {
    if (sessionStorage.user_login_chk != undefined) {
      if (sessionStorage.user_login_chk == 'true'){
        this.$store.state.user_login_chk = true
      }
      this.$store.state.user_login_id = sessionStorage.user_id
      this.$store.state.user_login_name = sessionStorage.user_name
      this.$store.state.user_idx = parseInt(sessionStorage.user_idx)
    }
  }
}

</script>
