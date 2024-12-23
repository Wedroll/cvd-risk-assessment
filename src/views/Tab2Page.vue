<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Normy wskaźników CVD</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Normy wskaźników CVD</ion-title>
        </ion-toolbar>
      </ion-header>
      <div class="content-background">
  <div class="indicators-container">
    <div class="users-indicators">
      <h2 class="indicators-title">Twoje Wskaźniki</h2>
      <p class="users-cholesterol" :class = "{'highlight' : isAboveCholesterolNorm}">
        <span class="label">Cholesterol:</span> {{ formStore.cholesterol }} mg/dl
      </p>
      <p class="users-LDL" :class = "{'highlight' : isAboveLDLNorm}">
        <span class="label">LDL:</span> {{ formStore.LDL }} mg/dl
      </p>
      <p class="users-HDL" :class = "{'highlight' : isBelowHDLNorm}">
        <span class="label">HDL:</span> {{ formStore.HDL }} mg/dl
      </p>
      <p class="users-triglycerides" :class = "{'highlight' : isAboveTriglyceridesNorm}">
        <span class="label">Trójgliceryd:</span> {{ formStore.triglycerides }} mg/dl
      </p>
    </div>

    <div class="acceptable-indicators">
      <h2 class="acceptable-indicators-title">Dop. Wskaźniki</h2>
      <p class="acceptable-cholesterol">
        <span class="label">Cholesterol:</span> &lt; 190 mg/dl
      </p>
      <p class="acceptable-LDL">
        <span class="label">LDL:</span> &lt; 115 mg/dl
      </p>
      <p class="acceptable-HDL">
        <span class="label">HDL:</span> &gt; 40 mg/dl
      </p>
      <p class="acceptable-triglycerides">
        <span class="label">Trójgliceryd:</span> &lt; 150 mg/dl
      </p>
    </div>
  </div>
</div>

<div class="buttons-container">
    <ion-button @click="cancel">POWROT</ion-button>
    <ion-button @click="next">NOWE WSKAŹNIKI</ion-button>
  </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import { useFormStore } from '@/stores/formStore';
import { computed } from 'vue';
import { useRouter } from 'vue-router';


const formStore = useFormStore();
const router = useRouter();
const cholesterolNorm = 190;
const LDLNorm = 115;
const HDLMin = 40;
const triglyceridesNorm = 150;

const isAboveCholesterolNorm = computed(() => parseInt(formStore.cholesterol) > cholesterolNorm);
const isAboveLDLNorm = computed(() => parseInt(formStore.LDL) > LDLNorm);
const isBelowHDLNorm = computed(() => parseInt(formStore.HDL) < HDLMin);
const isAboveTriglyceridesNorm = computed(() => parseInt(formStore.triglycerides) > triglyceridesNorm);

function cancel(){
  router.push('/tabs/tab1');
}

function next(){
  router.push('/tabs/tab3')
}

</script>

<style scoped>
ion-title{
  text-align: center;
}

.highlight{
  color: red !important; 
  font-weight: bold;
}

.content-background {
  background: transparent; 
  color: #fff;
  padding: 100px;
  min-height: auto;
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start; 
  box-sizing: border-box;
}

.indicators-container {
  display: flex;
  justify-content: center;
  gap: 10px; 
  flex-wrap: wrap;
  max-width: 800px;
  width: 100%;
  margin-bottom: 0px; 
}

.users-indicators,
.acceptable-indicators {
  flex: 1;
  min-width: 300px;
  padding: 15px;
  background: #333;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.users-indicators:hover,
.acceptable-indicators:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.8);
}

.indicators-title,
.acceptable-indicators-title {
  margin-bottom: 12px;
  font-size: 1.4rem;
  font-weight: bold;
  color: #f8b400;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.users-indicators p,
.acceptable-indicators p {
  margin: 8px 0;
  padding: 6px;
  border-radius: 6px;
  font-size: 1rem;
  background: #444;
  color: #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-weight: bold;
  color: #f8b400;
}

.buttons-container {
  display: flex;
  justify-content: center; 
  align-items: center;
  gap: 0px; 
  margin-top: 10px;
  margin-bottom: 10px; 
  width: 100%;
}

ion-button {
  font-weight: bold;
  --background: #3a86ff; 
  --color: #fff; 
  --border-radius: 8px;
  font-size: 1rem;
  padding: 8px 10px; 
  transition: transform 0.3s ease;
}

ion-button:hover {
  transform: translateY(-2px); 
  --background: #2b6fd9; 
}

@media (max-width: 768px) {
  .buttons-container {
    flex-direction: column; 
    align-items: stretch;
    gap: 10px;
  }
}
</style>
