<template>
  <div class="bg-white padding h-10 flex justify-between items-center">
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="sign">
      <router-link :to="`${isUserExist ? '/' : 'sign-in'}`" @click="logout">
        {{ `${isUserExist ? "Logout" : "Sing in"}` }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";

const user = useUserStore();

const { isUserExist } = storeToRefs(user);

const logout = () => {
  if (isUserExist.value) {
    localStorage.removeItem("is-user");
  }
};
</script>
