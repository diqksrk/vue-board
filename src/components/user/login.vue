<template>

<div class="container" style="margin-top:100px">
	<div class="row">
		<div class="col-sm-3"></div>
		<div class="col-sm-6">
			<div class="card shadow">
				<div class="card-body">
					<div class="alert alert-danger" v-if='is_login_fail == true'>
						<h3>로그인 실패</h3>
						<p>아이디 비밀번호를 확인해주세요</p>
					</div>
						<div class="form-group">
							<label for="user_id">아이디</label>
							<input type="text" id="user_id" v-model="user_id" class="form-control"/>
						</div>
						<div class="form-group">
							<label for="user_pw">비밀번호</label>
							<input type="password" id="user_pw" v-model="user_pw" class="form-control"/>
						</div>
						<div class="form-group text-right">
							<button type="button" @click='check_input' class="btn btn-primary">로그인</button>
							<router-link to='/join' class="btn btn-danger">회원가입</router-link>
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
                is_login_fail : false,
                user_id : '',
                user_pw : ''
            }
        },
        methods: {
            check_input : function() {
                // 유효성 검사
                if(this.user_id.length < 4){
                    alert("아이디는 4글자 이상입니다")
                    this.user_id =''
                    $("#user_id").focus()
                    return 
                }
                if(this.user_pw.length < 4){
                    alert("비밀번호는 4글자 이상입니다")
                    this.user_pw=''
                    $("#user_pw").focus()
                    return
                }

                this.$axios.post('api/server/validation_check_user', {userId : this.user_id, userName : this.user_name, userPw : this.user_pw})
                    .then((response) => {
                        console.log(response)
                        if (response.data.result != null) {
                            alert("로그인되었습니다.")

                            this.$store.state.user_login_chk = true
                            this.$store.state.user_id = response.data.result.userId
                            this.$store.state.user_name = response.data.result.userName
                            this.$store.state.user_idx = response.data.result.userIdx

                            //세션스토리지에도 저장한다(새로고침 대비) 이 세션은 웹브라우저에 저장되며 새로고침시에도 남지만 브라우저를 닫으면 날라간다.
                            sessionStorage.user_login_chk = true
                            sessionStorage.user_id = response.data.result.userId
                            sessionStorage.user_name = response.data.result.userName
                            sessionStorage.user_idx = response.data.result.userIdx

                            this.$router.push('/')
                        } else {
                            alert("제대로 된 아이디와 비밀번호를 입력해주세요.")
                        }
                    })
            }
        },
    }
</script>