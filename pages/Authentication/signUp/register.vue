<template>
  <div class="signin primary fill-height">
    <div class="overlay py-6">
      <v-img
        src="@/assets/imgs/logo.png"
        contain
        max-width="80"
        class="mx-auto"
      ></v-img>
      <v-card
        class="mx-auto mt-6 py-3 px-3 txtOnPrimary--text"
        elevation="24"
        color="txtOnPrimary"
        max-width="500"
        rounded="xl"
      >
        <v-sheet max-width="440" class="mx-auto" color="transparent">
          <h1 class="text-center secondary--text">Register</h1>

          <v-card-text
            class="pb-3 pt-0 px-0 secondary--text text-subtitle-1 text-center"
            >Access to our dashboard</v-card-text
          >
          <v-form ref="createAccount">
            <!--<span class="font-weight-bold px-0">First Name</span>-->
            <v-text-field
              v-model="newAccount.firstName"
              label="First Name"
              :rules="validationRules.validation.textRules"
              variant="solo"
              background-color=""
            ></v-text-field>
            <v-text-field
              v-model="newAccount.lastName"
              label="Last Name"
              :rules="validationRules.validation.textRules"
              variant="solo"
              background-color=""
            ></v-text-field>
            <v-text-field
              v-model="newAccount.email"
              label="Enter Email"
              :rules="validationRules.validation.emailRules"
              variant="solo"
              background-color=""
            ></v-text-field>
            <v-text-field
              v-model="newAccount.password"
              label="Enter Password"
              type="password"
              :rules="validationRules.validation.passowrdRules"
              variant="solo"
              background-color=""
            ></v-text-field>
            <v-text-field
              v-model="newAccount.repeatPassword"
              label="Repeat Password"
              type="password"
              variant="solo"
              background-color=""
            ></v-text-field>
            <v-btn block rounded class="py-6 secondary" @click="register">
              Register
            </v-btn>
            <v-card-actions class="justify-center secondary--text">
              <span class="px-0">Already have an account?</span>
              <router-link to="/logIn">
                <v-btn color="primary" class="px-0 text-capitalize">
                  Login
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-form>
        </v-sheet>
      </v-card>
    </div>

    <v-snackbar v-model="withError.displayError" multi-line>
      <div v-if="withError.errorCode" class="text-center">
        <v-chip color="error" size="20">{{ withError.errorCode }}</v-chip>
        <span class="mx-2">{{ withError.msg }}</span>
      </div>
      <div v-else class="text-center">
        <span class="mx-2">Something Went Wrong!</span>
      </div>

      <template v-slot:actions>
        <v-btn color="red" @click="withError.displayError = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar
      v-model="dialoges.success"
      :timeout="2000"
      fixed
      bottom
      color="success"
      elevation="24"
    >
      <div class="text-center">
        Saved successfully <v-icon class="mx-2">mdi-check-bold</v-icon>
      </div>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import { ref } from "vue";
import * as validation from "@/code/validation";
const newAccount = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
});

// const repeat = ref({
//   repeatpassword: {
//     // getter
//     get: function () {
//       return validate.confirmPassword(this.newAccount.password);
//     },
//     // setter
//     set: function () {
//       return validate.confirmPassword(this.newAccount.password);
//     },
//   }
// })

const withError = ref({
  displayError: false,
  errorCode: null,
  msg: "",
});

const dialoges = ref({
  success: false,
});

const validationRules = ref(validation);

const register = async () => {
  try {
    const { data } = await useFetch<employee>(
      "https://elkodaa.chd-staging.tech/api/c/auth/login"
    )
      .post(newAccount.value)
      .json();
    if (data) {
      console.log(data);
      dialoges.value.success = true;
    }
  } catch (error) {
    withError.value.displayError = true;
  }
};

// async function createAccount() {
//   try {
//     const { response  } = await useFetch<any>("https://elkodaa.chd-staging.tech//api/c/auth/login", {
//       console.log('Registration successful', response.data);
//     })
//   } catch {

//   }
// }

// export default {
//   name: "Register",

//   data: () => ({
//     // newAccount: {} as dataModels.users,
//     dialoges: {
//       success: false,
//     },
//     error: {
//       displayError: false,
//       msg: "",
//       errorCode: 0,
//     },
//     validationRules: validate.validation,
//   }),
//   // computed to watch is there is any change on the function
//   // and then return the msg
//   // computed: {
//   //   repeatPasswordRules: {
//   //     // getter
//   //     get: function () {
//   //       return validate.confirmPassword(this.newAccount.password);
//   //     },
//   //     // setter
//   //     set: function () {
//   //       return validate.confirmPassword(this.newAccount.password);
//   //     },
//   //   },
//   // },

//   // methods: {
//   //   createAccount: async function () {
//   //     // const form = this.$refs.createAccount as HTMLFormElement;

//   //     if (form && form.validate()) {
//   //       const result = await Emp.Employee.addEmployee(this.newAccount); // await comes with promise
//   //       // console.log(result);

//   //       if (result.ok) {
//   //         this.dialoges.success = true;
//   //       } else {
//   //         // there is something wrong
//   //         this.error.displayError = true;
//   //         this.error.errorCode = result.errorCode;
//   //         this.error.msg = result.errorMsg;
//   //       }
//   //     }
//   //   },
//   // },
// }
</script>

<style lang="scss">
.signin {
  /* background: url('@/'); */
  background-size: cover;
  .overlay {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.5),
      rgba(17, 1, 31, 0.9)
    );
  }
}
</style>
