import { createRouter, createWebHashHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';

function isLoggedIn() {  
    return localStorage.getItem("isLoggedIn") === "true";  
}  
    
function getUserRole() {      
    return localStorage.getItem("userRole");  
}  

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [ 
                {
                    path: '',
                    name: 'login',
                    component: () => import('@/views/pages/auth/Login.vue')
                },
                {
                    path: '',
                    name: 'access',
                    component: () => import('@/views/pages/auth/Access.vue')
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
            ]
        },        
    ]
});


router.beforeEach((to, from, next) => {  
    
    if (!isLoggedIn() && to.name !== "login") { 
        next({ name: "login" });      
    } else if (isLoggedIn() && getUserRole() === "user") {      
        if(to.name == "fileManagement"){
            next({ name: "access" });
        }else if(to.name == "indexManagement"){
            next({ name: "access" });
        }else if(to.name == "userManagement"){
            next({ name: "access" });
        }else{
            next();
        }    
    } else if (isLoggedIn() && getUserRole() === "admin") {
        next();
    } else {  
        next();      
    }      
  });  
     
export default router;
