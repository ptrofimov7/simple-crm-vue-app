<template>
     <div class="col s12 m6 l4">
        <div class="card light-blue bill-card">
          <div class="card-content white-text">
            <span class="card-title">Счет в валюте</span>

            <p
            v-for="cur in currencies"
            :key="cur"
            class="currency-line"
            >
              <span>{{$filters.currencyFormat(getCurrency(cur), cur)}}</span>
            </p>
          </div>
        </div>
      </div>
</template>

<script>
export default {
   props: ['rates'],
   data: () => ({
      currencies: ['USD', 'UAH', "EUR"]
   }),
   computed: {
      base() {
         const bill = this.$store.getters.info.bill;
         console.log("bill", this.$store.getters.info, this.rates);
         return  bill / this.rates['UAH']/this.rates['EUR']
      }
   },

   methods: {
      getCurrency(currency) {
         console.log("base", this.rates, this.base);
         return Math.floor(this.base * this.rates[currency])
      }
   }
}
</script>
