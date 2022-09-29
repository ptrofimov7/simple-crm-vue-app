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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="form.name"
          :class="{
            invalid: v$.form.name.$dirty && v$.form.name.required.$invalid,
          }"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text"
          v-if="v$.form.name.$dirty && v$.form.name.required.$invalid"
        >
          Введите имя</small
        >
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="form.agree" />
          <span
            :class="{
              invalid: v$.form.agree.$dirty && v$.form.agree.checked.$invalid,
            }"
            >С правилами согласен</span
          >
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "register",
  data: () => ({
    form: {
      password: "",
      email: "",
      name: "",
      agree: false,
    },
  }),
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      form: {
        password: { required, minLength: minLength(6) },
        email: { required, email },
        name: { required },
        agree: { checked: (v) => v },
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
        await this.$store.dispatch("register", this.form);
        this.$router.push("/");
      } catch (error) {
      }
    },
  },
};
</script>
