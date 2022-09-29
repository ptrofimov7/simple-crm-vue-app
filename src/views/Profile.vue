<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <input id="description" type="text" v-model="name" />
        <label for="description">{{name}}</label>
        <span class="helper-text invalid">name</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
export default {

  data: () => ({
    name: ''
  }),
  mounted() {
    this.name = this.$store.getters.info.name
  },
  methods: {
    async handleSubmit() {
      console.log("SUBMIT", this.name);
      if (!this.name) return;
      try {
        await this.$store.dispatch("updateInfo", {name: this.name});
        this.$router.push("/");
      } catch (error) {
      }
    },
  }

}
</script>
