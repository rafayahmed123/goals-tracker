<script>
import axios from "axios";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "SetupPage",
  data() {
    return {
      result: "",
      goals: [],
      dbRef: {},
      user: this.$route.query.name,
      id: this.$route.query.id,
    };
  },
  mounted() {
    this.initFirebase();
  },
  methods: {
    async initFirebase() {
      try {
        const firebaseConfig = {
          apiKey: "AIzaSyAJv0KjVnasEeUUryVekKO_uhMti-_-oEI",
          authDomain: "goals-planner-6c6b0.firebaseapp.com",
          projectId: "goals-planner-6c6b0",
          storageBucket: "goals-planner-6c6b0.appspot.com",
          messagingSenderId: "363752382046",
          appId: "1:363752382046:web:26aee13f9969168a6e1ecf",
          measurementId: "G-FV0G7WKK2Y",
        };
        const fireStoreApp = initializeApp(firebaseConfig);
        const db = getFirestore(fireStoreApp);
        this.dbRef = db;
      } catch (error) {
        console.error("Error adding new goal:", error);
      }
    },
    async fetchData() {
      await axios
        .get("http://localhost:5001/api/data")
        .then((response) => {
          const sentences = response.data.completionText.split(".");
          if (sentences.length > 3) {
            sentences.pop();
          }
          this.goals = [...this.goals, ...sentences];
          sentences.forEach(async (sentence) => {
            await addDoc(collection(this.dbRef, "Goals"), {
              id: uuidv4(),
              goal: sentence,
            });
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    async addGoal() {
      this.goals.push(this.textInput);
      try {
        await addDoc(collection(this.dbRef, "Goals"), {
          id: uuidv4(),
          goal: this.textInput,
        });
        this.textInput = "";
        console.log("New goal added successfully!");
      } catch (error) {
        console.error("Error adding new goal:", error);
      }
    },
    navigateToDashboard() {
      this.$router.push({ path: "/dashboard", query: { user: this.user } });
    },
  },
};
</script>

<template>
  <div class="ayo">
    <h1 :style="{ marginBottom: '2px' }">What are your goals for this year?</h1>
    <h2>(Minimum 3)</h2>

    <input
      type="text"
      class="styled-input"
      placeholder="Enter your text here"
      v-model="textInput"
    />

    <div class="add-container">
      <button class="styled-button" @click="addGoal">Add</button>

      <button class="styled-button" @click="fetchData">AI Generate</button>
    </div>

    <p>{{ result }}</p>

    <div v-for="(goal, index) in goals" :key="index" class="goalsContainer">
      <div class="goal">{{ goal }}</div>
    </div>

    <button class="styled-button" @click="navigateToDashboard">Next</button>
  </div>
</template>

<style scoped>
.ayo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.label {
  margin-top: 2%;
}

.add-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 2%;
}

.styled-input {
  width: 300px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  margin-top: 5%;
}

.styled-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
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

.goalsContainer {
  text-align: start;
}

.goal {
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 18px;
  text-align: start;
}
</style>
