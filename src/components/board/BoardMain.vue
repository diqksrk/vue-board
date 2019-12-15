<template>
<!-- 게시글 리스트 -->
<div class="container" style="margin-top:100px">
	<div class="card shadow">
		<div class="card-body">
			<h4 class="card-title">{{server_data.boardInfoName}}</h4>
			<table class="table table-hover" id='board_list'>
				<thead>
					<tr>
						<th class="text-center d-none d-md-table-cell">글번호</th>
						<th class="w-50">제목</th>
						<th class="text-center d-none d-md-table-cell">작성자</th>
						<th class="text-center d-none d-md-table-cell">작성날짜</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="obj in server_data.boardContentForLists" :key="obj.id" >
						<td class="text-center d-none d-md-table-cell">{{obj.contentIdx}}</td>
						<td @click="go_board_read(obj.contentIdx)">{{obj.contentSubject}}</td>
						<td class="text-center d-none d-md-table-cell">{{obj.userName}}</td>
						<td class="text-center d-none d-md-table-cell">{{obj.contentDate}}</td>
					</tr>
				</tbody>
			</table>
			
			<div class="d-none d-md-block">
				<ul class="pagination justify-content-center">
					<li class="page-item">
						<router-link :to="'/board_main/' + $route.params.board_idx +'/' + (parseInt(server_data.pageDetail.startPage)-1).toString()" v-if='server_data.pageDetail.prev == true' class="page-link">이전</router-link>
					</li>
					<li class="page-item" v-for='a1 in server_data.pageDetail.endPage' :key="a1.id">
						<router-link :to="'/board_main/'+  $route.params.board_idx +'/' +a1" v-if='a1 >= server_data.pageDetail.startPage' class="page-link">{{a1}}</router-link>
					</li>
					<li class="page-item">
						<router-link :to="'/board_main/' + $route.params.board_idx +'/' + (parseInt(server_data.pageDetail.endPage)+1).toString()" v-if='server_data.pageDetail.next == true' class="page-link">다음</router-link>
					</li>
				</ul>
			</div>
			
			<div class="text-right" v-if='$store.state.user_login_chk == true'>
				<router-link :to="'/board_write/' + $route.params.board_idx" class="btn btn-primary">글쓰기</router-link>
			</div>
		</div>
	</div>
</div>
</template>

<style>
	#board_list > tbody > tr {
		cursor: pointer;
	}
</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
	export default {
		name : 'BoardMain',
		data : function(){
			return {
				temp_list : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
				server_data : {}
			}
		},
		methods: {
			go_board_read : function(content_idx) {
				this.$router.push('/board_read/' + this.$route.params.board_idx + '/' + this.$route.params.page + '/' + content_idx )
			},
			get_board_data : function() {
				this.$axios.post('api/server/get_board_list', {boardInfoIdx : this.$route.params.board_idx, page : this.$route.params.page})
					.then((response) => {
						console.log(response)
						this.server_data = response.data
					})
			},
		},
		watch : {
			'$route' (to, from) {
				this.get_board_data()
			}
		},
		created() {
			this.get_board_data()
		}
	}
</script>