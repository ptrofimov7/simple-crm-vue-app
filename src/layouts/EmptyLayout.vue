<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
import messages from '@/utils/messages';

export default {
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
  }
}
</script>
