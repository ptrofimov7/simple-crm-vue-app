<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading" />
    <div v-else class="row">
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from "@/components/HomeBill";
import HomeCurrency from "@/components/HomeCurrency";
export default {
  name: "HomeView",
  components: { HomeBill, HomeCurrency },
  data: () => ({
    loading: true,
    currency: null,
  }),
  async mounted() {
    // this.currency = await this.$store.dispatch('fetchCurrency')
    setTimeout(() => {
      this.currency = {
        rates: { UAH: 35, USD: 1.1, EUR: 1 },
        date: this.$filters.dateTimeFormat(null),
      };
      this.loading = false;
    }, 300);
  },
  methods: {
    refresh() {
      this.loading = true;
      setTimeout(() => {
        this.currency = {
          rates: { UAH: 35, USD: 1.1, EUR: 1 },
          date: this.$filters.dateTimeFormat(null),
        };
        this.loading = false;
      }, 300);
    },
  },
};
</script>
