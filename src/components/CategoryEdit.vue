<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-field">
          <select ref="select" v-model="form.currentId">
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="form.name"
            :class="{
              invalid:
                v$.form.name.$dirty &&
                (v$.form.name.required.$invalid ||
                  v$.form.name.minLength.$invalid),
            }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="v$.form.name.$dirty && v$.form.name.required.$invalid"
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
            >Минимальная величина {{ v$.form.limit.minValue.$params.min }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Обновить
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
  name: "CategoriesEdit",
  props: ["categories"],
  data: () => ({
    select: "",
    form: {
      name: "",
      limit: 100,
      currentId: null,
    },
  }),
  watch: {
    ["form.currentId"](v) {
      const { name, limit, id } = this.categories.find((c) => c.id === v);
      this.form.name = name;
      this.form.limit = limit;
    },
  },
  created() {
    if (Object.keys(this.categories).length === 0) {
      return;
    }
    const { name, limit, id } = this.categories?.[0];
    this.form.name = name;
    this.form.limit = limit;
    this.form.currentId = id;
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select);
    M.updateTextFields();
  },
  unmounted() {
    this.select?.destroy();
  },

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
        await this.$store.dispatch(
          "updateCategory",
          this.form
        );
        // this.form.name = "";
        // this.form.limit = 100;
        // this.v$.$reset();
        this.$message("Категория была обновлена");
        this.$emit("updated",  this.form);

        //this.$router.push("/");
      } catch (error) {
        console.log({ error });
      }
    },
  },
};
</script>

<style></style>
