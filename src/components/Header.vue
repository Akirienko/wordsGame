<template>
  <div class="bg-white padding h-10 flex justify-between items-center">
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <div class="sign">
      <router-link v-if="!user" to="/sign-in"> Login </router-link>
      <router-link v-if="user" to="/sign-in"> Logout </router-link>
    </div>
  </div>
</template>

<script setup>
import user from "../isUser";
</script>
