<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!categories.length">
      Нет категорий.
      <router-link to="/categories"
        >Перейти к добавлению категорий
      </router-link>
    </p>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="form.category">
          <option v-for="cat of categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>
      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="form.type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="form.type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="form.amount"
          :class="{
            invalid: v$.form.amount.$dirty && v$.form.amount.minValue.$invalid,
          }"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="v$.form.amount.$dirty && v$.form.amount.minValue.$invalid"
          >Минимальная величина {{ v$.form.amount.minValue.$params.min }} </span
        >amount
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model.trim="form.description"
          :class="{
            invalid:
              v$.form.description.$dirty &&
              v$.form.description.required.$invalid,
          }"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="
            v$.form.description.$dirty && v$.form.description.required.$invalid
          "
        >
          Введите Описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { mapGetters } from "vuex";
export default {
  name: "record",
  data: () => ({
    categories: [],
    select: null,
    loading: true,
    form: {
      category: null,
      type: "outcome",
      amount: 1,
      description: "",
    },
  }),
  setup: () => ({ v$: useVuelidate() }),
  validations() {
    return {
      form: {
        description: { required },
        amount: { minValue: minValue(1) },
      },
    };
  },
  computed: {
    ...mapGetters(["info"]),
    canCreate() {
      if ((this.type = "income")) {
        return true;
      }
      return this.info?.bill >= this.amount;
    },
  },
  methods: {
    async handleSubmit() {


      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      if (!this.canCreate) {
        this.$message(
          `Недостаточно денег на счете. ${this.amount - this.info?.bill}`
        );
        return;
      }
      try {
        const record = {
          ...this.form,
          date: new Date().toJSON(),
        }
        await this.$store.dispatch("createRecord", record);

        const bill =
          record.type === "income"
            ? this.$store.getters.info?.bill + record.amount
            : this.$store.getters.info?.bill - record.amount;
             console.log("bill", bill);
        await this.$store.dispatch("updateInfo", { bill });

        this.$message("Запись успешно создана!");


        this.form.amount = 1
        this.form.description = ""
        this.form.type="outcome"
        this.v$.$reset()

        // this.$emit('created', category)
        //this.$router.push("/");
      } catch (error) {
        console.log({ error });
      }
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.category = this.categories?.[0]?.id;
    this.loading = false;
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
  unmounted() {
    this.select?.destroy();
  },
};
</script>
