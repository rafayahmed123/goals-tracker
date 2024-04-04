<script>
import SidebarComponent from "@/components/SidebarComponent.vue";
import { getDocs } from "firebase/firestore";
import { userRef } from "@/main";

export default {
  name: "DashboardPage",
  components: {
    SidebarComponent,
  },
  data() {
    return {
      goals: [],
      userName: "",
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const userSnapshot = await getDocs(userRef);

        userSnapshot.forEach((doc) => {
          this.userName = doc.data().name;
        });
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    },
  },
  watch: {
    userName: {
      handler(newName) {
        console.log("Name:", newName);
      },
      deep: true,
    },
  },
  props: {},
};
</script>

<template>
  <div class="container">
    <SidebarComponent :userInitials="userName[0]" />
    <div class="content">
      <h2 class="subtitle">
        Welcome {{ userName }}<br />
        Select the Options On the Navigator To Explore
      </h2>
      <!-- {{ this.goals.length > 0 ? this.goals.map(goal => `
    <h4>${goal}</h4>
    `) : null }} -->
      <template v-if="goals.length > 0">
        <h4 v-for="goal in goals" :key="goal">{{ goal.Goal }}</h4>
      </template>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.content {
  flex: 1;
}
</style>
