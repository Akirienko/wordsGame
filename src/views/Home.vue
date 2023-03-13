<template>
  <div class="home text-center">
    <div class="text-center my-5">
      <h1 class="title">Hello my friend</h1>
      <p class="tracking-wider text-lg">
        You are visited my app for learning words
      </p>
    </div>
    <form
      action=""
      class="flex flex-col items-center"
      @submit.prevent="addNewWord"
    >
      <h3 class="text-base mb-2">Add new word!</h3>
      <input
        class="w-40 mb-4 rounded-lg h-8 boxShadow p-4"
        type="text"
        v-model="newWord"
      />
      <input
        class="w-40 rounded-lg h-8 boxShadow p-4"
        type="text"
        v-model="newWordTranslate"
      />
      <button
        v-if="newWord && newWordTranslate"
        class="button w-40 h-8 mt-4 rounded-lg bg-green-400 border-solid border-2 border-black"
      >
        Add
      </button>
    </form>
    <div class="flex items-center justify-center flex-col">
      <button @click="random" class="mb-24 mt-14">CLICK TO START</button>
      <div
        @click="translating"
        class="w-52 h-16 flex items-center justify-center wordBoxColor rounded-xl"
      >
        <div class="overflow-hidden w-full h-full">
          <p class="capitalize text-lg absolute center flip-animate">
            {{ randomWord }}
          </p>
          <p>
            {{ wordTranslate }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { useUserStore } from "../store/user";

import { db } from "@/firebase";

const words = ref([]);

const randomWords = ref([]);
const randomWord = ref("");
const wordTranslate = ref("");

const newWord = ref("");
const newWordTranslate = ref("");

const storeUser = useUserStore();
const isUser = ref(storeUser.isUserExist);

watch(() => {
  console.log("storeUser WATCH", isUser);
});

onMounted(() => {
  // console.log("storeUser", storeUser.saveUser);
  if (storeUser.isUserExist) {
    console.log("YES USER", storeUser.isUserExist);
  } else {
    console.log("NO USER", storeUser.isUserExist);
  }
});

const addNewWord = () => {
  if (storeUser.isUserExist) {
    console.log("yes user", storeUser.isUserExist);
    addDoc(collection(db, "words"), {
      word: newWord.value,
      translate: newWordTranslate.value,
    });

    newWord.value = "";
    newWordTranslate.value = "";
  } else {
    console.log("no user", storeUser.isUserExist);
  }
};

//// query api
onMounted(() => {
  onSnapshot(collection(db, "words"), (querySnapshot) => {
    let fbWords = [];
    querySnapshot.forEach((doc) => {
      const word = {
        id: doc.id,
        word: doc.data().word,
        translate: doc.data().translate,
      };
      fbWords.push(word);
    });
    words.value = fbWords;
  });
});

//// add random word

const random = () => {
  console.log(words);
  wordTranslate.value = "";
  randomWords.value =
    words.value[Math.floor(Math.random() * words.value.length)];
  randomWord.value = randomWords.value.word;

  console.log("randomWords.value", randomWords.value);
};

const translating = () => {
  console.log(randomWords.value);
  wordTranslate.value = randomWords.value.translate;
};

//// Google translation (free version)

// const encodedParams = new URLSearchParams();

// encodedParams.append("target", "uk");
// encodedParams.append("source", "en");

// const options = {
//   method: "POST",
//   headers: {
//     "content-type": "application/x-www-form-urlencoded",
//     "Accept-Encoding": "application/gzip",
//     "X-RapidAPI-Key": "acbc1d455bmsh36bddedfac4ad7fp1bca14jsncd333eee2b54",
//     "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
//   },
//   body: encodedParams,
// };

// const transl = async () => {
//   encodedParams.append("q", randomWord.value);

//   await fetch(
//     "https://google-translate1.p.rapidapi.com/language/translate/v2",
//     options
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       console.log("test", response);
//       wordTranslate.value = response.data.translations.at(-1).translatedText;
//     })
//     .catch((err) => console.error(err));
// };
</script>

<style scoped></style>
