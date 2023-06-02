// messages.js
export default {
    errors: {
      common_msg: "문제가 발생하였습니다. 잠시 후에 다시 시도하세요. 문제가 지속될 경우 관리자에게 문의하세요.",
      user_msg_is_empty: "메시지를 입력하세요.",
      

      /*
        FileManagement.vue
      */     
      //파일 업로드
      target_container_is_not_selected: "업로드할 폴더를 선택하세요.",
      upload_success: "업로드 성공.",

      //컨테이너 관리
      containerNameIsNotSelected: "생성할 폴더의 이름을 입력하세요.",
      containerCreateFail: "폴더 생성에 실패하였습니다.",

      containerDeleteWarning: "폴더 안에 들어있는 모든 파일이 삭제되며 복구 할 수 없습니다. 폴더를 삭제하시겠습니까?",

      containerIsNotSeleted: "삭제할 폴더를 선택하세요.",
      containerDeleteFail: "폴더 삭제를 실패하였습니다.",


      /*
        IndexManagement.vue
      */     

      indexerIsNotSelected: "인덱서를 선택하세요.",
    
   },
   success:{
      //컨테이너 관리
      containerCreateSuccess: "폴더가 생성 되었습니다.",
      containerDeleteSuccess: "폴더가 삭제 되었습니다.",
   },
  };
  