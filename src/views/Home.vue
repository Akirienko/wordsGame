<template>
  <div class="home text-center">
    <div class="text-center my-5">
      <h1 class="title">Hello my friend</h1>
      <p class="tracking-wider text-lg">
        You are visited my app for learning words
      </p>
    </div>
    <div class="">
      <button @click="random" class="">CLICK TO START</button>
      <div
        @click="transl"
        class="w-52 h-16 bg-red-500 flex items-center justify-center"
      >
        <p>{{ randomWord }}</p>
        <p>{{ wordTranslate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

const words = ref([]);
const randomWord = ref("");
const wordTranslate = ref("");

//// query api
onMounted(async () => {
  const getWords = await getDocs(collection(db, "words"));
  let fbWords = [];
  getWords.forEach((doc) => {
    // words.value = doc.data();
    const word = {
      id: doc.id,
      word: doc.data().word,
    };
    fbWords.push(word);
  });
  words.value = fbWords;
});

//// add random word

const random = () => {
  wordTranslate.value = "";
  randomWord.value =
    words.value[Math.floor(Math.random() * words.value.length)].word;
};

//// Google translation

const encodedParams = new URLSearchParams();

encodedParams.append("target", "uk");
encodedParams.append("source", "en");

const options = {
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "Accept-Encoding": "application/gzip",
    "X-RapidAPI-Key": "acbc1d455bmsh36bddedfac4ad7fp1bca14jsncd333eee2b54",
    "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
  },
  body: encodedParams,
};

const transl = async () => {
  encodedParams.append("q", randomWord.value);

  await fetch(
    "https://google-translate1.p.rapidapi.com/language/translate/v2",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log("test", response);
      wordTranslate.value = response.data.translations.at(-1).translatedText;
    })
    .catch((err) => console.error(err));
};
</script>
