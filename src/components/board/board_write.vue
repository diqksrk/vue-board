<template>

<div class="container" style="margin-top:100px">
	<div class="row">
		<div class="col-sm-3"></div>
		<div class="col-sm-6">
			<div class="card shadow">
				<div class="card-body">
					<div class="form-group">
						<label for="board_subject">제목</label>
						<input type="text" id="board_subject" v-model="board_subject" class="form-control"/>
					</div>
					<div class="form-group">
						<label for="board_content">내용</label>
						<textarea id="board_content" v-model="board_content" class="form-control" rows="10" style="resize:none"></textarea>
					</div>
					<div class="form-group">
						<label for="board_file">첨부 이미지</label>
						<input type="file" id="board_file" name="board_file" class="form-control" accept="image/*"/>
					</div>
					<div class="form-group">
						<div class="text-right">
							<button type="button" @click="check_input" class="btn btn-primary">작성하기</button>
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
				board_subject : '',
				board_content : ''
			}
		},
		methods: {
			check_input : function() {
				if(this.board_subject.length == 0){
					alert("제목을 입력해주세요")
					$("#board_subject").focus()
					return
				}
				if(this.board_content.length == 0){
					alert("내용을 입력해주세요")
					$("#board_content").focus()
					return
				}

				const FileElement = document.querySelector('#board_file');
				const formData = new FormData();
				
				formData.append("boardWriterIdx", parseInt(this.$store.state.user_idx));
				formData.append("contentBoardIdx", parseInt(this.$route.params.board_idx));
				formData.append("boardSubject", this.board_subject);
				formData.append("boardContent", this.board_content);
				
				for(let i = 0; i < FileElement.files.length; i++){
					formData.append("files", FileElement.files[i]);
				}

				// this.$axios.post('api/server/register_board_content', {boardWriterIdx : parseInt(this.$store.state.user_idx),contentBoardIdx : parseInt(this.$route.params.board_idx) ,boardSubject  : this.board_subject,boardContent : this.board_content, })
				this.$axios.post('api/server/register_board_content', formData)
					.then((response) => {
						this.server_data = response.data
						this.$router.push('/board_read/' + formData.get("contentBoardIdx") + '/1/' + response.data)
					})

				alert('저장되었습니다')
				this.$router.push('/board_read')
			}
		},
	}
</script>
