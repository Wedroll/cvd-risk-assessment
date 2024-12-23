<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Ocena ryzyka CVD</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Ocena ryzyka CVD</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="indicators-form">
          <h2 class="form-title">Dane do wypełnenia</h2>
          <div class="form-row">
            <ion-select 
              placeholder="Płeć"
              class="form-input form-select">
              <ion-select-option value="M">Mężczyzna</ion-select-option>
              <ion-select-option value="K">Kobieta</ion-select-option>
            </ion-select>

            <ion-select 
              v-model = "measurementSystem"
              placeholder="Jednostki miary"
              class="form-input form-select">
              <ion-select-option value="mg">mg/dl</ion-select-option>
              <ion-select-option value="mm">mmol/l</ion-select-option>
            </ion-select>
          </div>
          <ion-input 
          v-model="formStore.cholesterol"
          placeholder="Cholesterol (mg/dl)"
          clear-input
          class="form-input"
          ></ion-input>

          <ion-input 
          v-model="formStore.LDL"
          placeholder="LDL (mg/dl)"
          clear-input
          class="form-input"
          ></ion-input>

          <ion-input 
          v-model="formStore.HDL"
          placeholder="HDL (mg/dl)"
          clear-input
          class="form-input"
          ></ion-input>

          <ion-input 
          v-model="formStore.triglycerides"
          placeholder="Trójgliceryd (mg/dl)"
          clear-input
          class="form-input"
          ></ion-input>
          <ion-button @click="submitForm" class="form-button">Wyślij</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonSelect, IonButton, IonInput, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useFormStore } from '@/stores/formStore';
import { useRouter } from 'vue-router';
import { ref, watch } from 'vue';

const router = useRouter();
const formStore = useFormStore();
const measurementSystem = ref('mg');

function convertValues(tagrgetSystem : string){

  const conversionFactors = {
    cholesterol : 38.64,
    LDL : 38.64,
    HDL: 38.64,
    triglycerides: 88.62,
  };
  
  if(tagrgetSystem === 'mm'){
    formStore.cholesterol = (parseFloat(formStore.cholesterol) / conversionFactors.cholesterol).toFixed(2);
    formStore.LDL = (parseFloat(formStore.LDL) / conversionFactors.LDL).toFixed(2);
    formStore.HDL = (parseFloat(formStore.HDL) / conversionFactors.HDL).toFixed(2);
    formStore.triglycerides = (parseFloat(formStore.triglycerides) / conversionFactors.triglycerides).toFixed(2);
  }else{
    formStore.cholesterol = (parseFloat(formStore.cholesterol) * conversionFactors.cholesterol).toFixed(0);
    formStore.LDL = (parseFloat(formStore.LDL) * conversionFactors.LDL).toFixed(0);
    formStore.HDL = (parseFloat(formStore.HDL) * conversionFactors.HDL).toFixed(0);
    formStore.triglycerides = (parseFloat(formStore.triglycerides) * conversionFactors.triglycerides).toFixed(0);
  }

}

watch (measurementSystem, (newSystem, oladSystem) => {
  if(newSystem !== oladSystem){
    convertValues(newSystem);
  }
});

function submitForm() {
  if (
      formStore.cholesterol.trim() !== '' &&
      formStore.LDL.trim() !== '' &&
      formStore.HDL.trim() !== '' &&
      formStore.triglycerides.trim() !== '') {
    
    formStore.updateFormData({
      cholesterol: formStore.cholesterol,
      LDL: formStore.LDL,
      HDL: formStore.HDL,
      triglycerides: formStore.triglycerides,
    });
    router.push({
    path: '/tabs/tab2',
    query: { measurementSystem: measurementSystem.value },
  });
  } else {
    alert('Wypełnij wszystkie pola.');
  }
}

</script>

<style scoped>

.form-row {
  display: flex;
  gap: 15px; 
  margin-bottom: 15px; 
}

.form-row .form-select {
  flex: 1; 
  min-width: 0;
}

ion-title{
  text-align: center;
}

.content-background {
  background: #222; 
  color: #fff; 
}

.indicators-form {
  padding: 16px;
  max-width: 500px;
  margin: 50px auto 0; 
  background: #333; 
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); 
  color: #fff; 
}

.form-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #fff;
}

.form-input{
  margin-bottom: 15px;
  border: 1px solid #444; 
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  width: 100%;
  background: #444;
  color: #fff;
}

.form-input:focus{
  border-color: #3a86ff; 
  box-shadow: 0 0 5px rgba(58, 134, 255, 0.5);
}

.form-button {
  width: 100%;
  margin-top: 20px;
  background: #3a86ff;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background: #2b6fd9; 
}

</style>
