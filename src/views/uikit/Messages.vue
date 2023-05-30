<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { API_BASE_URL } from '../../config/api-config.js'
import commonMsg from '../../lang/messages.js';

import { useToast } from 'primevue/usetoast';
import Dropdown from 'primevue/dropdown';

const inputMessage = ref('');
const messages = ref([]);

const toast = useToast();
const message = ref([]);
const count = ref(0);


const dropdownItems = ref([]);
const selectedIndexOption = ref('');

onMounted(async () => {
    try {
        const response = await axios.get(API_BASE_URL + "/indexes");
        
        dropdownItems.value = response.data.map((option) => ({
        name: option,
        code: option,
        }));

        if (dropdownItems.value.length > 0) {
            selectedIndexOption.value = dropdownItems.value[0];  
        }


    } catch (error) {
        toast.add({ severity: 'error', summary: 'Fail', detail: '[CODE:M001]' + commonMsg.errors.common_msg , life: 5000 });        
    }
})

const sendMessage = async () => {

    const userInputMsg = inputMessage.value;
    inputMessage.value = '';
    
    try {

        if(selectedIndexOption.value == null || selectedIndexOption.value == undefined || selectedIndexOption.value == ''){
            toast.add({ severity: 'error', summary: 'Error', detail: '[CODE:M001]' + commonMsg.errors.common_msg , life: 3000 });                  
            return;
        }

        if(userInputMsg == null || userInputMsg == undefined || userInputMsg  == '' || userInputMsg.trim() === ''){                        
            toast.add({ severity: 'error', summary: 'Error', detail: '[CODE:M002]' + commonMsg.errors.user_msg_is_empty , life: 3000 });
            return;
        }
 
        // const timestamp = new Date().toLocaleTimeString();
        messages.value.push({
            text: userInputMsg,
            // timestamp,
            class: 'client',
        });

        const response = await axios.get(API_BASE_URL + "/search", {  
            params: {  
                query: userInputMsg,  
                index_name: selectedIndexOption.value.name['index_name'],  
            },  
        });

        let responseMsg = response.data.answer;
        let file = response.data.reference_file;

        // if( file != ''){     
        //     file = file.replace(/\n/g, ',');            
        //     responseMsg = responseMsg + " (참고자료: " + file + ")";
        // }

        messages.value.push({
            text: responseMsg,
            // file :  response.data.reference_file,
            // timestamp,
            class: 'server',
        });
      
    } catch (error) {               
        toast.add({ severity: 'error', summary: 'Fail', detail: '[CODE:M003]' + commonMsg.errors.common_msg , life: 5000 });        
    }  
}

</script>

<template>
  <div class="grid">
    <div class="col-12">
        <h6>
          인덱스 :  
            <Dropdown id="state" v-model="selectedIndexOption" :options="dropdownItems" optionLabel="name" placeholder="Select One"></Dropdown>
        </h6>
        
        <div class="card">
            <div class="container">  
                <div class="chat-container">  
                    <div class="messages" id="messages">
                        <div  
                            v-for="(message, index) in messages"  
                            :key="index"  
                            :class="message.class"  
                        >  
                            <div class="">{{ message.text }}</div>  
                            <!-- <div class="">파일: {{ message.file }}</div>   -->
                        </div>

                    </div>
                    
                    <Toast />
                    
                    <transition-group name="p-message" >
                        <Message v-for="msg of message" :severity="msg.severity" :key="msg.content">{{ msg.content }}</Message>
                    </transition-group>
    
                    <div class="input-container">
                        <input
                            type="text"
                            id="messageText"
                            v-model="inputMessage"
                            @keyup.enter="sendMessage"
                            placeholder="Type your message here..."
                            
                        />
                    </div>   

                </div>
                
        </div>  
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {  
  /* max-width: 90%;   */
  margin: 0 auto; 
  height: 100vh;
  max-height: 70vh;
  
  /* height: calc(70vh - 50px);  */
}  
.chat-container {  
  background-color: #ffffff;  
  border-radius: 10px;  
  display: flex;  
  flex-direction: column;  
  height: calc(100%);  
}  

input {
  flex-grow: 1;
  border: 1px solid #F5F7FB;
  background-color: #F5F7FB;
  color: #505052;
  font-size: .9em;
  border-radius: 25px;
  padding: 12px;
  padding-right: 50px;
  outline: none;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.messages {  
  flex-grow: 1;  
  overflow-y: auto;  
  padding: 10px;  
  display: flex;  
  flex-direction: column; 
}  


.client{  
  background-color: #4E426D;  
  padding: 10px;  
  margin: 10px; 
  max-width: fit-content;  
  border-radius: 10px;  
  color: #FEF6FE;  
  font-size: 0.9em;  
  align-self: flex-end;
}  
  
.server {   
  background-color: #F5F7FB;  
  padding: 10px;  
  margin: 10px;  
  max-width: fit-content;   
  border-radius: 10px;  
  color: #505052;  
  font-size: 0.9em;  
  align-self: flex-start;
}  
    
</style>
