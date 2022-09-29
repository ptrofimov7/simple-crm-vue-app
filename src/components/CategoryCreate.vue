<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-field">
          <input
          id="name"
          type="text"
          v-model="form.name"
           :class="{
            invalid:
              v$.form.name.$dirty &&
              (v$.form.name.required.$invalid || v$.form.name.minLength.$invalid),
          }"
          />
          <label for="name">Название</label>
          <span
          class="helper-text invalid"
          v-if=" v$.form.name.$dirty && v$.form.name.required.$invalid"
          >
             Введите название категории
          </span>

        </div>

        <div class="input-field">
          <input
          id="limit"
          type="number"
          v-model.number="form.limit"
           :class="{
            invalid: v$.form.limit.$dirty && v$.form.limit.minValue.$invalid,
          }"
          />
          <label for="limit">Лимит</label>
          <span
          class="helper-text invalid"
          v-if="v$.form.limit.$dirty && v$.form.limit.minValue.$invalid"
          >Минимальная величина {{v$.form.limit.minValue.$params.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
   name: 'CategoriesCreate',
    data: () => ({
    form: {
      name: "",
      limit: 100,
    },
  }),
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      form: {
        name: { required },
        limit: { minValue: minValue(10) },
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
        const category = await this.$store.dispatch("createCategory", this.form);
        console.log({category});
        this.form.name = ''
        this.form.limit = 100
        this.v$.$reset()
        this.$message('Категория была создана')
        this.$emit('created', category)

        //this.$router.push("/");
      } catch (error) {
         console.log({error});
      }
    },
  },
};
</script>

<style></style>

