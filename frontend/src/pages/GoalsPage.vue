<script>
import SidebarComponent from "@/components/SidebarComponent.vue";
import { getDocs, where, query } from "firebase/firestore";
import { goalsRef } from "@/main";
import axios from "axios";

export default {
  name: "DashboardPage",
  components: {
    SidebarComponent,
  },
  data() {
    return {
      goals: [],
      userName: this.$route.query.name,
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.fetchGoals();
  },
  methods: {
    async fetchGoals() {
      try {
        const q = query(goalsRef, where("userId", "==", this.id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const goals = [];
          querySnapshot.forEach((doc) => {
            goals.push({ id: doc.id, ...doc.data() });
          });

          this.goals = goals;
        } else {
          console.log("No user found with this name.");
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
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
    <SidebarComponent :userName="this.userName" :id="this.id" />
    <div class="content">
      <h2 class="subtitle">Your Goals:</h2>
      <template v-if="goals.length > 0">
        <div v-for="goal in goals" :key="goal" class="goal-container">
          <div class="basic-container">
            <h4 class="goal">
              {{ goal.goal }}
            </h4>
          </div>
          <div class="basic-container">
            <button class="styled-button" @click="getSuggestions(goal.Goal)">
              Get Breakdown
            </button>
          </div>
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

.basic-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.styled-button {
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
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
