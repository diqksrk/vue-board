<template>

<div class="container" style="margin-top:100px">
	<div class="row">
		<div class="col-sm-3"></div>
		<div class="col-sm-6">
			<div class="card shadow">
				<div class="card-body">
					<div class="form-group">
						<label for="board_writer_name">작성자</label>
						<input type="text" id="board_writer_name" v-model="server_data.userName" class="form-control"  disabled="disabled"/>
					</div>
					<div class="form-group">
						<label for="board_date">작성날짜</label>
						<input type="text" id="board_date" v-model="server_data.contentDate" class="form-control" disabled="disabled"/>
					</div>
					<div class="form-group">
						<label for="board_subject">제목</label>
						<input type="text" id="board_subject" v-model="server_data.contentSubject" class="form-control"  disabled="disabled"/>
					</div>
					<div class="form-group">
						<label for="board_content">내용</label>
						<textarea id="board_content" v-model="server_data.contentText" class="form-control" rows="10" style="resize:none" disabled="disabled">본문입니다</textarea>
					</div>
					<label for="board_file" style="text-align: left;">첨부 이미지</label><br/>
					<div class="form-group" style="text-align: center;">
						<img :src="server_data.imageUrl" width="50%" />
					</div>
					<div class="form-group">
						<div class="text-right">
							<router-link :to="'/board_main' + '/'+ $route.params.board_idx +'/' + $route.params.page" class="btn btn-primary">목록보기</router-link>
							<!-- <router-link :to="'/board_modify' + '/' + $route.params.board_idx + '/' + $route.params.page + '/' + $route.params.content_idx " v-if='server_data.contentWriterIdx == $store.state.user_idx' class="btn btn-info">수정하기</router-link> -->
							<router-link :to="'/board_delete'+ '/' + $route.params.board_idx + '/' + $route.params.page + '/' + $route.params.content_idx" class="btn btn-danger" v-if='server_data.contentWriterIdx == $store.state.user_idx'>삭제하기</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-sm-3"></div>
	</div>
</div>
</template>

<script>
    export default {
        data : function() {
            return {
                server_data : {}
            }
		},
		created() {
			this.$axios.post('api/server/board/get_content', {boardInfoIdx : this.$route.params.board_idx, contentIdx : this.$route.params.content_idx})
					.then((response) => {
						this.server_data = response.data
					})
		},
    }
</script>