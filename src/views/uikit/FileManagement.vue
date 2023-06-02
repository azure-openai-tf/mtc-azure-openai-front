<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { API_BASE_URL } from '../../config/api-config.js'
import commonMsg from '../../lang/messages.js';

import { useToast } from 'primevue/usetoast';
import { useConfirm } from "primevue/useconfirm";


const selectedFile = ref(null);
const container = ref('');
const confirm = useConfirm();
const toast = useToast();

const dropdownItems = ref([]);
const selectedIndexOption = ref('');
const selectedIndexOption2 = ref('');

onMounted(async () => {
    getContainerList();
})


const getContainerList = async (e) => { 
    
    try {    
        const response = await axios.get(API_BASE_URL + "/containers");
    
        dropdownItems.value = response.data.map((option) => ({
            name: option,
            code: option,
        }));


    } catch (error) {
        toast.add({ severity: 'error', summary: 'Fail', detail: '[CODE:FM99]' + commonMsg.errors.common_msg , life: 5000 });
    }
    
}

const createContainer = async (e) => { 
    
    try{
        if(newContainerName.value == null || newContainerName.value == undefined || newContainerName.value.trim() == ''){
            
            toast.add({ severity: 'error', summary: 'Error', detail: '[CODE:FC01]' + commonMsg.errors.containerNameIsNotSelected , life: 3000 });                  
            return;

        }else{           

            const response = await axios.post(API_BASE_URL + "/containers",{
                "name" :  newContainerName.value, 
            });
            
            if (response.status >= 200 && response.status < 300) {
                toast.add({ severity: 'success', summary: 'Success', detail: newContainerName.value + " " + commonMsg.success.containerCreateSuccess, life: 3000 });
                
                newContainerName.value = '';
                
                getContainerList();                               

            }else{

                toast.add({ severity: 'error', summary: 'Fail', detail: '[CODE:FC02]' + commonMsg.errors.containerCreateFail , life: 3000 });

            }



        }
        
    }catch (error) {       

        toast.add({ severity: 'error', summary: 'Fail', detail: '[CODE:FC99]' + commonMsg.errors.common_msg , life: 5000 });        
    }  
                    
}

const deleteContainer = async (e) => { 

    newContainerName.disabled= true;

    if(selectedIndexOption2.value.name == null || selectedIndexOption2.value.name == undefined || selectedIndexOption2.value.name.trim() == ''){
    
        toast.add({ severity: 'error', summary: 'Error', detail: '[CODE:FD01]' + commonMsg.errors.containerIsNotSeleted , life: 3000 });                  
        return;
    
    }else{
        confirm.require({
            message:  commonMsg.errors.containerDeleteWarning,
            defaultFocus : 'reject',
            header: 'Confirmation',
            acceptClass: 'p-button-text',
            rejectClass: 'p-button-danger',
            icon: 'pi pi-exclamation-triangle',
            
            accept: async () => {

                try{
                    if(selectedIndexOption2.value.name == null || selectedIndexOption2.value.name == undefined || selectedIndexOption2.value.name.trim() == ''){
                        
                        toast.add({ severity: 'error', summary: 'Error', detail: '[CODE:FD01]' + commonMsg.errors.containerIsNotSeleted , life: 3000 });                  
                        return;

                    }else{

                        const response = await axios.delete(API_BASE_URL + "/containers" + "/" + selectedIndexOption2.value.name);

                        if (response.status >= 200 && response.status < 300) {     

                            toast.add({ severity: 'success', summary: 'Success', detail: selectedIndexOption2.value.name + " " + commonMsg.success.containerDeleteSuccess, life: 3000 });                        
                            getContainerList();
                      
                         }else{

                            toast.add({ severity: 'error', summary: 'Fail', detail: '[CODE:FD02]' + commonMsg.errors.containerDeleteFail , life: 3000 });
                        
                        }

                    }
                    
                }catch (error) {                           
                    toast.add({ severity: 'error', summary: 'Fail', detail: '[CODE:FD99]' + commonMsg.errors.common_msg , life: 5000 });        
                }
                finally{
                    newContainerName.disabled= false;
                }        
            },
            reject: async() => {
                newContainerName.disabled= false;
            }        
        });
    }
}

const onUpload = async (e) => {

    selectedFile.value = e.files;

    if(selectedIndexOption.value.name == null || selectedIndexOption.value.name == undefined || selectedIndexOption.value.name.trim() == ''){
        toast.add({ severity: 'error', summary: 'Error', detail: '[CODE:FU01]' + commonMsg.errors.target_container_is_not_selected , life: 3000 });                  
        return;
    }


    const formData = new FormData();
    for (let i = 0; i < selectedFile.value.length; i++) {
        formData.append("file", selectedFile.value[i]);
    }

    try {         
        const response = await axios.post(API_BASE_URL + "/containers" +"/" + selectedIndexOption.value.name  + "/blobs", formData, {     
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        
        toast.add({ severity: 'info', summary: 'Success', detail: commonMsg.errors.upload_success , life: 3000 });
    
    } catch (error) {
        toast.add({ severity: 'error', summary: 'Error', detail: '[CODE:FU99]' + commonMsg.errors.common_msg , life: 3000 });
    }
};

</script>


<template>
    <div class="center-container">   
        <Toast />           
        <div class="card p-fluid" >
            
            <h3>파일첨부 </h3>            
            <h6>컨테이너 목록</h6> 
            <div class="field">
                <Dropdown id="state" v-model="selectedIndexOption" :options="dropdownItems" optionLabel="name" placeholder="Select One"></Dropdown>
            </div>
            <div class="field">
                <FileUpload name="demo[]" @uploader="onUpload" :multiple="true" accept="pdf/*" :maxFileSize="1000000" customUpload />
            </div>
           
        </div>
 
        <div class="card p-fluid">            
            <h3>컨테이너 관리 </h3>  
                <h6>컨테이너 생성</h6>
                <div class="field">
                    <InputText id="newContainerName" type="text"></InputText>
                </div>
                <div class="field">
                    <Button label="생성" class="p-button-success mr-3 mb-3" @click="createContainer()"/>                
                </div>
                
                <h6>컨테이너 삭제</h6>                
                <div class="field">
                    <Dropdown id="state" v-model="selectedIndexOption2" :options="dropdownItems" optionLabel="name" placeholder="Select One"></Dropdown>
                    <ConfirmDialog></ConfirmDialog>
                </div>
                
                <div class="field">
                    <Button label="삭제" class="p-button-danger mr-2 mb-2" @click="deleteContainer()"/>
                </div>
         </div>
    </div>  
</template>
