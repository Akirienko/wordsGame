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
        :disabled="!newWord && !newWordTranslate"
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
            <span :data-hover="wordTranslate">{{ randomWord }} </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

const words = ref([]);

const randomWords = ref([]);
const randomWord = ref("");
const wordTranslate = ref("");

const newWord = ref("");
const newWordTranslate = ref("");

const addNewWord = () => {
  addDoc(collection(db, "words"), {
    word: newWord.value,
    translating: newWordTranslate.value,
  });

  newWord.value = "";
  newWordTranslate.value = "";
};

//// query api
onMounted(() => {
  // const getWords = getDocs(collection(db, "words"));
  // getWords.forEach((doc) => {
  //   // words.value = doc.data();
  //   const word = {
  //     id: doc.id,
  //     word: doc.data().word,
  //     translate: doc.data().translate,
  //   };
  //   fbWords.push(word);
  // });
  onSnapshot(collection(db, "words"), (querySnapshot) => {
    // const cities = [];
    let fbWords = [];
    querySnapshot.forEach((doc) => {
      const word = {
        id: doc.id,
        word: doc.data().word,
        translate: doc.data().translate,
      };
      fbWords.push(word);
    });
    // console.log("Current cities in CA: ", cities.join(", "));
    words.value = fbWords;
  });
});

//// add random word

const random = () => {
  wordTranslate.value = "";
  randomWords.value =
    words.value[Math.floor(Math.random() * words.value.length)];
  randomWord.value = randomWords.value.word;

  // console.log(randomWords.value);
};

const translating = () => {
  console.log(randomWords.value);
  wordTranslate.value = randomWords.value.translate;
};

//// Google translation

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

<style scoped>
.flip-animate:hover,
.flip-animate:focus {
  color: #222;
}

.flip-animate {
  perspective: 1000px;
}
.flip-animate span {
  position: relative;
  display: inline-block;
  padding: 0;
  transition: transform 0.3s;
  transform-origin: 50% 0;
  transform-style: preserve-3d;
}
.flip-animate span:before {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  content: attr(data-hover);
  transition: color 0.3s;
  transform: rotateX(-90deg);
  transform-origin: 50% 0;
  text-align: center;
}
.flip-animate:hover span,
.flip-animate:focus span {
  transform: rotateX(90deg) translateY(-22px);
}
.flip-animate:hover span:before,
.flip-animate:focus span:before {
  color: #d24936;
}
</style>
