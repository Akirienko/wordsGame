import { defineStore } from "pinia";
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: ref(false),
    errMsg: "",
  }),
  getters: {
    isUserExist: (state) => {
      let user = ref(!!state.currentUser || !!localStorage.getItem("is-user"));
      return user.value;
    },
  },
  actions: {
    fatchUser(user) {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((data) => {
          console.log("Successfully logged in!", data);
          this.saveUser(data);
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              this.errMsg = "Invalid email";
              break;
            case "auth/user-not-found":
              this.errMsg = "No account with that email was found";
              break;
            case "auth/wrong-password":
              this.errMsg = "Incorrect password";
              break;
            default:
              this.errMsg = "Email or password was incorrect";
              break;
          }
        });
    },
    saveUser(data) {
      if (data.user) {
        this.currentUser = true;
      } else {
        this.currentUser = false;
      }
      localStorage.setItem("is-user", JSON.stringify(data));
      console.log("data.user", data.user);
    },
  },
});
