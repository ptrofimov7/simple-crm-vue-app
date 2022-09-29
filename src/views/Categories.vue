<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
        v-if="categories.length"
        :categories ="categories"
        @updated="updateCategories"
        :key="categories.length + updateCount"
        />
        <p v-else>Нет категорий</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from "@/components/CategoryCreate.vue";
import CategoryEdit from "@/components/CategoryEdit.vue";
import Loader from "@/components/app/Loader.vue";
export default {
  name: "Categories",
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    this.loading = false;
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category);
    },
    updateCategories(cat) {
      const id = this.categories.findIndex(c => c.id = cat.currentId)
      this.categories[id].name = cat.name
      this.categories[id].limit= cat.limit
      this.updateCount = this.updateCount + 1;
    }
  },
  components: { CategoryCreate, CategoryEdit },
};
</script>
