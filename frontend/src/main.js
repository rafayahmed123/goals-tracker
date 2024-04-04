import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";

import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

import HomePage from "./pages/HomePage.vue";
import SetupPage from "./pages/SetupPage.vue";
import DashboardPage from "./pages/DashboardPage.vue";
import GoalsPage from "./pages/GoalsPage.vue";

// set up routes
const routes = [
  { path: "/", component: HomePage },
  { path: "/setup", component: SetupPage },
  { path: "/dashboard", component: DashboardPage },
  { path: "/goals", component: GoalsPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Initialize Firebase
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

export const goalsRef = collection(db, "Goals");
export const userRef = collection(db, "User");

// mount application
const app = createApp(App);
app.use(router);
app.mount("#app");
