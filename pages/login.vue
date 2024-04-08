<template>
  <div class="signin primary fill-height">
    <div class="overlay py-6">
      <v-card
        class="mx-auto mt-6 py-3 px-3 txtOnPrimary--text"
        elevation="24"
        color="txtOnPrimary"
        max-width="500"
        rounded="xl"
      >
        <v-sheet max-width="440" class="mx-auto" color="transparent">
          <h1 class="text-center secondary--text">Login</h1>

          <v-card-text
            class="pb-3 pt-0 px-0 secondary--text text-subtitle-1 text-center"
            >Access to our dashboard</v-card-text
          >
          <v-form ref="createAccount">
            <v-text-field
              v-model="userLogin.email"
              label="Email"
              :rules="validationRules.validation.emailRules"
              variant="solo"
              background-color=""
            ></v-text-field>
            <v-text-field
              v-model="userLogin.password"
              label="Password"
              :rules="validationRules.validation.textRules"
              variant="solo"
              background-color=""
            ></v-text-field>
            <v-btn block rounded class="py-6 secondary" @click="login()">
              Login
            </v-btn>
            <v-card-actions class="justify-center secondary--text">
              <span class="px-0">Don't have an account?</span>
              <router-link to="/register">
                <v-btn color="primary" class="px-0 text-capitalize">
                  Register
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-form>
        </v-sheet>
      </v-card>
    </div>

    <v-snackbar
      v-model="withError.displayError"
      multi-line
      fixed
      bottom
      color="error"
      elevation="24"
    >
      <div class="text-center">
        <span class="mx-2">Something Went Wrong!</span>
      </div>

      <template v-slot:actions>
        <v-btn @click="withError.displayError = false"> Close </v-btn>
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
const userLogin = ref({
  email: "",
  password: "",
});

const withError = ref({
  displayError: false,
  msg: "",
});

const dialoges = ref({
  success: false,
});

const validationRules = ref(validation);

const login = async () => {
  try {
    const xsrfToken = useCookie("laravel_session");
    console.log(xsrfToken);
    let headers = {
      accept: "application/json",
      "X-XSRF-TOKEN": xsrfToken ? xsrfToken.value : "",
    };
    if (process.server) {
      headers = {
        ...headers,
        ...useRequestHeaders(["cookie"]),
      };
    }
    const { data } = await useFetch(
      "https://elkodaa.chd-staging.tech/api/c/auth/login",
      {
        headers,
        credentials: "include",
      }
    )
      .post(userLogin.value)
      .json();
    if (data.value) {
      dialoges.value.success = true;
    } else {
      withError.value.displayError = true;
    }
  } catch (error) {
    withError.value.displayError = true;
  }
};
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
