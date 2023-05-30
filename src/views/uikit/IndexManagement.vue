<script setup>
import { ref, watch, onMounted } from 'vue';
import axios from "axios";
import { API_BASE_URL } from '../../config/api-config.js'
import commonMsg from '../../lang/messages.js';

import { useToast } from 'primevue/usetoast';

const selectedFile = ref(null);
const container = ref('');
const toast = useToast();

const dropdownIndexerItems = ref([]);
const selectedIndexerOption = ref('');
const indexerStatusResultMessage  = ref('');
const indexerRunResultMessage  = ref('');


onMounted(async () => {
    getIndexerList();
})


watch(selectedIndexerOption, () => {
   indexerStatusResultMessage.value =''
   indexerRunResultMessage.value =''
});

const getIndexerList = async (e) => {

    try {
        const response = await axios.get(API_BASE_URL + "/indexers");

        dropdownIndexerItems.value = response.data.map((option) => ({        
            indexer_name: option.indexer_name,
            target_index_name: option.target_index_name
        }));

    } catch (error) {
        toast.add({ severity: 'error', summary: 'Fail', detail: '[CODE:I001]' + commonMsg.errors.common_msg , life: 5000 });
        
    } 

}

const getIndexerStatus = async (e) => {
    
    try {
        
        if(selectedIndexerOption.value.indexer_name == null || selectedIndexerOption.value.indexer_name == undefined || selectedIndexerOption.value.indexer_name.trim() == ''){
            
            toast.add({ severity: 'error', summary: 'Error', detail: '[CODE:I002]' + commonMsg.errors.indexerIsNotSelected , life: 3000 });                  
            return;

        }else{       
            let url = API_BASE_URL + "/indexers/" + selectedIndexerOption.value.indexer_name + "/status";
            
            const response = await axios.get(url, {
                params: {
                },
            });        
            
            indexerStatusResultMessage.value = response.data.status;
                
        }
        
    } catch (error) {
        console.log("error : " , error)
        toast.add({ severity: 'error', summary: 'Fail', detail: '[CODE:I003]' + commonMsg.errors.common_msg , life: 5000 });  
    }

}
 
 
const runIndexer = async (e) => {

try {
        
        if(selectedIndexerOption.value.indexer_name == null || selectedIndexerOption.value.indexer_name == undefined || selectedIndexerOption.value.indexer_name.trim() == ''){
            
            toast.add({ severity: 'error', summary: 'Error', detail: '[CODE:I004]' + commonMsg.errors.indexerIsNotSelected , life: 3000 });                  
            return;

        }else{       
                let url = API_BASE_URL + "/indexers/" + selectedIndexerOption.value.indexer_name + "/run";
                
                const response = await axios.post(url, {
                    params: {
                    },
                });

                indexerRunResultMessage.value = response.status;
                
        }
        
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Fail', detail: '[CODE:I005]' + commonMsg.errors.common_msg , life: 5000 });  
    }

}
 

</script>


<template>
    <div class="center-container">   
        <Toast />           
        <div class="card p-fluid" >
            
            <h3>Cognitive Search</h3> 

            <h6>인덱서 목록</h6> 
            <div class="field">
                <Dropdown id="state" v-model="selectedIndexerOption" :options="dropdownIndexerItems" optionLabel="indexer_name" placeholder="Select One"></Dropdown>
            </div>
            <div class="field">
                <Button label="인덱서 상태조회" class="p-button-secondary mr-3 mb-3" @click="getIndexerStatus()"/>                
            </div>

            <div class="field">
                <label>인덱서 상태 : </label>
                {{indexerStatusResultMessage}}                
            </div>

            <div class="field">
                <Button label="인덱서 실행" class="p-button-success mr-3 mb-3" @click="runIndexer()"/>                
            </div>
            <div class="field">
                <label>인덱서 실행 결과 : </label>
                {{indexerRunResultMessage}}
                
            </div>
        </div>
    </div>  
</template>
