<script setup></script>

<template>
    <router-view />
</template>

<style scoped>
/* 나중을 위해 주석처리
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap');
*/

@font-face {
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    src: local('Noto Sans KR Regular'), local('NotoSansKR-Regular'), url(assets/fonts/NotoSans-Regular.woff2) format('woff2');
}

* {  
   font-family: "Noto Sans KR", sans-serif;  
}  

</style>
