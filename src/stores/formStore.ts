import { defineStore } from 'pinia';
import { ref } from 'vue'

export const useFormStore = defineStore('formStore', () =>{
    const cholesterol = ref('');
    const LDL = ref('');
    const HDL = ref('');
    const triglycerides = ref('');


    const updateFormData = (data:{
        cholesterol: string;
        LDL: string;
        HDL: string;
        triglycerides: string;
    }) => {
        cholesterol.value = data.cholesterol;
        LDL.value = data.LDL;
        HDL.value = data.HDL;
        triglycerides.value = data.triglycerides;
    };

    return {cholesterol, LDL, HDL, triglycerides, updateFormData};
});