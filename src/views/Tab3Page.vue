<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Dodatkowe Wskaźniki</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Dodatkowe Wskaźniki</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="centered-container">
        <div class="tab3-indicators">
          <h2 class="tab3-indicators-title">Dodatkowe Wskaźniki</h2>
          <p class="tab3-cholesterol" :class = "triglyceridesColor">
            <span class="label">Trójglicerydy/HDL:</span> {{ newTriglycerides }} mg/dl
          </p>
          <p class="tab3-LDL" :class = "cholesterolColor">
            <span class="label">Cholesterol resztkowy:</span> {{ newCholesterol }} mg/dl
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useFormStore } from '@/stores/formStore';
import { computed } from 'vue';

const formStore = useFormStore();

const newTriglycerides = computed(() => parseInt(formStore.triglycerides) / parseInt(formStore.HDL));
const newCholesterol = computed(() => parseInt(formStore.cholesterol) - parseInt(formStore.LDL) - parseInt(formStore.HDL));

const triglyceridesColor = computed(() =>{
  const value = newTriglycerides.value;
  if(value >= 2) return 'red';
  if(value >= 1) return 'orange';
  return 'green';
});

const cholesterolColor = computed(() => {
  const value = newCholesterol.value;
  if (value >= 25) return 'red';
  if (value >= 18) return 'orange';
  return 'green'; 
});

</script>

<style scoped>
ion-title{
  text-align: center;
}

.centered-container {
  display: flex;
  justify-content: center; 
  margin-top: 150px;
  box-sizing: border-box;
  background: #121212; 
}

.tab3-indicators {
  flex: 1;
  max-width: 400px;
  padding: 15px;
  background: #2c2c2c;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tab3-indicators:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.8);
}

.tab3-indicators-title {
  margin-bottom: 12px;
  font-size: 1.4rem;
  font-weight: bold;
  color: #f8b400; 
  text-transform: uppercase;
  letter-spacing: 1px;
}

.tab3-indicators p {
  margin: 8px 0;
  padding: 6px;
  border-radius: 6px;
  font-size: 1rem;
  background: #383838; 
  color: #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tab3-indicators .label {
  font-weight: bold;
  color: #f8b400; 
}

.red {
  color: red !important;
  font-weight: bold;
}

.orange {
  color: orange !important;
  font-weight: bold;
}

.green {
  color: green !important;
  font-weight: bold;
}
</style>