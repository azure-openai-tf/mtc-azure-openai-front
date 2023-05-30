import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                /* 대시보드 개발 완료 시 추가 
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                */
                {
                    path: '/',
                    name: 'message2',
                    component: () => import('@/views/uikit/Messages.vue')
                },
                {
                    path: '/uikit/message',
                    name: 'message',
                    component: () => import('@/views/uikit/Messages.vue')
                },
                {
                    path: '/uikit/fileManagement',
                    name: 'fileManagement',
                    component: () => import('@/views/uikit/FileManagement.vue')
                },
                {
                    path: '/uikit/indexManagement',
                    name: 'indexManagement',
                    component: () => import('@/views/uikit/IndexManagement.vue')
                },
                {
                    path: '/uikit/userManagement',
                    name: 'userManagement',
                    component: () => import('@/views/uikit/UserManagement.vue')
                },
                {
                    path: '/uikit/list',
                    name: 'list',
                    component: () => import('@/views/uikit/List.vue')
                },
            ]
        },        
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
