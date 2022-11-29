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
						<input type="text" id="board_date" v-model="server_data.contentDate" class="form-control"  disabled="disabled"/>
					</div>
					<div class="form-group">
						<label for="board_subject">제목</label>
						<input type="text" id="board_subject" v-model="server_data.contentSubject" class="form-control" />
					</div>
					<div class="form-group">
						<label for="board_content">내용</label>
						<textarea id="board_content" v-model="server_data.contentText" class="form-control" rows="10" style="resize:none"></textarea>
					</div>
					<div class="form-group">
						<label for="board_file" >첨부 이미지</label>
						<img :src="server_data.imageUrl" width="100%"/>	
						<input type="file" name="board_file" id="board_file" class="form-control" accept="image/*"/>					
					</div>
					<div class="form-group">
						<div class="text-right">
							<button type="button" @click="check_input" class="btn btn-primary">수정완료</button>
							<router-link to='/board_read' class="btn btn-info">취소</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-sm-3"></div>
	</div>
</div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
    export default {
        data : function() {
            return {
                server_data : {}
            }
        },
        methods: {
            check_input : function() {
                if(this.server_data.contentSubject.length == 0){
                    alert("제목을 입력해주세요")
                    $("#board_subject").focus()
                    return
                }
                if(this.server_data.contentText.length == 0){
                    alert("내용을 입력해주세요")
                    $("#board_content").focus()
                    return
				}
                
				this.$axios.post('api/server/modify_board_content', {contentSubject : this.server_data.contentSubject
																	,contentText    : this.server_data.contentText 
																	,contentIdx     : this.server_data.contentIdx})
					.then((response) => {
						console.log(response)
						if (response.data == "success") {
							alert('수정되었습니다')
							this.$router.push('/board_read/' + this.$route.params.board_idx + '/' +this.$route.params.page + '/' + this.$route.params.content_idx)
						}
					})	
			}
		},
		
		created() {
			this.$axios.post('api/server/board/get_content', {contentIdx : this.$route.params.contentIdx})
					.then((response) => {
						console.log("good")
						console.log(response.data)
						this.server_data = response.data
					})
		}


    }
</script>

