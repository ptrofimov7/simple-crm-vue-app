<template>
  <form class="card auth-card" @submit.prevent="handleSubmit">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="form.email"
          :class="{
            invalid:
              v$.form.email.$dirty &&
              (v$.form.email.required.$invalid || v$.form.email.email.$invalid),
          }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text"
          v-if="v$.form.email.$dirty && v$.form.email.required.$invalid"
        >
          Введите почту</small
        >

        <small
          class="helper-text"
          v-else-if="v$.form.email.$dirty && v$.form.email.email.$invalid"
        >
          Некорректная почта</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="form.password"
          :class="{
            invalid:
              v$.form.password.$dirty &&
              (v$.form.password.required.$invalid ||
                v$.form.password.minLength.$invalid),
          }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text"
          v-if="v$.form.password.$dirty && v$.form.password.required.$invalid"
        >
          Введите пароль</small
        >

        <small
          class="helper-text"
          v-else-if="
            v$.form.password.$dirty && v$.form.password.minLength.$invalid
          "
        >
          Длина пароля должа быть >
          {{ v$.form.password.minLength.$params.min }}</small
        >
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import messages from "@/utils/messages";

export default {
  name: "login",
  data: () => ({
    form: {
      password: "",
      email: "",
    },
  }),
  mounted() {
    if (messages[this.$route.query.message])
      this.$message(messages[this.$route.query.message]);
  },
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      form: {
        password: { required, minLength: minLength(6) },
        email: { required, email },
      },
    };
  },
  methods: {
    async handleSubmit() {
      console.log("submit", this.v$);

      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      try {
        await this.$store.dispatch("login", this.form);
        this.$router.push("/");
      } catch (error) {}
    },
  },
};
</script>
