<template>

<div class="col-lg-6" style="margin-top:20px">
    <div class="card shadow">
        <div class="card-body">
            <h4 class="card-title">{{server_data.boardInfoName}}</h4>
            <table class="table table-hover" id='board_list'>
                <thead>
                    <tr>
                        <th class="text-center w-25">글번호</th>
                        <th>제목</th>
                        <th class="text-center w-25 d-none d-xl-table-cell">작성날짜</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='a1 in server_data.boardContentForLists' :key="a1.id">
                        <td class="text-center">{{a1.contentIdx}}</td>
                        <td @click="go_board_read(a1.contentIdx)">{{a1.contentSubject}}</td>
                        <td class="text-center d-none d-xl-table-cell">{{a1.contentDate}}</td>
                    </tr>
                </tbody>
            </table>
            
            <router-link :to="'/board_main/' + board_idx + '/1'" class="btn btn-primary">더보기</router-link>
        </div>
    </div>
</div>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script>
    export default {
        name : 'main_board_list',
        data : function() {
            return {
                temp_list : [1,2,3,4,5],
                server_data : {}
            }
        },
        props : ['board_idx'],
        methods: {
            go_board_read : function(content_idx) {
                //this.$router.push('/board_read')
                this.$router.push('/board_read/' + this.board_idx + '/1/' + content_idx)
            }
        },
        created () {
            this.$axios.get('api/server/get_top_board_list/' + this.board_idx)
					.then((response) => {
						this.server_data = response.data
					})
        }
    }
</script>

<style>
	#board_list > tbody > tr {
		cursor: pointer;
	}
</style>