<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{$filters.currencyFormat(info?.bill)}}</h4>
    </div>
    <loader v-if="loading"/>
      <p class="center" v-else-if="!categories.length">
      Нет категорий.
      <router-link to="/categories"
        >Перейти к добавлению категорий
      </router-link>
    </p>
    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.name}}:</strong>
          {{$filters.currencyFormat(cat.spend)}} из {{$filters.currencyFormat(cat.limit)}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div class="determinate" :class="[cat.color]" :style="{width: cat.progress+'%'}"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Planning',
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories= await this.$store.dispatch('fetchCategories')
    this.categories = categories.map(cat => {
      const spend = records.filter(r => (r.category === cat.id && r.type === 'outcome'))
      .reduce((total, record) => {
        return total += +record.amount
      }, 0)
      const percent = 100 * spend / cat.limit
      const progress = percent > 100 ? 100 : percent
      const color = percent < 60
      ? 'green' : percent < 100
      ? 'yellow' : 'red'
      const diff = cat.limit - spend
      const tooltip = diff < 0 ? 'Превышен лимит ' : 'Осталось потратить ' + this.$filters.currencyFormat(Math.abs(diff))
      return {...cat, spend, percent, color, progress, tooltip}
    })
    this.loading = false
  }
}
</script>

