import { defineStore } from "pinia";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null,
    errMsg: "",
  }),
  getters: {
    // я повинен шось повкертати
    isUserExist: (state) => {
      return !!state.currentUser || !!localStorage.getItem("is-users");
    },
    // getUser: (state) => {
    //   state.currentUser = localStorage.getItem("is-users");
    // },
  },
  actions: {
    fatchUser(user) {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((data) => {
          console.log("Successfully logged in!", data);
          // userStore.currentUser = data;d
          this.saveUser(data);
          // localStorage.setItem("is-user", JSON.stringify(data));
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
      this.currentUser = data.user;
      localStorage.setItem("is-users", JSON.stringify(data));
      console.log(data.user);
    },
  },
});
