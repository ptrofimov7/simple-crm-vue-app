<template>
  <ul class="sidenav app-sidenav" :class="{ open: isOpen }">
    <li>
      <router-link
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :exact="link.exact"
        class="waves-effect waves-orange pointer"
        active-class="active"
      >
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["isOpen"],
  data() {
    return {
      links: [
        { title: "Счет", exact: true, to: "/" },
        { title: "История", exact: false, to: "/history" },
        { title: "Планирование", exact: false, to: "/planning" },
        { title: "Новая запись", exact: false, to: "/record" },
        { title: "Категории", exact: false, to: "/categories" },
      ],
    };
  },
};
</script>
