<template>
<div>
   <Loader v-if="loading" />
  <div v-else class="app-main-layout">
    <Navbar @toggleMenu="toggleMenu" />
    <Sidebar v-model:isOpen="isOpen" />
    <main class="app-content" :class="{full: !isOpen}">
      <div class="app-page">
        <router-view></router-view>
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link class="btn-floating btn-large blue" to="/record" v-tooltip="'Создать запись'">
        <i class="large material-icons">add</i>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
import Navbar from "@/components/app/Navbar.vue";
import Sidebar from "@/components/app/Sidebar.vue";
import messages from '@/utils/messages';
export default {
  name: "maun layout",
  data: () => ({
     isOpen: true,
     loading: true
  }),
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error(value) {
      console.log(value);
      this.$error(messages[value?.code] || 'Неизвестная ошибка')
    }
  },
  methods: {
     toggleMenu() {
        this.isOpen = !this.isOpen;
        console.log({isOpen: this.isOpen});
     }
  },
  async mounted() {
     if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
     }
     this.loading = false
  },
  components: {
    Navbar,
    Sidebar,
  },
};
</script>
