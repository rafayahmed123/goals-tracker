<script>
import SidebarComponent from "@/components/SidebarComponent.vue";
import { getDocs } from "firebase/firestore";
import { goalsRef, userRef } from "@/main";
import axios from "axios";

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
    this.fetchGoals();
  },
  methods: {
    async fetchGoals() {
      try {
        console.log("adfasd");
        const userSnapshot = await getDocs(userRef);

        userSnapshot.forEach((doc) => {
          this.userName = doc.data().name;
        });

        const goalsSnapshot = await getDocs(goalsRef);

        const goals = [];
        goalsSnapshot.forEach((doc) => {
          goals.push({ id: doc.id, ...doc.data() });
        });

        this.goals = goals;
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    },
    async getSuggestions(goal) {
      await axios
        .post("http://localhost:5001/api/breakdown", { goal })
        .then((response) => {
          console.log("res ", response.data.completionText);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <SidebarComponent :userInitials="userName[0]" />
    <div class="content">
      <h2 class="subtitle">Your Goals:</h2>
      <template v-if="goals.length > 0">
        <div v-for="goal in goals" :key="goal" class="goal-container">
          <h4 class="goal">
            {{ goal.Goal }}
          </h4>
          <button class="styled-button" @click="getSuggestions(goal.Goal)">
            Get Breakdown
          </button>
        </div>
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

.goal-container {
  display: grid;
  grid-template-columns: 70% 30%; /* 70% for left column, 30% for right column */
  gap: 10px; /* Adjust the gap between columns as needed */
}

.goal:hover {
  cursor: pointer;
  background-color: white;
}

.styled-button {
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  width: 50%;
  height: 60%;
  background-color: #007bff;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.styled-button:hover {
  background-color: #0056b3;
}

.styled-button:focus {
  outline: none;
}

.styled-button:active {
  transform: translateY(1px);
}
</style>
