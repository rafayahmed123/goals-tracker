<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2 class="subtitle">
      Lets get started with your name, <br />
      and understanding what brings you here.
    </h2>
    <h2 class="label">Name:</h2>
    <input
      type="text"
      class="styled-input"
      placeholder="Enter your text here"
      v-model="name"
    />
    <h2 class="label">Your "Why":</h2>
    <input
      type="text"
      class="styled-input"
      placeholder="Enter your text here"
      v-model="reason"
    />
    <button class="styled-button" @click="navigateToAbout">Next</button>
  </div>
</template>

<script>
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
export default {
  name: "HomePage",
  data() {
    return {
      name: "",
      reason: [],
      dbRef: {},
    };
  },
  mounted() {
    this.initFirebase();
  },
  methods: {
    navigateToAbout() {
      this.registerInfo();
      this.$router.push({ path: "/setup", replace: true });
    },
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
    async registerInfo() {
      if (this.reason && this.name) {
        try {
          await addDoc(collection(this.dbRef, "User"), {
            name: this.name,
            reason: this.reason,
          });
          console.log("New goal added successfully!");
        } catch (error) {
          console.error("Error adding new goal:", error);
        }
      }
    },
  },
  props: {
    msg: String,
  },
};
</script>

<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.subtitle {
  margin-top: 10px;
}

.styled-input {
  width: 300px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
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
  margin-top: 40px;
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
