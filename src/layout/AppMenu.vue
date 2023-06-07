<script setup>
import { ref, computed } from "vue";  
import AppMenuItem from './AppMenuItem.vue';

function getUserRole() {  
  return localStorage.getItem("userRole");  
}  
  
const model = computed(() => {  
    const role = getUserRole();  
    const baseMenu = [  
        {  
            label: "Chat",  
            items: [  
                {  
                    label: "Chatting",  
                    icon: "pi pi-fw pi-comment",  
                    to: "/uikit/message",  
                },  
            ],  
        },  
    ];  

    if (role === "admin") {  
        baseMenu.push({  
            label: "Managements",  
            items: [  
                {  
                    label: "File & Container Management",  
                    icon: "pi pi-fw pi-file",  
                    to: "/uikit/fileManagement",  
                },  
                {  
                    label: "Index Management",  
                    icon: "pi pi-fw pi-file",  
                    to: "/uikit/indexManagement",  
                },  
            ],  
        });  
    }  

  return baseMenu;  
});   
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
