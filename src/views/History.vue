<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />
    <p class="center" v-else-if="!records.length">
      Нет записей.
      <router-link to="/record">Добавьте первую</router-link>
    </p>
    <section v-else>
      <HistoryTable :records="records" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/components/HistoryTable.vue";
import Loader from "@/components/app/Loader.vue";
export default {
  name: "history",
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  async mounted() {
    // this.records = await this.$store.dispatch("fetchRecords");
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");
  debugger
    this.records = records.map((r) => {
      const categoryName = this.categories.find(
        (c) => c.id === r.category
      )?.name;
      return {
        ...r,
        categoryName,
        typeClass: r.type === "income" ? "green" : "red",
        typeText: r.type === "income" ? "Приход" : "Расход",
      };
    });
    this.loading = false;
  },
  components: {
    HistoryTable,
  },
};
Loader;
</script>
