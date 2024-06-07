<script>
import SidebarComponent from "@/components/SidebarComponent.vue";
import { getDocs, where, query } from "firebase/firestore";
import { userRef } from "@/main";

export default {
  name: "DashboardPage",
  components: {
    SidebarComponent,
  },
  data() {
    return {
      goals: [],
      user: {},
      userName: this.$route.query.user,
    };
  },
  mounted() {
    this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const q = query(userRef, where("name", "==", this.userName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((docs) => {
            this.user = docs.data();
          });
        } else {
          console.log("No user found with this name.");
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
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
    <SidebarComponent :userName="this.user.name" :id="this.user.id" />
    <div class="content">
      <h2 class="subtitle">
        Welcome {{ userName }}<br />
        Select the Options On the Navigator To Explore
      </h2>
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
