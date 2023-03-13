<template>
  <h1>Login to Your Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="signIn">Submit</button></p>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../store/user";
const email = ref("");
const password = ref("");
const errMsg = ref();

const userStore = useUserStore();

const signIn = () => {
  const user = {
    email: email.value,
    password: password.value,
  };

  userStore.fatchUser(user);
};
</script>
