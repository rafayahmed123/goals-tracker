<script>
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { getDocs } from "firebase/firestore";
import { userRef } from "@/main";

export default {
  name: "HomePage",
  data() {
    return {
      returning: [null],
      name: "",
      reason: "",
      dbRef: {},
      id: "",
    };
  },
  mounted() {
    this.initFirebase();
  },
  methods: {
    navigateToAbout() {
      this.registerInfo();
      this.$router.push({
        path: "/setup",
        query: { user: this.name, id: this.id },
      });
    },
    navigateToDash() {
      this.$router.push({
        path: "/dashboard",
        query: { user: this.name, id: this.id },
      });
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
          this.id = uuidv4();
          await addDoc(collection(this.dbRef, "User"), {
            id: this.id,
            name: this.name,
            reason: this.reason,
          });
          console.log("New user added successfully!");
        } catch (error) {
          console.error("Error adding new goal:", error);
        }
      }
    },
    async fetchUser(name) {
      try {
        const q = query(userRef, where("name", "==", name));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          this.navigateToDash();
        } else {
          console.log("No user found with this name.");
        }
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    },
  },
  props: {
    msg: String,
  },
};
</script>

<template>
  <div class="hello">
    <div class="button-container" v-if="returning[0] === null">
      <button class="styled-button" @click="returning[0] = 0">New User</button>

      <button class="styled-button" @click="returning[0] = 1">
        Returning User
      </button>
    </div>
    <template v-if="returning[0] !== null && returning[0] === 0">
      <h1>{{ msg }}</h1>
      <h2 class="subtitle">
        Let's get started with your name, <br />
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
    </template>

    <template v-else-if="returning[0] === 1">
      <h2 class="subtitle2">Please enter your name:</h2>
      <input
        type="text"
        class="styled-input"
        placeholder="Enter your text here"
        v-model="name"
      />
      <button class="styled-button" @click="fetchUser(name)">Next</button>
    </template>
  </div>
</template>

<style scoped>
.button-container {
  margin-top: 10%;
  display: block;
}
.hello {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.subtitle {
  margin-top: 10px;
}
.subtitle2 {
  margin-top: 10%;
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
  display: block;
  margin-left: auto;
  margin-right: auto;
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
