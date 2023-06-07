<script setup>  
import { ref, onMounted } from "vue";  
import axios from "axios";  
import { API_BASE_URL } from "../../../config/api-config.js";  
import commonMsg from "../../../lang/messages.js";  
import { useRouter } from "vue-router";  
import { useToast } from "primevue/usetoast";  

const password = ref("");  
const isLoginError = ref(false);
  
const toast = useToast();  
const router = useRouter();

onMounted(async () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
})


const login = async (e) => {

    try {
        
        const response = await axios.post(API_BASE_URL + "/login",{
            "id" :  logid.value, 
            "password" : password.value
        });

        if (response.status >= 200 && response.status < 300) {            
            localStorage.setItem("isLoggedIn", true);            
            localStorage.setItem("userRole", logid.value=='admin'? 'admin' : 'user');
            isLoginError.value = false;

            success();            
        }else{            
            
            isLoginError.value = true;
            password.value = '';
        }


    } catch (error) {        
        isLoginError.value = true;
        password.value = '';
    } 

}

const success = async (e) => { 
    router.push("/uikit/message");  
}

const hideError = () => {
  isLoginError.value = false;
}

</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 20px">
                    <div class="text-center mb-5">
                        <div class="text-900 text-3xl font-medium mb-3" style="font-family: Noto Sans KR, sans-serif;">MTC Azure OpenAI</div>
                        <span class="text-600 font-medium"></span>
                    </div>

                    <div>
                        <label for="logid" class="block text-900 font-medium mb-2">ID</label>
                        <InputText id="logid" type="text" placeholder="" class="w-full md:w-30rem mb-5" style="padding: 1rem" v-model="email" />
                        <label for="password" class="block text-900 font-medium mb-2">Password</label>                        
                        <Password id="password" v-model.trim="password" placeholder=""  :feedback="false" :toggleMask="true" class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem" @keydown="hideError" @keyup.enter="login"></Password>  

                        <div class="mb-2">    
                            <small id="loginDescriptionId" class="p-error" v-show="isLoginError">아이디 또는 비밀번호가 일치하지 않습니다.</small>
                        </div>
                        <Button label="Sign In" class="w-full p-3" @click="login()"/>
                    </div>
                </div>
            </div>
        </div>
    </div> 
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}

* {  
   font-family: "Noto Sans KR", sans-serif;  
}  

</style>
