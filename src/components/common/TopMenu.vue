<template>
<!-- 상단 메뉴 부분 -->
<nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top shadow-lg">
	<router-link to='/' class="navbar-brand">KangMinJun</router-link>
	<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMenu">
		<span class="navbar-toggler-icon"></span>        
	</button>
	<div class="collapse navbar-collapse" id="navMenu">
		<ul class="navbar-nav">
			<li class="nav-item" v-for='obj in server_data' :key="obj.id" >
				<router-link :to="'/board_main/'+obj.boardInfoIdx + '/1'" class="nav-link">{{obj.boardInfoName}}</router-link>
			</li>
		</ul>
		
		<ul class="navbar-nav ml-auto" v-if='$store.state.user_login_chk == false'>
			<li class="nav-item">
				
				<router-link to='/board_login' class="nav-link">로그인</router-link>

				<!-- <router-link to='/login' class="nav-link">로그인</router-link> -->
			</li>
			<li class="nav-item">
				<router-link to='/join' class="nav-link">회원가입</router-link>
			</li>
		</ul>
		<ul class="navbar-nav ml-auto" v-else>

			<li class="nav-item">
				<router-link to='/user_modify' class="nav-link">정보관리</router-link>
			</li>
			<li class="nav-item">
				<router-link to='/logout' class="nav-link">로그아웃</router-link>
			</li>


		</ul>
	</div>
</nav>
</template>

<script type="text/javascript">
//import axios from 'axios'

export default {
	name : 'TopMenu',
	data : function() {
		return { 
			server_data : []
		}
	},
	created() {
		this.$axios.get('api/server/get_board_info')
            .then((response) => {
                this.server_data = response.data
            })
	},	
}

</script>