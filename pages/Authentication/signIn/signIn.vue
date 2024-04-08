<template>
  <div class="log fill-height">
    <div class="overlay py-6 pb-15">
      <v-img
        src="@/assets/imgs/logo.png"
        contain
        max-width="100"
        class="mx-auto my-8"
      ></v-img>
      <v-card class="mx-auto py-8 px-3" max-width="500">
        <v-sheet max-width="440" class="mx-auto">
          <h1 class="text-center secondary--text text-h6 font-weight-medium">
            Login
          </h1>

          <v-card-text
            class="py-2 px-0 text-h6 text-center secondary--text font-weight-medium"
          >
            Access to our dashboard
          </v-card-text>
          <v-form ref="createAccount">
            <span class="font-weight-bold px-0 my-2 d-block">Email</span>
            <v-text-field
              label="Enter Email"
              solo
              v-model="SameAccount.email"
              :rules="validRules.emailRules"
            ></v-text-field>

            <div class="d-flex mb-2">
              <span class="font-weight-bold px-0 flex-grow-1 my-2">
                Password
              </span>
              <router-link to="/reset">Forgot password?</router-link>
            </div>
            <v-text-field
              label="Enter Password"
              solo
              v-model="SameAccount.password"
              :rules="validRules.passowrdRules"
              type="password"
            ></v-text-field>

            <v-btn block class="py-6 primary" @click="LoginAccount()">
              Login
            </v-btn>
            <v-card-actions class="justify-center">
              <span class="px-0 secondary--text">Don't have account?</span>
              <router-link to="/signUp">
                <v-btn color="primary" class="px-0 text-capitalize mx-2">
                  Register
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-form>
        </v-sheet>
      </v-card>
      <v-snackbar v-model="error.displayError" multi-line>
        <div v-if="error.errorCode" class="text-center">
          <v-chip color="error" size="20">{{ error.errorCode }}</v-chip>
          <span class="mx-2">{{ error.msg }}</span>
        </div>
        <div v-else class="text-center">
          <span class="mx-2">Something Went Wrong!</span>
        </div>
        <template v-slot:actions>
          <v-btn color="red" variant="text" @click="error.displayError = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent } from "vue";
import * as models from "../../../code/models";
// import * as Emp from "@/code/apis/api.employee";
import * as validate from "../../../code/validation";

export default defineComponent({
  name: "login",
  data: () => ({
    SameAccount: {} as models.employee,
    error: {
      displayError: false,
      msg: "",
      errorCode: 0,
    },
    validRules: validate.validation,
  }),
  methods: {
    LoginAccount: async function () {
      const form = this.$refs.createAccount as HTMLFormElement;
      if (form && form.validate()) {
        const result = await Emp.Employee.loginEmployee(this.SameAccount); // await comes with promise
        if (result.ok && result.body) {
          //
          const body = result.body as models.iLogin;
          this.$store.commit("get_currentUser", body.user);
          localStorage.setItem("token", body.token);
          this.$router.push("/employees/all");
        } else {
          // there is something wrong
          this.error.displayError = true;
          this.error.errorCode = result.errorCode;
          this.error.msg = result.errorMsg;
        }
      }
    },
  },
});

</script> -->

<script setup lang="ts">
import { ref } from "vue";
import { useFetch } from "@vueuse/core";
import { validation } from "../../../code/validation";
// import { ApiResponse } from "../../../utils/apiResponse";
// import { employeeFront } from "../../../utils/models";
// import { employee } from "../../../utils/dataModels";

const SameAccount = ref<any>({});
const validRules = ref(validation);
const error = {
  displayError: false,
  msg: "",
  errorCode: 0,
};

async function LoginAccount() {
  const { data } = await useFetch<any>("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(SameAccount.value),
  });
  if (data) {
    console.log(data.value);
  }
}
</script>

<style lang="scss">
.log {
  background: url("../../../../../assets/imgs/back.jpg");
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

a {
  text-decoration: none;
}
</style>
