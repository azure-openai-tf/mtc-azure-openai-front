<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    // {
    //     label: 'Home',
    //     items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    // },
    {
        label: 'Managements',
        items: [
            // { label: 'User Manage', icon: 'pi pi-fw pi-id-card', to: '/uikit/usermanagement' },
            // { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },            
            { label: 'Chatting', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
            { label: 'File & Container Management', icon: 'pi pi-fw pi-file', to: '/uikit/fileManagement' },
            { label: 'Index Management', icon: 'pi pi-fw pi-file', to: '/uikit/indexManagement' },
        ]
    },
]);
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
