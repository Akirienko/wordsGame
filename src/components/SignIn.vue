<template>
  <h1>Login to Your Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="signIn">Submit</button></p>
</template>

<script setup>
import { ref } from "vue";
// import firebase from "firebase/firestore";
// import { auth } from "firebase/firestore";
// import { db, auth } from "@/firebase";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import { useRouter } from "vue-router";
import { useUserStore } from "../stores/isUserExist";
const email = ref("");
const password = ref("");
const errMsg = ref();
// const router = useRouter();

const userStore = useUserStore();

const signIn = () => {
  const user = {
    email: email.value,
    password: password.value,
  };

  userStore.fatchUser(user);
};
</script>
