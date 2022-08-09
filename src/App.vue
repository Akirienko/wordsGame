<template>
  <Header />
  <router-view />
</template>

<script setup>
import Header from "@/components/Header.vue";

// import { onMounted } from "vue";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "@/firebase";

// onMounted(async () => {
//   const querySnapshot = await getDocs(collection(db, "words"));
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// });
</script>
